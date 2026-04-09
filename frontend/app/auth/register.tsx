"use client"

import { useState } from "react";
import { registerUser } from "@/lib/api";
import Message from "@/components/Message";

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
        <main style={{ padding: "10px" }}>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button type="submit">Register now</button>
            </form>

            {message && <Message type={type} text={message} />}
        </main>
    )
}

export default RegisterPage;