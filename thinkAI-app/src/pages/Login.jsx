import React, { useState } from "react"
import { Box, Button, Container, Divider, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useauth"
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { useSnackbar } from "notistack"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
            navigate('/dashboard')
        } catch (err) {
            enqueueSnackbar('Erro ao fazer login. Verifique suas credenciais.', { variant: 'error' });
            console.error("Erro ao fazer login:", err)
        }
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
                        Bem-vindo
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 4 }}
                    >
                        Não tem uma conta ainda?{" "}
                        <Typography
                            component="a"
                            href="#"
                            sx={{
                                color: "#fff",
                                fontWeight: 500,
                                textDecoration: "none",
                                "&:hover": { color: "#a855f7" },
                            }}
                        >
                            Cadastre-se
                        </Typography>
                    </Typography>

                    <form onSubmit={handleLogin}>
                        <Stack spacing={2}>
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

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    height: 48,
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
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    )
}