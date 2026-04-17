export type ThemeState = {
    theme: "light" | "dark",
    fontSize: number
}

export type ThemeAction = {
    type: "TOGGLE_THEME" | "SET_FONT_SIZE",
    payload?: number
}