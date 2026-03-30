import { headers } from "next/headers";
export default async function Random() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  console.log("Pathname: ", pathname);

  return <div>Random Page</div>;
}
