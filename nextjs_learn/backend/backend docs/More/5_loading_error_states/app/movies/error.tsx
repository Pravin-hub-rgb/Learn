"use client";

export default function MoviesError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log("reset function:", reset);
  return (
    <div>
      <h2>Kuch galat ho gaya!</h2>
      <p>Error: {error.message}</p>
      <button className="border p-1 rounded m-2 cursor-pointer hover:bg-red-500" onClick={()=> reset()}>
        Try Again
      </button>
    </div>
  );
}
