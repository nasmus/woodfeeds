import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image:{ type:String},
    multipleImage: { type: [String] },
    brand: { type: String, required: true },
    category: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    // productFeatures: {
    //   hight: { type: String, required: true },
    //   width: { type: String, required: true },
    //   thickness: { type: String, required: false },
    //   color: { type: String, required: true },
    //   productMaterials: { type: String, required:true}
    // },
    rating: { type: Number },
    numReviews: { type: Number },
    reviews: [
      {
        name:{ type:String, require: true }, // produt will not created
        rating: { type: Number, required: false },
        comment: { type: String, required: false },
        
      },
      {
        timestamps: true,
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
