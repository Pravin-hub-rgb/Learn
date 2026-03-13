"use client";
import { useEffect, useState } from "react";

interface Todo {
  _id: string;
  title: string;
  done: boolean;
  createdAt: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function addTodo() {
    // Pehle check — khaali submit na ho
    if (inputValue.trim() === "") return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: inputValue.trim() }),
      });

      if (!response.ok) throw new Error("Add failed");

      const newTodo: Todo = await response.json();
      setTodos([newTodo, ...todos]);
      setInputValue("");
    } catch (err) {
      alert("Todo add nahi ho saka। Dobara try karo।");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }
  async function fetchTodos() {
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Server se data nahi aaya");
      }

      const data: Todo[] = await response.json();
      setTodos(data);
    } catch (err) {
      setError("Todos load nahi ho sake।");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function deleteTodo(id: string) {
    if (!confirm("Pakka delete karna hai?")) return;
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");
      setTodos(todos.filter((todo) => todo._id !== id)); // ← Naya
    } catch (err) {
      alert("Delete nahi ho saka।");
      console.error(err);
    }
  }

  async function toggleDone(id: string, currentDone: boolean) {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !currentDone }),
      });
      if (!response.ok) throw new Error("Update failed");
      const updatedTodo: Todo = await response.json();
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      alert("Alert Nahi hora hai!");
      console.error(error);
    }
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 gap-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => {
            setError(null); // Pehle error clear karo
            fetchTodos(); // Phir dobara fetch karo
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Dobara Try Karo
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        📝 Meri Todo List
      </h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Kya karna hai?"
          disabled={isSubmitting} // ← Submitting ke waqt input bhi band
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
             focus:outline-none focus:ring-2 focus:ring-blue-500
             disabled:bg-gray-100"
        />
        <button
          onClick={addTodo}
          disabled={isSubmitting || inputValue.trim() === ""}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg font-medium
             hover:bg-blue-600 transition-colors
             disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          Koi todo nahi। Naya banao!
        </p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => {
                  toggleDone(todo._id, todo.done);
                }}
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <span
                className={`flex-1 text-base  ${todo.done ? "line-through text-gray-400" : "text-gray-700"}`}
              >
                {todo.title}
              </span>

              {/* Naya — Delete Button */}
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-400 hover:text-red-600 transition-colors
                 text-sm px-2 py-1 rounded hover:bg-red-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
