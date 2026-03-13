import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Todo from "@/models/Todo";
export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find().sort({ createdAt: -1 });
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("Todos fetch error:", error);
    return NextResponse.json(
      { message: "Todos fetch nahi ho sake" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { message: "Title dena zaroori hai" },
        { status: 400 },
      );
    }

    const newTodo = await Todo.create({
      title: title.trim(),
      done: false,
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Todo create error:", error);
    return NextResponse.json(
      { message: "Todo create nahi ho saka" },
      { status: 500 },
    );
  }
}
