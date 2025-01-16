import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Register';
import Dashboard from './components/Dashboard';



function App() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/dashboard");
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Limpia el token
        navigate("/"); // Redirige al login
    };

    const isAuthenticated = !!localStorage.getItem("token"); // Comprueba si hay un token válido

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
            <Route path="/register" element={!isAuthenticated ? <Registration /> : <Dashboard onLogout={handleLogout} />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
        </Routes>
    );
}

export default App;
