// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/index.css"

function Registration() {
    const [name, setName] = useState(""); // Cambia username a name
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting Registration:", { name, email, password });

        if (!name.trim() || !email.trim() || !password.trim()) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/register", {
                name, // Cambia username a name
                email,
                password,
            });
            alert("Registro exitoso!");
            navigate("/"); // Redirige a la página de inicio o login
        } catch (error) {
            console.error("Registration Error:", error);
            if (error.response && error.response.data) {
                alert(error.response.data.message || "Error en el registro");
            } else {
                alert("Ocurrió un error. Por favor, inténtelo de nuevo.");
            }
        }
    };

    return (
        <div className="login-page-container">
            <header className="login-header">
                <h2>Registro</h2>

            </header>
            <div className="login-container">
                <h2 className="login-title">Crea tu cuenta</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Nombre:"
                            value={name} // Cambia username a name
                            onChange={(e) => setName(e.target.value)} // Cambia username a name
                            required
                            />
                            
                        </div>
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
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                    </div>
                    <button className="login-btn" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}

export default Registration;