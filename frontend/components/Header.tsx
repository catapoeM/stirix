"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemText,
  Button,
  Box,
  Typography
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu"
import Link from "next/link";

const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state: any) => () => {
        setOpen(state);
    }

    useEffect(() => {
        fetch("/lib/auth")
        .then(res => res.json())
        .then(data => setUser(data.user))
    }, [])

    const categories = [
        {label: "Internațional", slug: "international"}, 
        {label: "Superliga", slug: "superliga"}, 
        {label: "România", slug: "romania"},
    ];

    const logOut = () => {

    }

    return (
        <>
            {/* TOP BAR */}
            <AppBar position="static">
                <Toolbar sx={{justifyContent: "space-between"}}>
                    {/*LEFT: LOGO / TITLE */}
                    <Link href="/">
                        <Box sx={{ height: 40, display: "flex", alignItems: "center" }}>
                            <Image
                                src="/frontend/public/stirix_logo_s.png"
                                alt="Logo"
                                width={120}
                                height={86}
                                style={{
                                height: "100%",
                                width: "auto",
                                objectFit: "contain",
                                }}
                            />
                        </Box>
                    </Link>
                    {/** RIGHT: Hamburger */}
                    <IconButton color="inherit" onClick={toggleDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>

                {/* Category Buttons */}
                <Box 
                    sx={{
                        display: "flex",
                        overflowX: "auto",
                        justifyContent: "center",
                        whiteSpace: 'nowrap',  // Prevent buttons from wrapping
                        padding: 1,
                        gap: 2
                    }}
                >
                    {categories.map((cat) => (
                        <Button 
                            size="small" 
                            variant="outlined" 
                            color="inherit"
                            key={cat.slug}
                            onClick={() => router.push(`/category/${cat.slug}`)}
                        >
                            {cat.label}
                        </Button>
                    ))}
                </Box>
            </AppBar>

            {/* DRAWER (Hamburger Menu) */}
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{width: 250}} onClick={toggleDrawer(false)}>
                    <List>

                        {!user ? (
                            <>
                                <Button type="button" component={Link} href="/login">
                                    <ListItemText primary="Autentificare"/>
                                </Button>

                                <Button type="button" component={Link} href="/register">
                                    <ListItemText primary="Înregistrare" />
                                </Button>
                            </>
                        )   :   (
                            <>
                                <Button type="button" component={Link} href="/articles/create">
                                    <ListItemText primary="+ Create Article" />
                                </Button>
                                
                                <Button type="button" component={Link} href="/myarticles">
                                    <ListItemText primary="My Articles" />
                                </Button>

                                <Button type="button" onClick={() => logOut()}>
                                    <ListItemText primary="Logout" />
                                </Button>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>   
    )
}

export default Header