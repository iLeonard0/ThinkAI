import { grey } from '@mui/material/colors'
import { INPUT_BG, INPUT_BORDER, INPUT_BORDER_FOCUS, INPUT_BORDER_HOVER, TEXT_MAIN, TEXT_SECONDARY } from './palette'

function getButtonOverrides() {

    return {
        root: {
            textTransform: 'none',
        },
        contained: {
            boxShadow: 'none',
        },
        outlined: {
            boxShadow: 'none',
        },
        grouped: {
            boxShadow: 'none',
        }
    }
}

export default {
    MuiButton: {
        styleOverrides: getButtonOverrides(),
        variants: [
            {
                props: { variant: 'contained', color: 'grey' },
                style: {
                    backgroundColor: grey[300],
                }
            }
        ]
    },
    MuiButtonBase: {
        styleOverrides: getButtonOverrides(),
    },

    MuiButtonGroup: {
        styleOverrides: getButtonOverrides(),
    },

    MuiFab: {
        styleOverrides: { root: { boxShadow: 'none' } }
    },

    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'unset',
            },
        },
    },

    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiInputBase-root': {
                    background: INPUT_BG,
                    borderRadius: 8,
                    color: TEXT_MAIN,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: INPUT_BORDER,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: INPUT_BORDER_HOVER,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: INPUT_BORDER_FOCUS,
                    },
                },

                '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                    color: TEXT_SECONDARY,
                },

                '& .MuiInputBase-input::placeholder': {
                    color: TEXT_SECONDARY,
                    opacity: 1,
                },

                '& .MuiInputBase-input:-webkit-autofill': {
                    WebkitTextFillColor: TEXT_MAIN,
                    WebkitBoxShadow: `0 0 0 1000px ${INPUT_BG} inset`,
                    boxShadow: `0 0 0 1000px ${INPUT_BG} inset`,
                    transition: 'background-color 5000s ease-in-out 0s',
                },

                '& .MuiInputBase-input:-webkit-autofill:hover, & .MuiInputBase-input:-webkit-autofill:focus, & .MuiInputBase-input:-webkit-autofill:active': {
                    WebkitBoxShadow: `0 0 0 1000px ${INPUT_BG} inset`,
                    boxShadow: `0 0 0 1000px ${INPUT_BG} inset`,
                },
            }
        }
    }
}