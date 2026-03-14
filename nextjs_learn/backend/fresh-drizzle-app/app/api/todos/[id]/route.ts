import { db } from "@/db";
import { drizzle_todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Next.js 16 mein params Promise hai, isliye await karna padega
    const paramsValue = await params;
    const id = parseInt(paramsValue.id);

    const body = await request.json();

    const updated = await db
      .update(drizzle_todos)
      .set({ done: body.done })
      .where(eq(drizzle_todos.id, id))
      .returning();

    if (!updated.length) {
      return NextResponse.json({ error: "Todo nahi mila!" }, { status: 404 });
    }
    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Update nahi hua!" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const paramsValue = await params;
    const id = parseInt(paramsValue.id);

    const deleted = await db
      .delete(drizzle_todos)
      .where(eq(drizzle_todos.id, id))
      .returning();

    if (!deleted.length) {
      return NextResponse.json({ error: "Todo nahi mila!" }, { status: 404 });
    }
    return NextResponse.json({ message: "Todo delete ho gaya!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Delete nahi hora hai !!" },
      { status: 500 },
    );
  }
}
