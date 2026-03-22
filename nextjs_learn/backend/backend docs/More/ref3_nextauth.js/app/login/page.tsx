import { signIn } from "@/auth"

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5rem" }}>
      <h1>Sign In</h1>

      {searchParams.error && (
        <p style={{ color: "red" }}>
          {searchParams.error === "Configuration"
            ? "Server error — check your credentials"
            : "Something went wrong — try again"}
        </p>
      )}

      <form
        action={async () => {
          "use server"
          await signIn("github", { redirectTo: "/dashboard" })
        }}
      >
        <button type="submit">Sign In with GitHub</button>
      </form>
    </main>
  )
}