import { createContext, useState } from 'react';
import jwtDecode from 'jwt-decode'; // Corrected import statement
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(null);
    const [user, setUser] = useState(null);

    let navigate = useNavigate();

    const BaseUrl = "http://127.0.0.1:8000/api/";

    const loginUser = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const response = await fetch(BaseUrl + 'token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'username': username, 'password': password })
            });

            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data.tokens);
                setUser(jwtDecode(data.access)); // Update function call to jwtDecode
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/');
            } else {
                alert("Login Failed");
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const contextData = {
        loginUser: loginUser,
        authTokens: authTokens,
        user: user,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
