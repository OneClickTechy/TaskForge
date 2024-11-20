import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duedate: {
      type: Date,
      
    },
    priority: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 4,
    },
    category: {
      type: String,
      default: "",
      minlength:3,
      maxlength: 30,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
