import Link from "next/link";

export default function MovieNotFound() {
  return (
    <div>
      <h2>Movie Nahi Mili 🎬</h2>
      <p>Yeh movie exist nahi karti.</p>
      <Link href="/movies">Back to Movies List</Link>
    </div>
  )
}