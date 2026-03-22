"use client";

import { deleteTodo, updateTodo } from "@/action";
import { useTransition } from "react";

export default function TodoItem({
  todo,
}: {
  todo: { id: number; title: string; done: boolean };
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <li className="flex gap-2 p-3 border rounded justify-between">
      <input
        type="checkbox"
        defaultChecked={todo.done}
        disabled={isPending}
        onChange={(e) => {
          startTransition(() => {
            updateTodo(todo.id, e.target.checked);
          });
        }}
      />
      <span>{todo.title}</span>
      <form action={deleteTodo}>
        <input type="hidden" name="id" value={todo.id} />
        <button className="text-red-500 cursor-pointer hover:text-[#FFF]">
          Delete
        </button>
      </form>
    </li>
  );
}
