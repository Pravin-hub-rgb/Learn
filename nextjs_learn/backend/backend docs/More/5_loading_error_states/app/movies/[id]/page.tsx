import { notFound } from "next/navigation";
import { getMovieById } from "../lib";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieById(id);
  if (!movie.title) {
    notFound();
  }
  return (
    <div>
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.body}</p>
      </div>
    </div>
  );
}
