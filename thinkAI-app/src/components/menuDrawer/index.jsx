import React, { useState } from 'react'
import { Box, Toolbar, Divider, IconButton, Drawer, Typography, } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Outlet } from 'react-router'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { PRIMARY_MAIN } from '../../theme/palette'
import AccordionChats from './AccordionChats'
import MenuOptions from './MenuOptions'

const drawerWidth = 285
const closedDrawerWidth = 60

export default function MenuDrawer() {
    const theme = useTheme()
    const [open, setOpen] = useState(true)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    width: open ? drawerWidth : closedDrawerWidth,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
                    }),
                    overflowX: 'hidden',

                    '& .MuiDrawer-paper': {
                        width: open ? drawerWidth : closedDrawerWidth,
                        boxSizing: 'border-box',
                        overflowX: 'hidden',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
                        }),
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: open ? 'space-between' : 'center',
                        ml: open ? 0.5 : 0.4,
                        mr: open ? 1 : 0.9,
                        ...theme.mixins.toolbar,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        {open ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                                <img src="\public\thinkai-icon.png" height={'50px'} width={'50px'} />
                                <Typography variant='h4' sx={{ fontWeight: 'bold', color: PRIMARY_MAIN }}>
                                    Think AI
                                </Typography>
                            </Box>
                        ) : (
                            <IconButton onClick={handleDrawerOpen}>
                                <MenuIcon sx={{ color: PRIMARY_MAIN }} />
                            </IconButton>
                        )}

                    </Box>
                    {open && (
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon sx={{ color: PRIMARY_MAIN }} />
                        </IconButton>
                    )}
                </Box>
                <Divider />
                <MenuOptions />
                <AccordionChats
                    open={open}
                />
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    display: 'flex'
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}