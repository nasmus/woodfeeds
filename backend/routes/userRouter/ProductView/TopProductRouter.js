import express from "express";
import Product from "../../../models/productModel.js";
import expressAsyncHandler from "express-async-handler";

const TopProductRouter = express.Router();

TopProductRouter.get(
  "/top_rating_product",
  expressAsyncHandler(async (req, res) => {
    const topRatingProduct = await Product.find({
      $and: [{ numReviews: { $gt: 5 } }, { rating: { $gt: 3 } }],
    });
    if(topRatingProduct.length>0){
        res.status(200).send(topRatingProduct)
    }else{
        res.status(404).send(topRatingProduct)
    }
  })
);

export default TopProductRouter;
