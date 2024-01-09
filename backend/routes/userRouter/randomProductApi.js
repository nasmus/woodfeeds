import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';

const randomProductApi = express.Router()

randomProductApi.get(
    '/product_suggest',
    expressAsyncHandler( async(req,res) => {
        const randomApi = await Product.aggregate([{ $sample:{ size:4} }])
        if(randomApi){
            res.status(200).json(randomApi)
        } else {
            res.status(200).send({message:"product not found"})
        }
    })
)

export default randomProductApi;