import React from "react"
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { PRIMARY_MAIN } from "../../theme/palette";

export default function MenuOptions() {
    return (
        <Box>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ minWidth: '50px' }}>
                            <AddIcon sx={{ color: PRIMARY_MAIN }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Novo Chat"
                            slotProps={{
                                primary: {
                                    color: PRIMARY_MAIN,
                                    fontWeight: 'bold'
                                }
                            }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}