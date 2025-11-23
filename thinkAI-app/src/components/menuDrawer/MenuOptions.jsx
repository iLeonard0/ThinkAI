import React from "react"
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import { PRIMARY_MAIN } from "../../theme/palette"
import { useNavigate } from "react-router"
import { v4 as uuidv4 } from 'uuid'

export default function MenuOptions() {
    const navigate = useNavigate()

    const handleNewChat = () => {
        const newId = uuidv4()
        navigate(`/chat/${newId}`)
    }

    return (
        <Box>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleNewChat}>
                        <ListItemIcon sx={{ minWidth: '50px' }}>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Novo Chat"
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}