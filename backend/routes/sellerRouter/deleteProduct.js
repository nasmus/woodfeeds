import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';
import { isAuth, isSeller } from '../../utils.js';

const deleteProduct = express.Router();

deleteProduct.delete(
    '/:id',
    isAuth,
    isSeller,
    expressAsyncHandler(async(req,res) => {
        const data = await Product.findById(req.params.id);
        if(data){
            await data.remove();
            res.status(201).send({message:"Product deleted"})
        } else res.status(404).send({message:"product not found"})
    })
)

export default deleteProduct;