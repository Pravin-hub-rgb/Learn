import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const drizzle_todos = pgTable("drizzle_todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  done: boolean("done").default(false).notNull(),
});

export type Todo = InferSelectModel<typeof drizzle_todos>;