const getToken = () => {
    if (typeof window === "undefined") {
        return null;
    }
    return localStorage.getItem("token");
}

const isLoggedIn = () => {
    return !!getToken();
}

export {getToken, isLoggedIn}