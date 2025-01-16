import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Item from "./Item"; // Asegúrate de que la ruta sea correcta
import "../styles/app.css";

function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setLoading(true);
        try {
          const res = await axios.get("http://localhost:5000/get-todo", {
            headers: { Authorization: token },
          });
          setTodo(res.data);
        } catch (err) {
          console.error("Error fetching todos:", err);
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTodos();
  }, [navigate]);

  const addUpdateTodo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado");
      navigate("/login");
      return;
    }

    if (isUpdating) {
      await axios
        .post(
          "http://localhost:5000/update-todo",
          { _id: isUpdating, text },
          { headers: { Authorization: token } }
        )
        .then((res) => {
          setTodo((prev) =>
            prev.map((item) => (item._id === isUpdating ? res.data : item))
          );
          setText("");
          setUpdating("");
        });
    } else {
      await axios
        .post(
          "http://localhost:5000/save-todo",
          { text },
          { headers: { Authorization: token } }
        )
        .then((res) => setTodo([...todo, res.data]));
    }
  };

  const deleteTodo = async (_id) => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/delete-todo",
      { _id },
      { headers: { Authorization: token } }
    );
    setTodo(todo.filter((item) => item._id !== _id));
  };

  const filteredTodos = todo.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="App">
      <header className="header">
        <h1>ToDoList</h1>
        <div className="header-menu">
          <a href="#home" className="menu-link is-active">Home</a>
          <a href="#tasks">Tasks</a>
          <a href="#profile">Profile</a>
          <div className="search-bar">
            <input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>
      <div className="">
        {loading ? (
          <p>Cargando tareas...</p>
        ) : (
          <>
            <div className="list">
              {filteredTodos.map((item) => (
                <Item
                  key={item._id}
                  text={item.text}
                  remove={() => deleteTodo(item._id)}
                  update={() => {
                    setText(item.text);
                    setUpdating(item._id);
                  }}
                />
              ))}
            </div>
            <div className="add-todo">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task"
              />
              <button onClick={addUpdateTodo}>
                {isUpdating ? "Update" : "Add" }
              </button>
            </div>
          </>
        )}
      </div>
      <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
    </section>
  );
}

export default Dashboard;