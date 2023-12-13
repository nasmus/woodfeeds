import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../../../models/orderModel.js'
import { isAuth,isAdmin } from '../../../utils.js';
import * as mongoose from "mongoose";

const orderList = express.Router();

orderList.get(
    '/allorder',
    isAuth,
    isAdmin,
    expressAsyncHandler( async(req,res) =>{
        const AllOrder = await Order.find()
        if(AllOrder){
            res.status(201).send(AllOrder)
        } else{
            res.status(404).send({message:"order not found from database"})
        }
    })
)

export default orderList;