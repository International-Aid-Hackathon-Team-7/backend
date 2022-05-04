import mongoose from "mongoose";
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String },
    email: { type: String, required: true, lowercase: true, unique: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" },],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" },],
    favorited_posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);
const Profile = mongoose.model("Profile", profileSchema);

export { Profile };
