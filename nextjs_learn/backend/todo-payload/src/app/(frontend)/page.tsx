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
  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">📝 Todo List</h1>
      {loading ? (
        <p className="text-gray-400">⏳ Load ho raha hai...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-400">Koi todo nahi abhi!</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {
            todos.map((todo) => (
              <li key={todo.id} className="p-3 border border-gray-200 rounded">
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