import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Link to="/">Home</Link>
      <span> | </span>
      {user ? (
        <>
          <p>Logout</p>
          <p>Hello {user.username}</p>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Header;
