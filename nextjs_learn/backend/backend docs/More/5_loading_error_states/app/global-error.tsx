'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Kuch bahut bura ho gaya 💥</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Try Again</button>
      </body>
    </html>
  )
}