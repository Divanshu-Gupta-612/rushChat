import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        const storedUserData = localStorage.getItem('accessToken');
        return storedUserData ? JSON.parse(storedUserData) : null;
    })

    return (
        <AuthContext.Provider value={{
            token,
            setToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
