import { select, text, isCancel, cancel, intro, outro, log, spinner } from "@clack/prompts";
import { t, type Key } from "./i18n";
import { paint } from "./theme";

const BANNER = `
▄▄▄▄·  ▄▄▄·  ▄▄· ▄ •▄ ▄• ▄▌ ▄▄▄·    ▄▄▄▄▄            ▄▄▌
▐█ ▀█▪▐█ ▀█ ▐█ ▌▪█▌▄▌▪█▪██▌▐█ ▄█    •██  ▪     ▪     ██•
▐█▀▀█▄▄█▀▀█ ██ ▄▄▐▀▀▄·█▌▐█▌ ██▀·     ▐█.▪ ▄█▀▄  ▄█▀▄ ██▪
██▄▪▐█▐█ ▪▐▌▐███▌▐█.█▌▐█▄█▌▐█▪·•     ▐█▌·▐█▌.▐▌▐█▌.▐▌▐█▌▐▌
·▀▀▀▀  ▀  ▀ ·▀▀▀ ·▀  ▀ ▀▀▀ .▀        ▀▀▀  ▀█▄▀▪ ▀█▄▀▪.▀▀▀`

const BANNER_WIDTH = 58

export type Action =
    | "backup"
    | "backupFast"
    | "emotes"
    | "backupMessages"
    | "load"
    | "delName"
    | "delCategory"
    | "template"
    | "list"
    | "exit"

const MENU: { value: Action; label: Key }[] = [
    { value: "backup", label: "menu.backup" },
    { value: "backupFast", label: "menu.backupFast" },
    { value: "emotes", label: "menu.emotes" },
    { value: "backupMessages", label: "menu.backupMessages" },
    { value: "load", label: "menu.load" },
    { value: "delName", label: "menu.delName" },
    { value: "delCategory", label: "menu.delCategory" },
    { value: "template", label: "menu.template" },
    { value: "list", label: "menu.list" },
    { value: "exit", label: "menu.exit" },
]

export function banner() {
    console.clear()
    if ((process.stdout.columns ?? 0) >= BANNER_WIDTH) {
        console.log(paint(BANNER))
    } else {
        console.log(paint("Backup Tool V2"))
    }
    console.log()
}

function unwrap<T>(value: T): Exclude<T, symbol> | null {
    if (isCancel(value) || typeof value === "symbol") {
        cancel(t("common.cancelled"))
        return null
    }
    return value as Exclude<T, symbol>
}

export async function menu(): Promise<Action> {
    banner()
    const choice = unwrap(await select({
        message: paint(t("menu.title")),
        options: MENU.map(({ value, label }) => ({ value, label: t(label) })),
    }))
    return choice ?? "exit"
}

export async function ask(key: Key): Promise<string | null> {
    const answer = unwrap(await text({
        message: paint(t(key)),
        validate: (value) => (value?.trim() ? undefined : t("ask.required")),
    }))
    return answer?.trim() ?? null
}

export const askGuild = () => ask("ask.guild")
export const askBackupId = () => ask("ask.backupId")
export const askChannelName = () => ask("ask.channelName")
export const askCategoryId = () => ask("ask.categoryId")

export async function loading<T>(key: Key, task: () => Promise<T>, done?: Key): Promise<T> {
    const s = spinner()
    s.start(paint(t(key)))
    try {
        const result = await task()
        s.stop(paint(t(done ?? key)))
        return result
    } catch (err) {
        s.error(t(key))
        throw err
    }
}

export async function wait() {
    await select({
        message: t("common.continue"),
        options: [{ value: true, label: "OK" }],
    })
}

export const say = (message: string) => log.info(paint(message))
export const fail = (message: string) => log.error(message)
export const hello = (message: string) => intro(paint(message))
export const bye = () => outro(paint(t("common.bye")))
