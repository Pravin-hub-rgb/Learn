export async function getMovies() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data.slice(0, 10);
}
