"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

const Header = () => {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = getToken();
        setLoggedIn(!!token)
    }, [])

    return (
        <header style={{display: "flex", justifyContent: "space-between", padding: "10px"}}>

            <h2 onClick={() => router.push("/")} style={{cursor: "pointer"}}>
                Stirix
            </h2>

            
            {!loggedIn ? (
                <>
                    <button onClick={() => router.push("/login")}>Login</button>
                    <button onClick={() => router.push("/register")}>Register</button>
                </>
                ) : (
                <>
                    <button onClick={() => router.push("/create")}>+ Create</button>
                    <button 
                        onClick={() => {
                            localStorage.removeItem("token")
                            router.refresh();
                        }}
                    >
                        Logout
                    </button>      
                </>
                )

            }
            
        </header>
    )
}

export default Header