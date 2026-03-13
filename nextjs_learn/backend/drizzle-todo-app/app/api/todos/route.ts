import { drizzle_todos } from "@/db/schema";
import { db } from "@/db";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allTodos = await db
      .select()
      .from(drizzle_todos)
      .orderBy(desc(drizzle_todos.id));

    return NextResponse.json(allTodos);
  } catch (error) {
    return NextResponse.json({ error: "Todos nahi aaye!" }, { status: 500 });
  }
}