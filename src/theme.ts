import gradient from "gradient-string"

const palettes: Record<string, string[]> = {
    blue: ["#3c00ff", "#07d6fa"],
    green: ["#4dff00", "#00ff88"],
    purple: ["#7b2ff7", "#f107a3"],
    pink: ["#f5008f", "#f500dc"],
    red: ["#f50018", "#f54e00"],
    orange: ["#f54e00", "#f59f00"],
    yellow: ["#f5cc00", "#d4f500"],
    cyan: ["#00f59b", "#00f5e5"],
}

let colors = palettes.blue!

export function setColor(raw: unknown) {
    const name = String(raw ?? "").trim().toLowerCase()
    colors = palettes[name] ?? palettes.blue!
}

export const paint = (text: string) => gradient(colors)(text)
export const paintReverse = (text: string) => gradient([...colors].reverse())(text)
