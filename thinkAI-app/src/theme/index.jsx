
import { createTheme } from '@mui/material'
import { createPalette } from './palette'
import { ptBR as corePtBr, ptBR } from '@mui/material/locale'
import { ThemeFonts } from './typography'
import components from './components'

function generateScrollBarStyle(mode) {
    const options = {
        track: ('dark' === mode ? 'rgba(65, 75, 82, 0.3)' : '#F5F5F5'),
        active: ('dark' === mode ? 'rgba(79, 91, 100)' : 'rgba(191, 191, 191, 0.4)'),
        thumb: ('dark' === mode ? 'rgba(79, 91, 100, 0.6)' : 'rgba(191, 191, 191, 0.6)'),
    }

    return {
        '@supports not selector(::-webkit-scrollbar)': {
            scrollbarColor: `${options.thumb} ${options.track}`,
            scrollbarWidth: 'thin',
        },
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
            backgroundColor: options.track,
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            minHeight: 10,
            border: `1px solid ${options.track}`,
            borderRadius: '5px',
            backgroundColor: options.thumb,
        },
        '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: options.active,
        },
        '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: options.active,
        },
        '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: options.active,
        },
        '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: options.track,
        }
    }
}


export const createThemeApp = (mode = 'dark') => {
    const palette = createPalette(mode)

    return createTheme({
        palette: palette,
        typography: ThemeFonts,

        components: {
            ...components,

            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        ...generateScrollBarStyle(mode),
                        background: palette.custom.pageBackground,
                        backgroundAttachment: 'fixed',
                    }
                },
            },

            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: palette.background.paper,
                        backdropFilter: "blur(16px)",
                        borderBottom: `1px solid ${palette.custom.glassBorder}`,
                        backgroundImage: 'unset',

                        color: palette.text.primary,

                        '& .MuiSvgIcon-root': {
                            color: palette.text.primary,
                        },
                        '& .MuiIconButton-root': {
                            color: palette.text.primary,
                        },
                        '& .MuiToolbar-root .MuiTypography-root': {
                            color: palette.text.primary,
                        }
                    }
                }
            },

            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        width: '256px',
                        backgroundColor: palette.custom.glassBackground,
                        backdropFilter: "blur(16px)",
                        borderRight: `1px solid ${palette.custom.glassBorder}`,
                        backgroundImage: 'unset',
                    }
                }
            },
        },

        zIndex: {
            appBar: 1200,
            drawer: 1100
        },

    }, ptBR, corePtBr)
}