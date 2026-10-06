const en = {
    "menu.title": "What do you want to do?",
    "menu.backup": "Create a backup",
    "menu.backupFast": "Create a backup (without loading)",
    "menu.emotes": "Create a backup of emotes",
    "menu.backupMessages": "Create a backup (with messages)",
    "menu.load": "Load a backup",
    "menu.delName": "Delete tickets (by name)",
    "menu.delCategory": "Delete tickets (from a category)",
    "menu.template": "Create a template (needs permissions)",
    "menu.list": "See the list of backups",
    "menu.exit": "Exit",

    "ask.guild": "ID of the server",
    "ask.backupId": "ID of the backup",
    "ask.channelName": "Name of the channels to delete (ex: ticket-)",
    "ask.categoryId": "ID of the category",
    "ask.required": "This field is required",

    "err.guildNotFound": "Server not found",
    "err.missingPerm": "Missing permission: {perm}",
    "err.noTemplate": "No template found",
    "err.backupNotFound": "Backup not found",
    "err.categoryNotFound": "Category not found",
    "err.noChannels": "No channel to delete",
    "status.emoteCreated": "[{n}/{total}] {name} created",
    "status.channelDeleted": "[{n}/{total}] {name} deleted",
    "status.channelFailed": "[{n}/{total}] {name} could not be deleted",

    "status.creating": "Creating the backup...",
    "status.created": "Backup created, ID: {id}",
    "status.emotesCreated": "Emote backup created, ID: {id}",
    "status.loading": "Loading the backup...",
    "status.loaded": "Loading finished",

    "list.backups": "Backups",
    "list.emotes": "Emote backups",
    "list.none": "Nothing here",

    "common.continue": "Continue",
    "common.cancelled": "Cancelled",
    "common.bye": "See you soon",
} as const

export type Key = keyof typeof en
export type Lang = "en" | "fr" | "de" | "es" | "ru"

const fr: Partial<Record<Key, string>> = {
    "menu.title": "Que veux-tu faire ?",
    "menu.backup": "Créer une backup",
    "menu.backupFast": "Créer une backup (sans chargement)",
    "menu.emotes": "Créer une backup des emotes",
    "menu.backupMessages": "Créer une backup (avec les messages)",
    "menu.load": "Charger une backup",
    "menu.delName": "Supprimer les tickets (par nom)",
    "menu.delCategory": "Supprimer les tickets (d'une catégorie)",
    "menu.template": "Créer un modèle (besoin de permissions)",
    "menu.list": "Afficher la liste des backups",
    "menu.exit": "Fermer",

    "ask.guild": "ID du serveur",
    "ask.backupId": "ID de la backup",
    "ask.channelName": "Nom des salons à supprimer (ex: ticket-)",
    "ask.categoryId": "ID de la catégorie",
    "ask.required": "Ce champ est obligatoire",

    "err.guildNotFound": "Serveur introuvable",
    "err.missingPerm": "Permission manquante : {perm}",
    "err.noTemplate": "Aucun modèle trouvé",
    "err.backupNotFound": "Backup introuvable",
    "err.categoryNotFound": "Catégorie introuvable",
    "err.noChannels": "Aucun salon à supprimer",
    "status.emoteCreated": "[{n}/{total}] {name} créé",
    "status.channelDeleted": "[{n}/{total}] {name} supprimé",
    "status.channelFailed": "[{n}/{total}] {name} n'a pas pu être supprimé",

    "status.creating": "Création de la backup...",
    "status.created": "Backup créée, ID : {id}",
    "status.emotesCreated": "Backup d'emotes créée, ID : {id}",
    "status.loading": "Chargement de la backup...",
    "status.loaded": "Chargement terminé",

    "list.backups": "Backups",
    "list.emotes": "Backups d'emotes",
    "list.none": "Rien ici",

    "common.continue": "Continuer",
    "common.cancelled": "Annulé",
    "common.bye": "À bientôt",
}

const de: Partial<Record<Key, string>> = {
    "menu.title": "Was möchtest du tun?",
    "menu.backup": "Backup erstellen",
    "menu.backupFast": "Backup erstellen (ohne Laden)",
    "menu.emotes": "Emote-Backup erstellen",
    "menu.backupMessages": "Backup erstellen (mit Nachrichten)",
    "menu.load": "Backup laden",
    "menu.delName": "Tickets löschen (nach Name)",
    "menu.delCategory": "Tickets löschen (aus Kategorie)",
    "menu.template": "Vorlage erstellen (Berechtigungen nötig)",
    "menu.list": "Backup-Liste anzeigen",
    "menu.exit": "Beenden",

    "ask.guild": "Server-ID",
    "ask.backupId": "Backup-ID",
    "ask.channelName": "Name der zu löschenden Kanäle (z. B. ticket-)",
    "ask.categoryId": "Kategorie-ID",
    "ask.required": "Dieses Feld ist erforderlich",

    "err.guildNotFound": "Server nicht gefunden",
    "err.missingPerm": "Fehlende Berechtigung: {perm}",
    "err.noTemplate": "Keine Vorlage gefunden",
    "err.backupNotFound": "Backup nicht gefunden",
    "err.categoryNotFound": "Kategorie nicht gefunden",
    "err.noChannels": "Keine Kanäle zum Löschen",
    "status.emoteCreated": "[{n}/{total}] {name} erstellt",
    "status.channelDeleted": "[{n}/{total}] {name} gelöscht",
    "status.channelFailed": "[{n}/{total}] {name} konnte nicht gelöscht werden",

    "status.creating": "Backup wird erstellt...",
    "status.created": "Backup erstellt, ID: {id}",
    "status.emotesCreated": "Emote-Backup erstellt, ID: {id}",
    "status.loading": "Backup wird geladen...",
    "status.loaded": "Laden abgeschlossen",

    "list.backups": "Backups",
    "list.emotes": "Emote-Backups",
    "list.none": "Nichts vorhanden",

    "common.continue": "Weiter",
    "common.cancelled": "Abgebrochen",
    "common.bye": "Bis bald",
}

const es: Partial<Record<Key, string>> = {
    "menu.title": "¿Qué quieres hacer?",
    "menu.backup": "Crear una copia de seguridad",
    "menu.backupFast": "Crear una copia (sin cargar)",
    "menu.emotes": "Crear una copia de los emotes",
    "menu.backupMessages": "Crear una copia (con mensajes)",
    "menu.load": "Cargar una copia",
    "menu.delName": "Borrar tickets (por nombre)",
    "menu.delCategory": "Borrar tickets (de una categoría)",
    "menu.template": "Crear una plantilla (requiere permisos)",
    "menu.list": "Ver la lista de copias",
    "menu.exit": "Salir",

    "ask.guild": "ID del servidor",
    "ask.backupId": "ID de la copia",
    "ask.channelName": "Nombre de los canales a borrar (ej: ticket-)",
    "ask.categoryId": "ID de la categoría",
    "ask.required": "Este campo es obligatorio",

    "err.guildNotFound": "Servidor no encontrado",
    "err.missingPerm": "Falta el permiso: {perm}",
    "err.noTemplate": "No se encontró ninguna plantilla",
    "err.backupNotFound": "Copia no encontrada",
    "err.categoryNotFound": "Categoría no encontrada",
    "err.noChannels": "Ningún canal para borrar",
    "status.emoteCreated": "[{n}/{total}] {name} creado",
    "status.channelDeleted": "[{n}/{total}] {name} borrado",
    "status.channelFailed": "[{n}/{total}] No se pudo borrar {name}",

    "status.creating": "Creando la copia...",
    "status.created": "Copia creada, ID: {id}",
    "status.emotesCreated": "Copia de emotes creada, ID: {id}",
    "status.loading": "Cargando la copia...",
    "status.loaded": "Carga terminada",

    "list.backups": "Copias",
    "list.emotes": "Copias de emotes",
    "list.none": "Nada por aquí",

    "common.continue": "Continuar",
    "common.cancelled": "Cancelado",
    "common.bye": "Hasta pronto",
}

const ru: Partial<Record<Key, string>> = {
    "menu.title": "Что хотите сделать?",
    "menu.backup": "Создать бэкап",
    "menu.backupFast": "Создать бэкап (без загрузки)",
    "menu.emotes": "Создать бэкап эмодзи",
    "menu.backupMessages": "Создать бэкап (с сообщениями)",
    "menu.load": "Загрузить бэкап",
    "menu.delName": "Удалить тикеты (по имени)",
    "menu.delCategory": "Удалить тикеты (из категории)",
    "menu.template": "Создать шаблон (нужны права)",
    "menu.list": "Показать список бэкапов",
    "menu.exit": "Выход",

    "ask.guild": "ID сервера",
    "ask.backupId": "ID бэкапа",
    "ask.channelName": "Имя каналов для удаления (напр. ticket-)",
    "ask.categoryId": "ID категории",
    "ask.required": "Это поле обязательно",

    "err.guildNotFound": "Сервер не найден",
    "err.missingPerm": "Не хватает права: {perm}",
    "err.noTemplate": "Шаблон не найден",
    "err.backupNotFound": "Бэкап не найден",
    "err.categoryNotFound": "Категория не найдена",
    "err.noChannels": "Нет каналов для удаления",
    "status.emoteCreated": "[{n}/{total}] {name} создан",
    "status.channelDeleted": "[{n}/{total}] {name} удалён",
    "status.channelFailed": "[{n}/{total}] Не удалось удалить {name}",

    "status.creating": "Создание бэкапа...",
    "status.created": "Бэкап создан, ID: {id}",
    "status.emotesCreated": "Бэкап эмодзи создан, ID: {id}",
    "status.loading": "Загрузка бэкапа...",
    "status.loaded": "Загрузка завершена",

    "list.backups": "Бэкапы",
    "list.emotes": "Бэкапы эмодзи",
    "list.none": "Пусто",

    "common.continue": "Продолжить",
    "common.cancelled": "Отменено",
    "common.bye": "До скорого",
}

const dict: Record<Lang, Partial<Record<Key, string>>> = { en, fr, de, es, ru }

let current: Lang = "en"

export function setLang(raw: unknown) {
    const value = String(raw ?? "").trim().toLowerCase()
    const lang = value === "sp" ? "es" : value
    current = lang in dict ? (lang as Lang) : "en"
}

export function t(key: Key, vars: Record<string, string | number> = {}): string {
    const text = dict[current][key] ?? en[key]
    return text.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`))
}
