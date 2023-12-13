import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Product from '../../../models/productModel.js'
import { isAuth,isAdmin } from '../../../utils.js'
import * as mongoose from 'mongoose';

const productListApi = express.Router()

productListApi.get(
    '/allproduct',
    isAuth,
    isAdmin,
    expressAsyncHandler( async(req,res) => {
        const productList = await Product.find();
        if(productList){
            res.status(200).send(productList)
        } else {
            res.status(404).send({message:"product is not found"})
        }
    })
)


export default productListApi;