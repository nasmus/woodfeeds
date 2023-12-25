import express  from "express";
import expressAsyncHandler from "express-async-handler";
import User from '../../../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateTokenAdmin } from "../../../utils.js";
const adminLogInRouter = express.Router(); 

adminLogInRouter.post(
    '/login',
    expressAsyncHandler( async(req,res) => {
        const user = await User.findOne({email:req.body.email})
        if(user && user.isAdmin === true && user.role === 'admin'){
            if(bcrypt.compareSync(req.body.password, user.password)){
                res.send({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    isAdmin:user.isAdmin,
                    role:user.role,
                    token: generateTokenAdmin(user.toObject()),
                })
            }
        } else{
            res.status(401).send({message:'invalid email or password'});
        }
        
    })
)

export default adminLogInRouter;