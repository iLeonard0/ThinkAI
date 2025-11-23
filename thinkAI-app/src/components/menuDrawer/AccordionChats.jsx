import React, { useEffect, useState } from "react"
import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router"
import { api } from "../../services/api"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function AccordionChats({ open, searchQuery = "" }) {
    const [chats, setChats] = useState([])
    const navigate = useNavigate()
    const { id: currentChatId } = useParams()
    const storedUserProfile = localStorage.getItem("@App:user")
    const userProfile = storedUserProfile ? JSON.parse(storedUserProfile) : { email: "default-user" }

    const fetchChats = async () => {
        try {
            const response = await api.get(`/api/v1/my-chats?userId=${userProfile.email}`)
            setChats(response.data)
        } catch (error) {
            console.error("Erro ao buscar chats", error)
        }
    }

    useEffect(() => {
        if (open) fetchChats()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    if (!open) return null

    const filteredChats = chats.filter(chat =>
        !searchQuery || chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <Box>
            <Accordion defaultExpanded sx={{ bgcolor: 'transparent', boxShadow: 'none', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                    <Typography>
                        {searchQuery ? "Resultados" : "Seus chats"}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                    <List>
                        {filteredChats.length > 0 ? (
                            filteredChats.map((chat) => (
                                <ListItem key={chat.id} disablePadding>
                                    <ListItemButton
                                        onClick={() => navigate(`/chat/${chat.id}`)}
                                        selected={currentChatId === chat.id}
                                        sx={{
                                            '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.1)' }
                                        }}
                                    >
                                        <ListItemText
                                            primary={chat.title}
                                            slotProps={{
                                                primary: {
                                                    noWrap: true,
                                                    style: { color: 'white', fontSize: '14px' }
                                                }
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mr: 4 }}>
                                <Typography variant="body2" sx={{ pl: 2, color: '#b9b7b7ff' }}>
                                    Nenhum chat encontrado
                                </Typography>
                            </Box>
                        )}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}