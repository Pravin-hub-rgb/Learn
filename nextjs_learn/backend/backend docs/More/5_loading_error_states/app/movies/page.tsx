import { Suspense } from "react";
import { getMovies } from "./lib";
import MoviesList from "./MoviesList";
export default async function MoviesPage() {
  return (
    <div>
      <div>
        <h1>Movies</h1>
        <p>Yaha Movies hai</p>
      </div>
      <Suspense fallback={<p>Movies load ho rahi hain...</p>}>
        <MoviesList />
      </Suspense>
    </div>
  );
}
