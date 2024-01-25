import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(() => {
        const storedData = localStorage.getItem('userData');
        return storedData ? JSON.parse(storedData) : null;
    });

    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('accessToken');
        return storedToken ? localStorage.getItem('accessToken') : null;
    });

    function userLogin({ userdata }) {
        setUserData({ username: userdata.userName, email: userdata.email });
        localStorage.setItem('userData', JSON.stringify(userdata.userName, userdata.email));
        localStorage.setItem('accessToken', userdata?.accessToken);
        setToken(userdata?.accessToken);
    }

    function userLogout() {
        localStorage.removeItem('userData');
        localStorage.removeItem('accessToken');
        setToken(null);
        setUserData(null);
    }

    return (
        <AuthContext.Provider value={{
            token,
            userData,
            userLogin,
            userLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
