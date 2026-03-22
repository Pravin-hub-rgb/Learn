import { prisma } from "@/lib/prisma";
import TodoForm from "./components/TodoForm";
import { updateTodo } from "@/action";
import TodoItem from "./components/TodoItem";

export default async function Home() {
  const todos = await prisma.todo.findMany();
  return (
    <div>
      <h1 className="text-4xl  text-center mt-10 text-red-500">Todo App</h1>
      <TodoForm />
      <ul className="mt-6 space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
