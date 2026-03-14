import { drizzle_todos } from "@/db/schema";
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { error: "Title zaroori hai!" },
        { status: 400 },
      );
    }

    const newTodo = await db
      .insert(drizzle_todos)
      .values({ title: body.title })
      .returning();

    return NextResponse.json(newTodo[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Todo nahi bana!" }, { status: 500 });
  }
}
