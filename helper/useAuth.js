import { useState, useEffect } from "react";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let isLog = localStorage.getItem('islogged');
        setIsLoggedIn(isLog);
    }, [])
    return isLoggedIn;
}

export default useAuth;