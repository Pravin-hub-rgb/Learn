import { getMovies } from "./lib";
export default async function MoviesList() {
  const movies = await getMovies();
  
  return (
    <div>
      {movies.map((movie: any) => (
        <div className="border rounded-2xl my-2 mx-1 p-1" key={movie.id}>
          <p>{movie.title}</p>
          <p>{movie.body}</p>
        </div>
      ))}
    </div>
  );
}
