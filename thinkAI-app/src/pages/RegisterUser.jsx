import React, { useContext, useState, useTransition } from "react"
import { Box, Button, Container, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router"
import { AuthContext } from "../context/AuthProvider"
import { LoadingButton } from "@mui/lab"

export default function RegisterUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPending, startTransition] = useTransition()
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
            enqueueSnackbar("A senha deve ter pelo meno  8 caracteres.", { variant: 'error' })
            return false
        }
        return true
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const isValid = handleValidateRegister()
        if (!isValid) return

        try {
            startTransition(async () => {
                await register(name, email, password)
                enqueueSnackbar("Usuário registrado com sucesso!", { variant: "success" })
                navigate("/login")
            })

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
                        Registre-se
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    placeholder="usuário"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                />
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

                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
                                    <Button
                                        onClick={handleBackToLoginPage}
                                        type="button"
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 16,
                                            borderRadius: 2,
                                        }}
                                    >
                                        Voltar
                                    </Button>
                                    <LoadingButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        loading={isPending}
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
                                        Registrar
                                    </LoadingButton>
                                </Box>
                            </Stack>
                        </form>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}