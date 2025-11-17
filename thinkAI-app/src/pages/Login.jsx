import React, { useContext, useState } from "react"
import { Box, Button, Container, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router"
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { useSnackbar } from "notistack"
import { AuthContext } from "../context/AuthProvider"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(AuthContext)
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)

            await login(email, password)
            navigate('/chatAi')
        } catch (err) {
            enqueueSnackbar('Erro ao fazer login. Verifique suas credenciais.', { variant: 'error' })
            console.error("Erro ao fazer login:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = (e) => {
        e.preventDefault()
        navigate('/register')
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={24}
                    sx={{
                        p: 4,
                        backdropFilter: "blur(16px)",
                        border: (theme) => `1px solid ${theme.palette.custom.glassBorder}`,
                        borderRadius: 4,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: "50%",
                                background: (theme) => theme.palette.custom.gradientButton,
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
                                    border: (theme) => `4px solid ${theme.palette.background.default}`,
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
                                        background: (theme) => theme.palette.background.default,
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Typography
                        variant="h1"
                        align="center"
                        sx={{ fontWeight: 700, mb: 1 }}
                    >
                        Think AI
                    </Typography>

                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Não tem uma conta ainda?{" "}
                        <Typography
                            component="a"
                            href="#"
                            onClick={handleRegister}
                            sx={{
                                color: "text.primary",
                                fontWeight: 500,
                                textDecoration: "none",
                                "&:hover": {
                                    color: "primary.main"
                                },
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
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />

                            <TextField
                                fullWidth
                                type="password"
                                placeholder="senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />

                            <Button
                                loading={loading}
                                loadingPosition="start"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    height: 48,
                                    background: (theme) => theme.palette.custom.gradientButton,
                                    fontWeight: 600,
                                    fontSize: 16,
                                    borderRadius: 2,
                                    boxShadow: "0 8px 32px rgba(168, 85, 247, 0.3)",
                                    "&:hover": {
                                        background: (theme) => theme.palette.custom.gradientButtonHover,
                                        boxShadow: "0 8px 32px rgba(168, 85, 247, 0.5)",
                                    },
                                }}
                            >
                                {loading ? 'Aguarde' : 'Login'}
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    )
}