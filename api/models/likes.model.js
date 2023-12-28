import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
  },
  { timestamps: true }
);

likeSchema.index({ user: 1, listing: 1 }, { unique: true });

const Like = mongoose.model("Like", likeSchema);

export default Like;
