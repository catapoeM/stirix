"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import Link from "next/link";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert, Link as MuiLink
} from "@mui/material";

const LoginPage = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const [message, setMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "">("")

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await loginUser(form);

        if (!res.success) {
            setType("error");
            setMessage(res.message);
            return
        }

        // save token
        localStorage.setItem("token", res.data.token)

        setType("success");
        setMessage("Login successfull!");

        // redirect
        setTimeout(() => {
            router.push("/");
            router.refresh(); // important
        }, 1000)
    }

    return (
        <Box
            component="main"
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 6,
                px: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
            >
            <Typography variant="h5">Autentificare</Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                required
                onChange={handleChange}
                />

                <TextField
                name="password"
                label="Parolă"
                type="password"
                fullWidth
                required
                onChange={handleChange}
                />

                <Button
                type="submit"
                variant="contained"
                fullWidth
                >
                    Autentifică-te
                </Button>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                    Nu ai cont?{" "}
                    <MuiLink component={Link} href="/register">
                        Înregistrează-te
                    </MuiLink>
                </Typography>
            </Box>

            {message && (
                <Alert severity={type || "info"}>
                    {message}
                </Alert>
            )}
        </Box>
    )
}

export default LoginPage;