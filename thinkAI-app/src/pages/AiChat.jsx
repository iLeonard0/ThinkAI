import React from "react"
import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { capitalizeEachWord } from "../utils"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export default function AiChat() {
    const storedUserProfile = localStorage.getItem("@App:user")
    const userProfile = storedUserProfile ? JSON.parse(storedUserProfile) : { name: "Usuário" }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                px: 2,
                width: '100%',
                height: '100%',
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 1,
                width: '100%',
                maxWidth: '768px',
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <Typography
                        variant="h2"
                        color="white"
                        sx={{
                            fontSize: { xs: '1.75rem' },
                        }}
                    >
                        {`Ei, ${capitalizeEachWord(userProfile.name)}. Tudo pronto para começar?`}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <TextField
                        fullWidth
                        placeholder="Pergunte algo para começar"
                        sx={{
                            mt: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: '28px',
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: 'none',
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    border: 'none',
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: 'none',
                                },
                            },
                            "& .MuiInputBase-input": {
                                paddingLeft: "24px",
                            }
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                                            <IconButton
                                                size="small"
                                            >
                                                <ArrowUpwardIcon />
                                            </IconButton>
                                        </Box>
                                    </InputAdornment>
                                ),
                            }
                        }}
                    >
                    </TextField>
                </Box>
            </Box>
        </Box>
    )
}