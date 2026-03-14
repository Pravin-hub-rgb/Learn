'use client'

import { useEffect, useState } from "react"

interface Todo {
  id: number,
  title: string,
  done: boolean
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [input, setInput] = useState<string>('');
  useEffect(() => {
    fetchTodos()
  }, [])
  async function fetchTodos() {
    try {
      const res = await fetch('/api/todos')
      const data = await res.json()
      setTodos(data.docs)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }
  async function addTodo() {
    if (!input.trim()) return
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input, done: false })
      })
      const data = await res.json()
      const newTodo: Todo = data.doc
      setTodos([newTodo, ...todos])
      setInput('')
    } catch (error) {
      console.error('Add error:', error)
    }
  }
  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">📝 Todo List</h1>
      <div className="flex gap-2 mb-6">
        <input type="text" value={input} onKeyDown={(e) => e.key === 'Enter' && addTodo()} onChange={(e) => setInput(e.target.value)} />
        <button onClick={addTodo} className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">Add</button>
      </div>
      {loading ? (
        <p className="text-gray-400">⏳ Load ho raha hai...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-400">Koi todo nahi abhi!</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {
            todos.map((todo) => (
              <li key={todo.id} className="p-3 border border-gray-200 rounded m-2">
                {todo.title}
              </li>
            ))
          }
        </ul>
      )
      }
    </div>
  )
}