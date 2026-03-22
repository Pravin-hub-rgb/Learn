"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);
  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white">
      <span className="font-bold text-lg">MyApp</span>
      <div>
        {status === "loading" && (
          <span className="text-gray-400">Loading...</span>
        )}
        {status === "unauthenticated" && (
          <button
            onClick={() => signIn("github")}
            className="bg-white text-gray-900 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer"
          >
            Sign In
          </button>
        )}
        {status === "authenticated" && (
          <div className="relative">
            <button
              onClick={() => setdropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80"
            >
              {session?.user?.name}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-gray-700 rounded-lg shadow-lg min-w-25">
                <button 
                onClick={() => signOut()}
                className="w-full text-center px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md cursor-pointer"
                >Sign Out</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
