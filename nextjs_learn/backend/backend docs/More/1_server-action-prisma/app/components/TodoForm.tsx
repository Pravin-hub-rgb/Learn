"use client";
import { addTodo } from "@/action";
import { useActionState } from "react";

export default function TodoForm() {
  const [state, formAction, isPending] = useActionState(addTodo, null);

  return (
    <div>
      <form
        action={formAction}
        className="border-t-4 border-b-4 border-gray-500 m-5 rounded-4xl p-10 text-center"
      >
        <div>
          <input
            type="text"
            placeholder="Kya Karna hai?"
            className="outline-2 rounded px-4 py-1"
            name="title"
            // required
          />
          <button
            className="border-b-3 border-t-3 border-white m-4 px-4 py-1 rounded-2xl cursor-pointer font-bold bg-blue-500 text-black hover:bg-blue-600 disabled:opacity-50"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Todo"}
          </button>
        </div>
      </form>
      {state?.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}
    </div>
  );
}
