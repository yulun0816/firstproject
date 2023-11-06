import Link from 'next/link';
import Image from 'next/image';
import navbarStyles from './navbar.module.scss';
import utilsStyles from '../../styles/utils.module.css';
import { FaUser } from "react-icons/fa6";
import { getCartItem } from 'reducer/projectReducer';
import { useSelector } from 'react-redux';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 240;

export default function NavBar() {
    const cartItem = useSelector(getCartItem);
    let cartCount = 0;

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    if (cartItem !== null && cartItem.length > 0) {
        cartCount = cartItem.reduce((sum, current) => sum + current.count, cartCount);
    }

    const navItems = [
        { url: "/", children: "首頁" },
        { url: "/products", children: "所有商品" },
        { url: "/posts/pre-rendering", children: "關於公司" },
        {
            url: "/cart",
            className: utilsStyles.posRelative,
            children: (
                <Badge badgeContent={cartCount} color="success" max={999}>
                    <ShoppingCartIcon />
                </Badge>
            )
        },
        { url: "/posts/pre-rendering", children: <FaUser /> }
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                瀅瀅美代子
            </Typography>
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={<Link key={index} href={item.url} className={item.className && item.className}>{item.children}</Link>} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <CssBaseline />
            <AppBar component="nav" color="inherit" position="sticky" className={navbarStyles.container} sx={{ padding: "0.5rem 0" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}
                    >
                        <Link href="/" className={navbarStyles.titleIcon}>
                            <Image
                                priority
                                src="/images/profile.jpg"
                                className={utilsStyles.borderCircle}
                                height={80}
                                width={80}
                                alt=""
                            />
                            <span>瀅瀅美代子</span>
                        </Link>
                    </Typography>
                    <Box className={navbarStyles.itemList} sx={{ display: { xs: 'none', md: 'block' } }}>
                        {navItems.map((item, index) => (
                            <Link key={index} href={item.url} className={item.className && item.className}>
                                <Button color="inherit" sx={{ fontSize: '1rem' }}>
                                    {item.children}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    className={navbarStyles.container}
                >
                    {drawer}
                </Drawer>
            </nav>
        </>
    )
}