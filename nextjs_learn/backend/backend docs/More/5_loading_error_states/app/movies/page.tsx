import { getMovies } from "./lib";
export default async function MoviesPage() {
  const movies = await getMovies();

  return (
    <div>
      {movies.map((movie: any) => (
        <div key={movie.id}>
          <p>{movie.title}</p>
          <p>{movie.body}</p>
        </div>
      ))}
    </div>
  );
}