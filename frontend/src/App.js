import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';

import {AuthProvider} from './context/AuthContext'

function App() {
  const isAuthenticated = false; // Replace with your actual authentication logic

  return (
    <div className="App">
      <h1>Here is React Website</h1>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<PrivateRoute authenticated={isAuthenticated} element={<HomePage />} />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
