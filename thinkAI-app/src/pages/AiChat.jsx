import React, { useState, useRef, useEffect } from "react"
import { Box, IconButton, InputAdornment, TextField, Typography, CircularProgress, Paper, Fade } from "@mui/material"
import { capitalizeEachWord } from "../utils"
import { BG_DARK_END, PRIMARY_DARK, SECONDARY_HOVER_END } from "../theme/palette"
import { api } from "../services/api"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useSnackbar } from "notistack"
import { Link, useNavigate, useParams } from "react-router"
import { v4 as uuidv4 } from 'uuid'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AiChat() {
    const { id } = useParams()
    const chatId = id;
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const storedUserProfile = localStorage.getItem("@App:user")
    const userProfile = storedUserProfile ? JSON.parse(storedUserProfile) : { name: "Usuário" }
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [hasStartedChat, setHasStartedChat] = useState(false)

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (!id) {
            const newId = uuidv4()
            navigate(`/chat/${newId}`, { replace: true })
        }
    }, [id, navigate])

    useEffect(() => {
        async function loadHistory() {
            if (!chatId) return

            setMessages([])
            setHasStartedChat(false)
            setIsLoading(true)

            try {
                const response = await api.get(`/api/v1/chat-history/${chatId}`)
                if (response.data && response.data.length > 0) {
                    const history = response.data.map(msg => ({
                        text: msg.content,
                        sender: msg.sender,
                    }))

                    setMessages(history)
                    setHasStartedChat(true)
                }
            } catch (error) {
                console.error("Erro ao carregar histórico", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadHistory()
    }, [chatId])

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return

        setHasStartedChat(true)

        const userMessage = { text: inputValue, sender: 'user' }
        setMessages((prev) => [...prev, userMessage])

        const messageText = inputValue
        setInputValue("")
        setIsLoading(true)

        try {
            const response = await api.post("api/v1/ask", {
                message: messageText,
                chatId: chatId,
                userId: userProfile.email
            }, {
                timeout: 120000
            })

            const aiReply = response.data.reply
            setMessages((prev) => [...prev, { text: aiReply, sender: 'ai' }])

        } catch (error) {
            console.error("Erro na requisição:", error)
            let errorMsg = "Ocorreu um erro ao gerar sua resposta.";

            if (error.code === 'ECONNABORTED') {
                errorMsg = "A IA demorou muito para responder. Tente novamente.";
            } else if (error.response?.status === 429) {
                errorMsg = "Muitas requisições ou cota excedida.";
            } else if (error.response?.status === 403) {
                errorMsg = "Sessão expirada. Faça login novamente.";
            }

            enqueueSnackbar(errorMsg, { variant: 'error' })

            setMessages((prev) => [...prev, {
                text: errorMsg,
                sender: 'ai',
                isError: true
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSendMessage()
        }
    }

    const showWelcomeScreen = messages.length === 0 && !hasStartedChat;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                position: "relative",
                overflow: "hidden",
                px: 2,
                width: '100%',
                height: '100vh',
            }}
        >
            <Box sx={{
                flexGrow: 1,
                width: '100%',
                maxWidth: '768px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                pb: 2,
                pt: 10,

                "&::-webkit-scrollbar": {
                    display: "none"
                },
                "scrollbarWidth": "none",
                "-ms-overflow-style": "none",
            }}>
                {messages.map((msg, index) => (
                    <Fade in={true} timeout={500} key={index}>
                        <Box
                            sx={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                            }}
                        >
                            <Paper sx={{
                                p: 2,
                                px: 3,
                                borderRadius: 2,
                                bgcolor: msg.sender === 'user' ? PRIMARY_DARK : BG_DARK_END,
                                color: 'white',
                                border: msg.isError ? '1px solid red' : 'none',
                                '& p': { m: 0, mb: 1, lineHeight: 1.6 },
                                '& p:last-child': { mb: 0 },
                                '& a': { color: '#90caf9' },
                                '& code': {
                                    fontFamily: 'monospace',
                                    bgcolor: 'rgba(0,0,0,0.3)',
                                    p: 0.5,
                                    borderRadius: 1
                                },
                                '& pre': {
                                    bgcolor: '#1e1e1e',
                                    p: 2,
                                    borderRadius: 2,
                                    overflowX: 'auto',
                                    '& code': { bgcolor: 'transparent', p: 0 }
                                },
                                '& ul, & ol': { pl: 3, mb: 1 },
                                '& li': { mb: 0.5 }
                            }}>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({ ...props }) => <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }} {...props} />,
                                        h2: ({ ...props }) => <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }} {...props} />,
                                        h3: ({ ...props }) => <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1, mb: 1 }} {...props} />,
                                        a: ({ ...props }) => <Link target="_blank" rel="noopener" sx={{ color: '#64b5f6', cursor: 'pointer' }} {...props} />,
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            </Paper>
                        </Box>
                    </Fade>
                ))}

                <div ref={messagesEndRef} />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '768px',
                mb: showWelcomeScreen ? '40vh' : 0,
                pb: showWelcomeScreen ? 0 : 3,
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 10,
                pt: 1
            }}>

                <Fade in={showWelcomeScreen} timeout={400} unmountOnExit>
                    <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', pb: 1.5 }}>
                        <Typography
                            variant="h2"
                            color="white"
                            sx={{ fontSize: { xs: '1.75rem' }, }}
                        >
                            {`Ei, ${capitalizeEachWord(userProfile.name)}. Tudo pronto para começar?`}
                        </Typography>
                    </Box>
                </Fade>

                <TextField
                    fullWidth
                    placeholder="Pergunte algo para começar"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    multiline
                    maxRows={8}
                    sx={{
                        borderRadius: '28px',
                        boxShadow: showWelcomeScreen ? '0px 4px 20px rgba(0,0,0,0.5)' : 'none',
                        transition: 'box-shadow 0.3s ease',
                        input: { color: 'white' },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: '28px',
                            "& .MuiOutlinedInput-notchedOutline": { border: 'none' },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: '1px solid #555' },
                        },
                        "& .MuiInputBase-input": { paddingLeft: "24px" }
                    }}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                                        <IconButton
                                            size="small"
                                            onClick={handleSendMessage}
                                            disabled={isLoading || !inputValue.trim()}
                                            sx={{ transition: 'all 0.2s' }}>
                                            {isLoading ?
                                                <CircularProgress size={24} sx={{ color: 'gray' }} /> :
                                                <ArrowUpwardIcon sx={{ color: inputValue.trim() ? 'black' : 'gray' }} />
                                            }
                                        </IconButton>
                                    </Box>
                                </InputAdornment>
                            ),
                        }
                    }}
                />

                <Fade in={!showWelcomeScreen} timeout={800}>
                    <Typography variant="body2" sx={{ mt: 2, fontSize: '10px', color: "white" }}>
                        IA pode cometer erros. Verifique informações importantes.
                    </Typography>
                </Fade>
            </Box>
        </Box>
    )
}