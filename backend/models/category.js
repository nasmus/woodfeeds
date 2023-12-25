import mongoose from "mongoose";
const caregorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: false,
      unique: true,
    },
    type: {
      type: String,
    },
    parentId: {
      type: String,
    },
    image: { 
        type: String
    },
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", caregorySchema);
export default Category;
