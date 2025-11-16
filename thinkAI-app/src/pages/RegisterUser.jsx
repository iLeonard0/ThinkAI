import React, { useContext, useState } from "react"
import { Box, Button, Container, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router"
import { AuthContext } from "../context/AuthProvider"

export default function RegisterUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { register } = useContext(AuthContext)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const handleValidateRegister = () => {
        if (name.trim() === "") {
            enqueueSnackbar("O nome do usuário não pode estar vazio.", { variant: 'error' })
            return false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            enqueueSnackbar("Digite um e-mail válido.", { variant: 'error' })
            return false
        }

        if (password.length < 8) {
            enqueueSnackbar("A senha deve ter pelo meno  8 caracteres.", { variant: 'error' })
            return false
        }

        return true
    }

    async function handleRegister() {
        try {
            const isValid = handleValidateRegister()
            if (!isValid) return

            await register(name, email, password)
            enqueueSnackbar("Usuário registrado com sucesso!", { variant: 'success' })
            navigate("/login")
        } catch {
            enqueueSnackbar("Falha ao registrar o usuário", { variant: 'error' })
        }
    }

    function handleBackToLoginPage() {
        navigate("/login")
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={24}
                    sx={{
                        p: 4,
                        background: "rgba(17, 25, 40, 0.75)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255, 255, 255, 0.125)",
                        borderRadius: 4,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 8px 32px rgba(168, 85, 247, 0.3)",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "50%",
                                    border: "4px solid rgba(17, 25, 40, 1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: "50%",
                                        background: "rgba(17, 25, 40, 1)",
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{ color: "#fff", fontWeight: 700, mb: 1 }}
                    >
                        Registre-se
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                type="text"
                                placeholder="usuário"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        background: "rgba(255, 255, 255, 0.05)",
                                        borderRadius: 2,
                                        color: "#fff",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "rgba(255, 255, 255, 0.1)",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "rgba(255, 255, 255, 0.2)",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#a855f7",
                                        },
                                    },
                                }}
                                sx={{
                                    "& .MuiInputBase-input::placeholder": {
                                        color: "rgba(255, 255, 255, 0.5)",
                                        opacity: 1,
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        background: "rgba(255, 255, 255, 0.05)",
                                        borderRadius: 2,
                                        color: "#fff",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "rgba(255, 255, 255, 0.1)",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "rgba(255, 255, 255, 0.2)",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#a855f7",
                                        },
                                    },
                                }}
                                sx={{
                                    "& .MuiInputBase-input::placeholder": {
                                        color: "rgba(255, 255, 255, 0.5)",
                                        opacity: 1,
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                type="password"
                                placeholder="senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        background: "rgba(255, 255, 255, 0.05)",
                                        borderRadius: 2,
                                        color: "#fff",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "rgba(255, 255, 255, 0.1)",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "rgba(255, 255, 255, 0.2)",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#a855f7",
                                        },
                                    },
                                }}
                                sx={{
                                    "& .MuiInputBase-input::placeholder": {
                                        color: "rgba(255, 255, 255, 0.5)",
                                        opacity: 1,
                                    },
                                }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
                                <Button
                                    onClick={handleBackToLoginPage}
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        // background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
                                        color: "#fff",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        fontSize: 16,
                                        borderRadius: 2,
                                        borderColor: '#a855f7'
                                    }}
                                >
                                    Voltar
                                </Button>
                                <Button
                                    onClick={handleRegister}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
                                        color: "#fff",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        fontSize: 16,
                                        borderRadius: 2,
                                        boxShadow: "0 8px 32px rgba(168, 85, 247, 0.3)",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #9333ea 0%, #6d28d9 100%)",
                                            boxShadow: "0 8px 32px rgba(168, 85, 247, 0.5)",
                                        },
                                    }}
                                >
                                    Registrar
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}