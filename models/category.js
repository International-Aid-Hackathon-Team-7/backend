import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    avatar: {
      type: String
    },
    admin: [{ type: Schema.Types.ObjectId, ref: "Profile" }]
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export { Category };

