import { notFound } from "next/navigation";

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

export {fetchArticlesByCategory, fetchArticleById, createArticle}