import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    comment_content: {
      type: String,
      required: true,
    },
    commentator: { 
      type: Schema.Types.ObjectId, 
      ref: "Profile" 
    },
    likeLevel: Number,
    favorited_by: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  },
  { timestamps: true }
);

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    bookmark: { type: Schema.Types.ObjectId, ref: "Profile" },
    owner: { type: Schema.Types.ObjectId, ref: "Profile" },
    media: {
      type: String
    },
    content: { 
      type: String,
      required: true,
    },
    likeLevel: Number,
    favorited_by: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    comments: [commentSchema],
    isAnonymous: Boolean
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export { Post };