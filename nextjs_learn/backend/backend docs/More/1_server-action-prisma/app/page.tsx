import { prisma } from "@/lib/prisma"

export default function HomePage()
{
  console.log('Prisma Connected:', prisma)
  return <div>Todo App</div>
}