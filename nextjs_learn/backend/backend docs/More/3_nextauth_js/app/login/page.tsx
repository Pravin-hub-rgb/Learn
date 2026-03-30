import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

const errorMessages = {
  OAuthAccountNotLinked: "Yeh email pehle se kisi aur account se linked hai",
  OAuthSignin: "GitHub se connect karne mein dikkat aayi — dobara try karo",
  OAuthCallback: "Login process mein kuch gadbad hui — dobara try karo",
  Default: "Kuch galat hua — dobara try karo",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const session = await auth();
  const error = (await searchParams).error;
  console.log("url error", error);

  const errorMessage = error
    ? (errorMessages[error as keyof typeof errorMessages] ??
      errorMessages["Default"])
    : null;
  if (session) {
    // User logged in hai - redirect karo
    redirect("/dashboard");
  }
  return (
    <main>
      <h1>Sign In</h1>
      {error && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button type="submit">Sign In with GitHub</button>
      </form>
    </main>
  );
}
