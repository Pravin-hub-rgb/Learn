import connectDB from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return NextResponse.json({ message: "Todo nahi mila" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Todo delete ho gaya" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Delete nahi ho saka" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;

    // Body nikalenge — kya update karna hai
    const body = await request.json();
    const updatedTodo = await Todo.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTodo) {
      return NextResponse.json({ message: "Todo nahi mila" }, { status: 404 });
    }
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "Update nahi ho saka" },
      { status: 500 },
    );
  }
}
