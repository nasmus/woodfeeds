import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from '../../models/userModel.js'
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils.js'

const sellerRouter = express.Router();

sellerRouter.post(
    '/login',
    expressAsyncHandler(async (req,res) => {
        const user = await User.findOne({email:req.body.email})
        if(user && user.isAdmin===false && user.role === 'seller'){
            if(bcrypt.compareSync(req.body.password, user.password)){
                res.send({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    isAdmin: user.isAdmin,
                    role:user.role,
                    token: generateToken(user.toObject()),
                })
            }
        }
    })
)


export default sellerRouter;