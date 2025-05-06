import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddOrUpdate = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].text = input;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      const newTodo = {
        text: input,
        createdAt: new Date(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }

    setInput("");
  };

  const handleEdit = (index) => {
    setInput(todos[index].text);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
    setEditIndex(null);
    setInput("");
  };

  const handleToggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🚀 React Todo App</h1>

      <div style={styles.inputSection}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddOrUpdate} style={styles.addBtn}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <div style={styles.filterSection}>
        {["all", "active", "completed"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              ...styles.filterBtn,
              ...(filter === cat ? styles.activeFilter : {}),
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <ul style={styles.todoList}>
        {filteredTodos.map((todo, index) => (
          <li key={index} style={styles.todoItem}>
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(index)}
                title={todo.completed ? "Mark Unchecked" : "Mark Checked"}
              />
              <span
                style={{
                  ...styles.todoText,
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <div style={styles.timestamp}>
                📅 {new Date(todo.createdAt).toLocaleDateString()} ⏰{" "}
                {new Date(todo.createdAt).toLocaleTimeString()}
              </div>
            </div>
            <div>
              <button onClick={() => handleEdit(index)} style={styles.editBtn} title="Edit">
                ✏️
              </button>
              <button
                onClick={() => handleDelete(index)}
                style={styles.deleteBtn}
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fefefe",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    fontFamily: "Segoe UI, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#2b2d42",
    marginBottom: "30px",
    fontSize: "2rem",
  },
  inputSection: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "70%",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  addBtn: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  filterSection: {
    textAlign: "center",
    marginBottom: "20px",
  },
  filterBtn: {
    padding: "8px 16px",
    margin: "0 5px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    cursor: "pointer",
    backgroundColor: "#f5f5f5",
  },
  activeFilter: {
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    border: "1px solid #007bff",
  },
  todoList: {
    listStyle: "none",
    padding: 0,
  },
  todoItem: {
    backgroundColor: "#f9f9f9",
    marginBottom: "10px",
    padding: "15px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  todoText: {
    marginLeft: "10px",
    fontSize: "1rem",
  },
  timestamp: {
    fontSize: "0.8rem",
    color: "#666",
    marginTop: "4px",
    marginLeft: "25px",
  },
  editBtn: {
    marginRight: "10px",
    backgroundColor: "#ffc107",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
