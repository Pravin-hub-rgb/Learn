"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./lib/prisma";

export async function addTodo(prevState: unknown, formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  if (!title || title.trim() === "") {
    return { error: "Title khali nahi ho skta" };
  }
  try {
    await prisma.todo.create({ data: { title } });
    revalidatePath("/");
    return null;
  } catch (error) {
    return { error: "Todo add nahi hua — dobara try karo." };
  }
}

export async function updateTodo(id: number, done: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { done },
  });
}

export async function deleteTodo(formData: FormData) {
  const id = Number(formData.get("id"));
  await prisma.todo.delete({
    where: { id },
  });
  revalidatePath("/");
}
