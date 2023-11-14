import React from 'react'
import { Icon } from '@iconify/react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import {  useNavigate } from 'react-router-dom';


const drawerWidth = 160;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Navbar = () => {

    const navigate = useNavigate()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const goToTop10Songs = () => { navigate('/topsongs') }
    const goToTop10Artists = () => { navigate('/topartists') }
    const goToAllSongs = () => { navigate('/allsongs') }
    const goToAllArtists = () => { navigate('/allartists') }
    const goToHomepage = () => { navigate('/homepage') }
    const goToAddSongs = () => { navigate('/addsong') }


    return (
        <Box sx={{ display: 'flex', background: 'white' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} style={{ background: 'white', color: 'black' }}>
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div style={{ width: '100%' }}>
                        <nav class="navbar navbar-expand-lg navbar-light bg-light bg-white" style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 20px', flexWrap: 'wrap' }}>
                            <Icon icon="logos:spotify" width='100px' style={{ margin: '10px' }} />
                            <form class="form-inline my-2 my-lg-0" style={{ display: 'flex', }}>
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ margin: '0px 5px' }} />
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </nav>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                <List style={{ display: 'flex', flexDirection: 'column' }}>
                                <ListItem onClick={goToHomepage} style={{cursor:'pointer',color:'darkgrey',fontSize:'medium'}}>Home</ListItem>
                                <ListItem onClick={goToTop10Songs} style={{cursor:'pointer',color:'darkgrey' ,fontSize:'medium'}}>Top Songs</ListItem>
                                <ListItem onClick={goToTop10Artists} style={{cursor:'pointer',color:'darkgrey' ,fontSize:'medium'}}>Top Artists</ListItem>
                                <ListItem onClick={goToAllSongs} style={{cursor:'pointer',color:'darkgrey' ,fontSize:'medium'}}>All Songs</ListItem>
                                <ListItem onClick={goToAllArtists} style={{cursor:'pointer',color:'darkgrey' ,fontSize:'medium'}}>All Artists</ListItem>
                                <ListItem onClick={goToAddSongs} style={{cursor:'pointer',color:'darkgrey' ,fontSize:'medium'}}>Add Songs</ListItem>
                </List>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    )
}

export default Navbar