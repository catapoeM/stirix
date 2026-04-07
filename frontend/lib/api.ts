const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// Get all or by category
const fetchArticlesByCategory = async (category: string) => {
    
        const res = await fetch(
            `${BASE_URL}/articles?category=${category}`,
            {
                cache: "no-store", // important for fresh data
            }
        );
    
        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }
    
        return res.json();
    

    // Get single article
}

export {fetchArticlesByCategory}