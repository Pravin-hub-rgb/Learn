import { Post } from "@/types/post";
import PostCard from "./components/PostCard";

export default function Home() {
  const posts: Post[] = [
    {
      id: 1,
      title: "Astro",
      body: "write once, run anywhere",
      author: "Pravin",
      createdAt: "2023-01-01",
    },
    {
      id: 2,
      title: "web3",
      body: "ethereum, blockchain, web3",
      author: "Pravin",
      createdAt: "2023-01-01",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-500">All Posts</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
