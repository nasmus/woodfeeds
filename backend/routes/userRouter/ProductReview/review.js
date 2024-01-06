import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../../../models/productModel.js";
import { isAuth } from "../../../utils.js";

const review = express.Router();

review.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res.status(400).send({ message: "you already submit a review" });
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);

      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;

      const updateProduct = await product.save()
      res.status(201).send({
        message: "review Created",
        review: updateProduct.reviews[updateProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: "product not found" });
    }
  })
);

review.get(
  '/find_user/:prod_id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.prod_id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res.status(200).send(false);
      } else {
        return res.status(200).send(true);
      }
    }
  }
  )
);

export default review;
