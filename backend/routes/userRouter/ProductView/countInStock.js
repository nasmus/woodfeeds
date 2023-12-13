import express from "express";
import Product from "../../../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../../../utils.js";

const countInStock = express.Router();

countInStock.post(
  "/order",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //const { productId, quantityOrdered } = req.body;
    const orderProductList = req.body;
    orderProductList.cartItemsData.map(async (orderItem) => {
      const product = await Product.findById(orderItem.productId);
      if (product) {
        product.countInStock -= orderItem.quantityOrdered;
        await product.save();
      }
    });
    res.send("send data");
  })
);

export default countInStock;
