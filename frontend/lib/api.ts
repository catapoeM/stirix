import { notFound } from "next/navigation";
import { getAccessToken, setAccessToken } from "./auth"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
// Get all or by category
const fetchArticlesByCategory = async (category: string) => {
    const res = await fetch(`${BASE_URL}/articles?category=${category}`,
        {
            cache: "no-store", // important for fresh data
        }
    );

    if (!res.ok) {
        return notFound(); // show 404 page
    }

    return res.json();
}
    // Get single article
const fetchArticleById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/articles/${id}`,
        {
            cache: "no-store"
        }
    )
    if (!res.ok) {
        return notFound();
    }

    return res.json();
}

const createArticle = async (data: any, token: string) => {
    try {
        const res = await fetch(`${BASE_URL}/articles/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    
        const result = await res.json();
    
        if (!res.ok) {
            return {
                success: false,
                message: result.message || "Failed to create article",
            };
        }
        return {
            success: true,
            message: "Article submitted successfully!",
            data: result,
        }
    } catch (error) {
    return {
      success: false,
      message: "Network error. Please try again. ERROR ->" + error,
    };
  }
}

const loginUser = async (data: any) => {
    try {
        
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // So browser accepts cookies
            body: JSON.stringify(data),
        })

        if (!res) {
            return console.log("Login failed");
        } 

        return res.json();
    } catch (err) { 
        return new Error ("Login error + message " + err)
    }
}

const logout = async () => {
    await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
    })

    setAccessToken(null)
}

const registerUser = async (data: any) => {
    try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const result = await res.json();

        if (!res.ok) {
            return { success: false, message: result.message || "Register failed" };
        }

        return { 
            success: true, 
            data: result 
        }
    } catch {
        return {
            success: false, message: "Network error"
        }
    }
}

export {fetchArticlesByCategory, fetchArticleById, createArticle, loginUser, registerUser, logout}