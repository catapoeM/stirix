"use client"

import { useState } from "react";
import { registerUser } from "@/lib/api";
import Message from "@/components/Message";
import Link from "next/link";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link as MuiLink
} from "@mui/material";

const RegisterPage = () => {

    const [form, setForm] = useState({
        username: "",
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

        const res = await registerUser(form);

        if (!res.success) {
            setType("error");
            setMessage(res.message);
            return
        }

        setType("success");
        setMessage("Account created successfully! You can now loginUser.");

        setForm({
            username: "",
            email: "",
            password: "",
        })
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
            <Typography variant="h5">Înregistrare</Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                    name="username"
                    label="Nume de utilizator"
                    fullWidth
                    required
                    onChange={handleChange}
                />

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
                    Înregistrează-te
                </Button>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                    Ai deja cont?{" "}
                    <MuiLink component={Link} href="/login">
                        Autentifică-te
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

export default RegisterPage;