import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, authenticated, ...rest }) => {
    return authenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
