import React, { useState } from 'react'
import { Box, Toolbar, Divider, IconButton, Drawer, } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Outlet } from 'react-router'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

const drawerWidth = 240
const closedDrawerWidth = 65

function ThinkAiIcon() {
    return (
        <Box
            sx={{
                width: 32,
                height: 32,
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
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: (theme) => `4px solid ${theme.palette.background.default}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: (theme) => theme.palette.background.default,
                    }}
                />
            </Box>
        </Box>
    )
}

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
                        ml: open ? 2 : 0,
                        mr: open ? 1 : 0,
                        ...theme.mixins.toolbar,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        {open ? (
                            <ThinkAiIcon />
                        ) : (
                            <IconButton onClick={handleDrawerOpen}>
                                <MenuIcon />
                            </IconButton>
                        )}

                    </Box>
                    {open && (
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    )}
                </Box>
                <Divider />
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