import { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="flex flex-col gap-2 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl dark:bg-zinc-800 m-4">
      <h3 className="text-xl font-bold">{post.title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400">{post.body}</p>
      <div className="flex justify-between">
        <span>By {post.author}</span> <span>{post.createdAt}</span>
      </div>
    </div>
  );
}
