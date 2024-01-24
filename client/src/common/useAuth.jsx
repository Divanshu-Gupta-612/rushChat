import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(()=>{
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : true;
    });

    const [token, setToken] = useState(() => {
        const storedUserData = localStorage.getItem('accessToken');
        return storedUserData ? JSON.parse(storedUserData) : null;
    })

    function userLogin({userdata}){
        setUserData(userData);
        localStorage.setItem('userData', {username: userdata.userName, email: userdata.email});
        localStorage.setItem('accessToken', userdata.accessToken);
        setToken(accessToken);
    }

    function userLogout(){
        localStorage.removeItem('userData');
        localStorage.removeItem('accessToken');
        setToken(null);
        setUserData(null);
    }

    return (
        <AuthContext.Provider value={{
            userData,
            userLogin,
            userLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
