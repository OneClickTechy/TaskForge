import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    categories: {
      type: [String],
      validate: (categories) => categories.length === new Set(categories).size,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

categorySchema.index({ userId: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
