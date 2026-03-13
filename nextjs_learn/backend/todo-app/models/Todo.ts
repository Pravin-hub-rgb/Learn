import mongoose, { Schema } from "mongoose";

interface ITodo extends Document {
  title: string;
  done: boolean;
}

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.models.Todo ?? mongoose.model("Todo", TodoSchema);

export default Todo;