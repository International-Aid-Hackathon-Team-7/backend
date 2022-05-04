import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    category: { type: String, required: true, unique: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" },],
    avatar: {
      type: String,
    },
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" },],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export { Category };
