import { getSession } from "@/lib/session";
import { logoutUser } from "./actions/auth";

export default async function Home() {
  const user = await getSession();
  if (user) {
    console.log("✅ User is logged in:", user.email);
  } else {
    console.log("❌ No active session found");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4 text-cyan-600">
        Welcome to the Auth App
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Please register or login to continue.
      </p>
      <div className="space-x-4">
        <a
          href="/register"
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
        >
          Register
        </a>
        {user ? (
          <form action={logoutUser} className="inline">
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </form>
        ) : (
          <a
            href="/login"
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
          >
            Login
          </a>
        )}
        <a className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700" href="/dashboard">
          Dashboard
        </a>
      </div>
    </div>
  );
}
