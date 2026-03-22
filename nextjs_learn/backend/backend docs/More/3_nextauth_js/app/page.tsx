import { signIn, signOut, auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1>Home Page</h1>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}!</p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="border border-2 rounded-2xl px-2 cursor-pointer text-red-500"
            >
              Sign Out
            </button>
          </form>
        </>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <button
            type="submit"
            className="border border-2 rounded-2xl px-2 cursor-pointer text-green-500"
          >
            Sign In with GitHub
          </button>
        </form>
      )}
    </main>
  );
}
