import React, { useContext, useState } from 'react'
import { Box, Divider, IconButton, Drawer, Typography, AppBar, Toolbar, Avatar, InputBase, Menu, MenuItem, ListItemIcon } from '@mui/material'
import { PRIMARY_MAIN } from '../../theme/palette'
import { useTheme } from '@mui/material/styles'
import { Outlet, useNavigate } from 'react-router'
import MenuIcon from '@mui/icons-material/Menu'
import AccordionChats from './AccordionChats'
import MenuOptions from './MenuOptions'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import LogoutIcon from '@mui/icons-material/Logout'
import { AuthContext } from '../../context/AuthProvider'

const drawerWidth = 285
const closedDrawerWidth = 60

export default function MenuDrawer() {
    const theme = useTheme()
    const [open, setOpen] = useState(true)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const handleDrawerOpenAndClose = () => {
        setOpen(!open)
    }

    const toggleSearch = () => {
        if (isSearchActive) {
            setSearchTerm("")
        }

        setIsSearchActive(!isSearchActive)
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${open ? drawerWidth : closedDrawerWidth}px)`,
                    ml: `${open ? drawerWidth : closedDrawerWidth}px`,
                    boxShadow: 'none',
                    bgcolor: 'rgba(13, 19, 31, 0.75)',
                    borderBottom: '1px solid #333',
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar>
                    <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, color: 'white' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <img src="\public\thinkai-icon.png" height={'50px'} width={'50px'} />
                            Think AI
                        </Box>
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            onClick={handleClick}>
                            <Avatar sx={{ bgcolor: PRIMARY_MAIN, width: 32, height: 32 }}></Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleClose}
                            onClick={handleClose}
                        >
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize='small' />
                                </ListItemIcon>
                                Sair
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

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
                        bgcolor: 'rgba(13, 19, 31, 0.75)',
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
                    {!isSearchActive ? (
                        <>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <IconButton onClick={handleDrawerOpenAndClose}>
                                    <MenuIcon />
                                </IconButton>
                            </Box>

                            {open && (
                                <IconButton onClick={toggleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            )}
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', pr: 0, pl: 1, mt: 0.5 }}>
                            <SearchIcon sx={{ color: 'gray', mr: 1 }} />
                            <InputBase
                                autoFocus
                                placeholder="Pesquisar chat..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{ color: 'white', flex: 1, }}
                            />
                            <IconButton onClick={toggleSearch} size="small">
                                <CloseIcon sx={{ color: 'gray' }} />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                <Divider />
                <MenuOptions />
                <AccordionChats
                    open={open}
                    searchQuery={searchTerm}
                />
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    overflow: 'hidden'
                }}
            >
                <Toolbar />
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box >
    )
}