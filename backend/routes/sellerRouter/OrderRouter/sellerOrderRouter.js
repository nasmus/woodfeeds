import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../../../models/orderModel.js";
import { isAdmin, isAuth, isSeller } from "../../../utils.js";
import * as mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const sellerOrderRouter = express.Router();

// all order Items for seller
sellerOrderRouter.get(
  "/allorder",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const userId = req.user._id;
    //const order = await Order.find({"orderItems.seller": userId},{"orderItems":{$elemMatch:{"orderItems.seller":userId}}});
    
    const order = await Order.find(
      { "orderItems.seller": userId },
      { "orderItems.$": 1 }
    );
    if (order) {
      res.status(200).send(order);
    } else {
      res.status(404).send({ message: "Data Not Found" });
    }
  })
);

//order address for order user
sellerOrderRouter.get(
  "/orderaddress",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const userId = req.user._id;
    const orderAddress = await Order.distinct("shippingAddress").where({
      "orderItems.seller": userId,
    });
    if (orderAddress) {
      res.status(200).send(orderAddress);
    } else {
      res.status(404).send({ message: "data not found" });
    }
  })
);

// product atatus update
sellerOrderRouter.put(
  "/changestatus",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const userId = req.user._id;
      const newStatusCode = req.body.isDelivered;
      const product = await Order.findOneAndUpdate("isDelivered").where({
        "orderItems.seller": userId,
      });
      if (product) {
        product.isDelivered = newStatusCode;
        await product.save();
        res.send(product);
      } else {
        res.status(401).send({ message: "not updated" });
      }
    } catch (err) {
      res.status(404).send(err);
    }
  })
);
// order details page for spacrfic order

sellerOrderRouter.get(
  "/orderdetails/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orderDetails = await Order.findById(req.params.id);
    if (orderDetails) {
      res.send(orderDetails);
    } else {
      res.send({ message: "product not found" });
    }
  })
);

//seller order summery
sellerOrderRouter.get(
  "/order/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const result = await Order.aggregate([
      {
        $match: {
          "orderItems.seller": ObjectId(userId),
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: "$orderItems.seller",
          totalOrderPrice: {
            $sum: { $multiply: ["$orderItems.quantity", "$orderItems.price"] },
          },
          quentity: { $sum: "$orderItems.quantity" },
        },
      },
    ]);
    // const result1 = result.find((item) => {
    //   return(item._id == userId)
    // })
    res.status(200).send(result);
    
  })
);

//seller order status update
sellerOrderRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const userId = req.user._id;
    const orderId = req.params.id;
    const newStatus = req.body.orderStatus;
    const singleOrder = await Order.updateOne(
      { _id: orderId, "orderItems.seller": userId },
      { $set: { "orderItems.$.orderStatus": newStatus } }
    );
    res.send(singleOrder);
  })
);

// order status for panding order

sellerOrderRouter.get(
  "/orderStatus",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.find(
      { "orderItems.$": 1 }
    );
    const pendingOrdersCount = order.reduce((count, order) => {
      const pendingItems = order.orderItems.filter(item => item.orderStatus === 'Panding');
      return count + pendingItems.length;
    }, 0);
    if (pendingOrdersCount) {
      res.status(200).send({pendingOrdersCount});
    } else {
      res.status(404).send({ message: "Data Not Found" });
    }
  })
);



export default sellerOrderRouter;
