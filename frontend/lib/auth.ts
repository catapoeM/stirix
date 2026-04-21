const BASE_URL = process.env.NEXT_PUBLIC_API_URL

let accessToken: string | null = null;

const setAccessToken = (token: string | null) => {
    accessToken = token;
}

const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const res = await fetch(`${BASE_URL}/refresh`, {
            method: "POST",
            credentials: "include"
        })

        if (!res.ok) {
            throw new Error("Refresh failed")
        }
        
        const data = await res.json();
        setAccessToken(data.accessToken)

        return data.accessToken;
    } catch (err) {
        console.error("Refresh error:", err)
        return null;
    }
}


const getAccessToken = () => accessToken;

export {refreshAccessToken, setAccessToken, getAccessToken}