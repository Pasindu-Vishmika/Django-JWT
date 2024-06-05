import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    const BaseUrl = "http://127.0.0.1:8000/";

    const loginUser = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const response = await fetch(BaseUrl + 'api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'username': username, 'password': password })
            });

            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/');
            } else {
                alert("Login Failed");
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
    
    let updateToken = async () => {

        const response = await fetch(BaseUrl + 'api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'refresh': authTokens.refresh})
        })
        const data = await response.json();
        
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        }else{
            logoutUser();
        }

    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    };

    const contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, 1000*60*4);
        return ()=>
        {
            clearInterval(interval);
        }
    }, [authTokens ,loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
