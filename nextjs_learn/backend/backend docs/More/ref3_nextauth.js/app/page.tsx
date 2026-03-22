import { signIn, signOut, auth } from "@/auth"

export default async function Home() {
  const session = await auth()

  return (
    <main>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <form action={async () => { "use server"; await signOut() }}>
            <button type="submit">Sign Out</button>
          </form>
        </>
      ) : (
        <form action={async () => { "use server"; await signIn("github") }}>
          <button type="submit">Sign In with GitHub</button>
        </form>
      )}
    </main>
  )
}