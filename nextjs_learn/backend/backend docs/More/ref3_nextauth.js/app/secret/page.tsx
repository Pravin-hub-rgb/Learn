import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function SecretPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return <h1>Secret Page — Welcome {session.user?.name}</h1>
}