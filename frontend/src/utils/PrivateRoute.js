import { useContext } from 'react';
import { Navigate  } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ element, authenticated, ...rest }) => {
    let {user} = useContext(AuthContext)

    return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
