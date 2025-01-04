import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export const Post = mongoose.model("Post", PostSchema);
