type User = {
  id: number;
  username: string;
};

type Category = {
  id: number;
  name: string;
};

interface Post<T> {
  id: number;
  title: string;
  description: string;
  extra: T;
}

let post: Post<User> = {
  id: 1,
  title: "Title",
  description: "Description",
  extra: {
    id: 1,
    username: "Pravin",
  },
};
