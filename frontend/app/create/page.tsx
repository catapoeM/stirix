"use client";

import { useState } from "react";
import { createArticle } from "@/lib/api";
import { useRouter } from "next/navigation";
import Message from "@/components/Message";

const CreateArticlePage = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        content: "",
        image: "",
        summary: "",
        category: "romania",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [message, setMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "">("");

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setMessage("");

        try {
            setLoading(true);

            const token = localStorage.getItem("token"); // MVP simple auth

            if (!token) {
                setError("You must be logged in");
                setMessage("You must be logged in");
                return;
            }

            const res = await createArticle(form, token);

            if (!res.success) {
                setType("error");
                setMessage(res.message);
                return
            }

            setType("success");
            setMessage(res.message);

            setForm({
                title: "",
                content: "",
                summary: "",
                image: "",
                category: "romania",
            })

            //router.push("/"); // redirect after success
        } catch (err) {
            setType("error");
            setMessage("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ padding: "10px" }}>
        <h2>Create Article</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            
            <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
            />

            <textarea
                name="content"
                placeholder="Content"
                value={form.content}
                onChange={handleChange}
            />

            <textarea
                name="summary"
                placeholder="Rezumat"
                value={form.summary}
                onChange={handleChange}
            />

            <input
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
            />

            <select name="category" value={form.category} onChange={handleChange}>
            <option value="romania">Romania</option>
            <option value="superliga">Superliga</option>
            <option value="international">International</option>
            </select>

            <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Article"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            
            {message && <Message type={type} text={message}/>}
        </form>
        </main>
    );
}

export default CreateArticlePage