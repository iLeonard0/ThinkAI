export const PRIMARY_GRADIENT_START = "#a855f7"
export const PRIMARY_GRADIENT_END = "#7c3aed"

export const PRIMARY_MAIN = "#a855f7"
export const PRIMARY_DARK = "#7c3aed"
export const PRIMARY_HOVER_START = "#9333ea"
export const PRIMARY_HOVER_END = "#6d28d9"

export const SECONDARY_MAIN = "#1a0b2e"
export const SECONDARY_DARK = "#120825"
export const SECONDARY_HOVER_START = "#210d3a"
export const SECONDARY_HOVER_END = "#0c061b"

export const BG_DARK_START = "#0a0a0a"
export const BG_DARK_END = "#1a1a2e"

export const GLASS_BG = "rgba(17, 25, 40, 0.75)"
export const GLASS_BORDER = "rgba(255, 255, 255, 0.125)"

export const TEXT_MAIN = "#ffffff"
export const TEXT_SECONDARY = "rgba(255, 255, 255, 0.6)"

export const INPUT_BG = "rgba(255, 255, 255, 0.05)"
export const INPUT_BORDER = "rgba(255, 255, 255, 0.1)"
export const INPUT_BORDER_HOVER = "rgba(255, 255, 255, 0.2)"
export const INPUT_BORDER_FOCUS = "#a855f7"

export const createPalette = (mode = 'dark') => {
    return {
        mode,

        primary: {
            main: PRIMARY_MAIN,
            dark: PRIMARY_DARK,
        },

        secondary: {
            main: "#7c3aed",
        },

        background: {
            default: BG_DARK_START,
            paper: GLASS_BG,
        },

        text: {
            primary: TEXT_MAIN,
            secondary: TEXT_SECONDARY,
        },

        custom: {
            gradientButton: `linear-gradient(135deg, ${PRIMARY_GRADIENT_START} 0%, ${PRIMARY_GRADIENT_END} 100%)`,
            gradientButtonHover: `linear-gradient(135deg, ${PRIMARY_HOVER_START} 0%, ${PRIMARY_HOVER_END} 100%)`,
            pageBackground: `linear-gradient(135deg, ${BG_DARK_START} 0%, ${BG_DARK_END} 100%)`,
            glassBackground: GLASS_BG,
            glassBorder: GLASS_BORDER,

            input: {
                background: INPUT_BG,
                border: INPUT_BORDER,
                borderHover: INPUT_BORDER_HOVER,
                borderFocus: INPUT_BORDER_FOCUS,
            }
        }
    }
}