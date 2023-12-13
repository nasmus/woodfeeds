import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import {isAuth} from '../../../utils.js'
import Order from '../../../models/orderModel.js'

const productDelevaryStatus = express.Router()

productDelevaryStatus.get(
    '/:userId/status/:productId',
    isAuth,
    expressAsyncHandler( async(req,res) => {
        
        const order = await Order.findOne({
            user:req.params.userId,
            "orderItems._id":req.params.productId
        })
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
          const product = order.orderItems.find(item => item.id === req.params.productId);
        if(product){
            res.status(200).send(product.orderStatus);
        } else{
            res.status(404).send({message:"Product not found"})
        }
    })
)

export default productDelevaryStatus;