"use client";
import { getServerData } from "@/lib/server_data";
import { useEffect, useState } from "react";

type User = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export default function UseStateHook() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadUser() {
        setLoading(true);
      const data = await getServerData();
      setUser(data);
      setLoading(false);
    }
    loadUser();
  }, []);
  if(loading) return <div className="border m-3 p-4 rounded-2xl">Loading...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-500">
        Use State Hook
      </h1>
      {user && (
        <div className="border m-3 p-4 rounded-2xl">
          <p className="text-gray-600">User ID: {user.userId}</p>
          <p className="text-gray-600">ID: {user.id}</p>
          <p className="text-gray-600">Title: {user.title}</p>
          <p className="text-gray-600">Body: {user.body}</p>
        </div>
      )}
    </div>
  );
}
