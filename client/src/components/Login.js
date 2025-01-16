import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/index.css"

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const { data } = await axios.post("http://localhost:5000/login", { email, password });
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            onLogin(); // Call the onLogin function to update the state in App.js
            navigate("/dashboard"); // Redirect to dashboard after successful login
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message || "Invalid email or password");
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="login">

            <div className="login-page-container">
                <header className="login-header">
                    <h1>HOLA</h1>
                    <p>Por favor Inicie Sesión</p>

                </header>
                <div className="login-container">
                    <h2 className="login-title">Iniciar Sesión</h2>


                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                        </div>
                        <div className="form-group">

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-btn">Login</button>
                    </form>
                    <div className="form-links">
                        <a href="/register">Regístrate</a>

                        {/*  <button onClick={() => navigate("/register")}>No tengo cuenta, registrarme</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;