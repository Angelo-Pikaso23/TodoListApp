import React from "react";
import { useTasks } from "./Dashboard";

export default function TodoList() {
  const { state, dispatch } = useTasks();

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "active") return !task.completed;
    if (state.filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="todo-list">
      {filteredTasks.map((task) => (
        <div key={task.id} className={`todo-item ${task.completed ? "completed" : ""}`}>
          <span>{task.title}</span>
          <button
            onClick={() =>
              dispatch({ type: "TOGGLE_TASK", payload: task.id })
            }
          >
            {task.completed ? "Deshacer" : "Completar"}
          </button>
        </div>
      ))}
    </div>
  );
}