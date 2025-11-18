import React from "react"
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionChats({ open }) {

    if (!open) {
        return
    }

    return (
        <Box>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />} >
                    Chats
                </AccordionSummary>
                <AccordionDetails>
                    teste2
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}