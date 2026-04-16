"use client";

import { useReducer } from "react";

export default function Page() {
  const [state, dispatch] = useReducer(apiReducer, {
    data: null,
    loading: false,
    error: null,
  });
  
  return (
    <main>
      <h1>Meri Todo List</h1>
    </main>
  );
}
