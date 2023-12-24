import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../../models/productModel.js';
import { isAdmin, isAuth,isSeller} from '../../../utils.js';

const sellerProductRouter = express.Router()

sellerProductRouter.get(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler( async(req,res) => {
        const singleProduct = await Product.findById(req.params.id);
        if(singleProduct){
            res.send(singleProduct)
        } else {
            res.status(404).send({message:"product Not Found"})
        }
    })
)
// seller Product Count
sellerProductRouter.get(
    '/product/:id',
    isAuth,
    isSeller,
    expressAsyncHandler( async(req,res) => {
        const userId = req.params.id; 
        const orderCount = await Product.countDocuments({ 'createdBy': userId });
        if(orderCount){
            res.json(orderCount);
        } else {
            res.status(404).send({message: "Product Not Found"});
        }
    })
)
export default sellerProductRouter;