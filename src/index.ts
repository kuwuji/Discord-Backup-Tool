import Discord from "discord.js-selfbot-v13";
import { mkdirSync, readdirSync } from "fs";

import config from "../config.json5";
import backup, { setStorageFolder } from "discord-backup";
import { setLang, t } from "./i18n";
import { setColor } from "./theme";
import { menu, askGuild, askBackupId, askChannelName, askCategoryId, loading, wait, say, fail, bye } from "./term";

setLang(config.lang)
setColor(config.color)

const BACKUPS_DIR = `${import.meta.dir}/../backups`
const EMOTES_DIR = `${import.meta.dir}/../emotes`

mkdirSync(BACKUPS_DIR, { recursive: true })
mkdirSync(EMOTES_DIR, { recursive: true })
setStorageFolder(BACKUPS_DIR)

;(Discord.Collection.prototype as any).toJSON = function () { return [...this.values()] }

const banManager = (Discord as any).GuildBanManager.prototype
const fetchBans = banManager.fetch
banManager.fetch = function (options?: unknown) { return fetchBans.call(this, options ?? { limit: 1000 }) }

const client = new Discord.Client()

async function listEmotes() {
    const files = readdirSync(EMOTES_DIR).filter(f => f.endsWith(".json"))

    const lines: string[] = []
    for (const file of files) {
        const data = await Bun.file(`${EMOTES_DIR}/${file}`).json()
        lines.push(`${data.name} ➜ ${data.id}`)
    }

    say(`${t("list.emotes")}\n${lines.length > 0 ? lines.join("\n") : t("list.none")}`)
}

async function listBackups() {
    const ids = await backup.list()

    const backups = []
    for (const id of ids) backups.push(await backup.fetch(id))
    backups.sort((a, b) => a.data.name.localeCompare(b.data.name))

    const lines = backups.map(b => `${b.data.name} ➜ ${b.id}`)

    say(`${t("list.backups")}\n${lines.length > 0 ? lines.join("\n") : t("list.none")}`)
}

async function getGuild(id: string) {
    await client.guilds.fetch()
    const guild = client.guilds.cache.get(id)
    if (!guild) fail(t("err.guildNotFound"))
    return guild
}

type BackupGuild = Parameters<typeof backup.create>[0]
type BackupOptions = Parameters<typeof backup.create>[1]

async function createBackup(id: string, options: BackupOptions = {}) {
    const guild = await getGuild(id)
    if (!guild) return

    const data = await loading("status.creating", () => backup.create(guild as unknown as BackupGuild, {
        maxMessagesPerChannel: 0,
        jsonSave: true,
        jsonBeautify: true,
        doNotBackup: ["emojis", "bans"],
        ...options,
    }))

    say(t("status.created", { id: data.id }))
    return data
}

async function cloneGuild(id: string, options: BackupOptions = {}) {
    const data = await createBackup(id, options)
    if (!data) return

    const newGuild = await client.guilds.create("Backup Tool")
    await loading("status.loading", () => backup.load(data.id, newGuild as unknown as BackupGuild), "status.loaded")
}

async function backupEmotes(id: string) {
    const guild = await getGuild(id)
    if (!guild) return

    const emotes = guild.emojis.cache.map(e => ({ name: e.name, code: e.toString() }))
    await Bun.write(`${EMOTES_DIR}/${guild.id}.json`, JSON.stringify({ name: guild.name, id: guild.id, emotes }, null, 2))

    say(t("status.emotesCreated", { id: guild.id }))
}

async function createTemplate(id: string) {
    const guild = await getGuild(id)
    if (!guild) return

    if (!guild.members.me?.permissions.has("MANAGE_GUILD")) {
        fail(t("err.missingPerm", { perm: "MANAGE_GUILD" }))
        return
    }

    try {
        const template = await guild.createTemplate(guild.name, "Backup Tool V2")
        say(template.url)
    } catch {
        const templates = await guild.fetchTemplates()
        const existing = templates.first()
        if (!existing) return fail(t("err.noTemplate"))
        say(existing.url)
    }
}

type SelfGuild = NonNullable<Awaited<ReturnType<typeof getGuild>>>

function lacksPerm(guild: SelfGuild, perm: Discord.PermissionResolvable & string) {
    if (guild.members.me?.permissions.has(perm)) return false
    fail(t("err.missingPerm", { perm }))
    return true
}

async function loadBackup(backupId: string, guildId: string) {
    const guild = await getGuild(guildId)
    if (!guild) return

    const emoteFile = Bun.file(`${EMOTES_DIR}/${backupId}.json`)
    if (await emoteFile.exists()) {
        if (lacksPerm(guild, "MANAGE_EMOJIS_AND_STICKERS")) return

        const { emotes } = await emoteFile.json()
        let done = 0
        for (const emote of emotes) {
            done++
            const parsed = Discord.Util.parseEmoji(emote.code)
            if (!parsed?.id) continue

            const url = `https://cdn.discordapp.com/emojis/${parsed.id}.${parsed.animated ? "gif" : "png"}`
            try {
                await guild.emojis.create(url, parsed.name)
                say(t("status.emoteCreated", { n: done, total: emotes.length, name: parsed.name }))
            } catch (err) {
                fail(`${parsed.name}: ${err}`)
            }
        }
        return
    }

    const data = await backup.fetch(backupId).catch(() => null)
    if (!data) return fail(t("err.backupNotFound"))
    if (lacksPerm(guild, "ADMINISTRATOR")) return

    await loading("status.loading", () => backup.load(data.id, guild as unknown as BackupGuild), "status.loaded")
}

async function deleteChannels(channels: { name: string; delete(): Promise<unknown> }[]) {
    if (channels.length === 0) return fail(t("err.noChannels"))

    let done = 0
    for (const channel of channels) {
        done++
        const vars = { n: done, total: channels.length, name: channel.name }
        try {
            await channel.delete()
            say(t("status.channelDeleted", vars))
        } catch {
            fail(t("status.channelFailed", vars))
        }
    }
}

async function deleteByName(guildId: string, name: string) {
    const guild = await getGuild(guildId)
    if (!guild || lacksPerm(guild, "MANAGE_CHANNELS")) return

    await deleteChannels([...guild.channels.cache.filter(c => c.name.includes(name)).values()])
}

async function deleteCategory(categoryId: string) {
    await client.guilds.fetch()
    const category = client.channels.cache.get(categoryId)
    if (!category || category.type !== "GUILD_CATEGORY") return fail(t("err.categoryNotFound"))
    if (lacksPerm(category.guild, "MANAGE_CHANNELS")) return

    await deleteChannels([...category.children.values()])
}

async function run() {
    while (true) {
        const action = await menu()

        try {
            switch (action) {
                case "exit":
                    bye()
                    process.exit(0)

                case "backup": {
                    const id = await askGuild()
                    if (!id) break
                    await cloneGuild(id)
                    await wait()
                    break
                }

                case "backupMessages": {
                    const id = await askGuild()
                    if (!id) break
                    await cloneGuild(id, { maxMessagesPerChannel: 10, saveImages: "base64" })
                    await wait()
                    break
                }

                case "backupFast": {
                    const id = await askGuild()
                    if (!id) break
                    await createBackup(id)
                    await wait()
                    break
                }

                case "emotes": {
                    const id = await askGuild()
                    if (!id) break
                    await backupEmotes(id)
                    await wait()
                    break
                }

                case "template": {
                    const id = await askGuild()
                    if (!id) break
                    await createTemplate(id)
                    await wait()
                    break
                }

                case "load": {
                    const backupId = await askBackupId()
                    if (!backupId) break
                    const id = await askGuild()
                    if (!id) break
                    await loadBackup(backupId, id)
                    await wait()
                    break
                }

                case "delName": {
                    const id = await askGuild()
                    if (!id) break
                    const name = await askChannelName()
                    if (!name) break
                    await deleteByName(id, name)
                    await wait()
                    break
                }

                case "delCategory": {
                    const id = await askCategoryId()
                    if (!id) break
                    await deleteCategory(id)
                    await wait()
                    break
                }

                case "list":
                    await listBackups()
                    await listEmotes()
                    await wait()
                    break
            }
        } catch (err) {
            fail(err instanceof Error ? (err.stack ?? err.message) : String(err))
            await wait()
        }
    }
}

client.login(config.token).then(run).catch(err => {
    fail(err instanceof Error ? err.message : String(err))
    process.exit(1)
})
