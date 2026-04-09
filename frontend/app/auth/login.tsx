"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import Message from "@/components/Message";

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
        <main style={{ padding: "10px" }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
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

                <button type="submit">Login now</button>
            </form>

            {message && <Message type={type} text={message} />}
        </main>
    )
}

export default LoginPage;