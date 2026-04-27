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
            <AppBar position="static" sx={{bgcolor: "#ffffff", color: "#002B7F"}}>
                 {/* TOP BAR */}
                <Toolbar 
                    sx={{ 
                        display: "grid",
                        gridTemplateColumns: "1fr auto 1fr",
                        alignItems: "center"
                    }}
                >
                    {/* LEFT (empty space for balance) */}
                    <Box sx={{ flex: 1 }} />

                    {/* LOGO CENTER */}
                    <Link href="/category/all" style={{display: "flex"}}>
                        <Box 
                            sx={{
                                position: "absolute",
                                left: "50%",
                                transform: "translateX(-50%)",
                                display: "flex",
                                alignItems: "center",
                                height: 7,
                            }}
                        >
                            <Image
                                src="/logo_stirix_s.png"
                                alt="Logo"
                                width={140}
                                height={100}
                                style={{ height: "85px", width: "auto", objectFit: "contain" }}
                            />
                        </Box>
                    </Link>

                    {/** RIGHT: Hamburger */}
                    <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                        <IconButton sx={{
                            color: (theme) => theme.palette.primary.main
                        }} onClick={toggleDrawer(true)}>
                            <MenuIcon fontSize="large"/>
                        </IconButton>
                    </Box>
                </Toolbar>

                {/* Category Buttons */}
                <Box 
                    sx={{
                        display: "flex",
                        overflowX: "auto",
                        justifyContent: "center",
                        padding: 1,
                        gap: 2,
                        px: 2,
                        pb: 2,
                        flexWrap: "nowrap"
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