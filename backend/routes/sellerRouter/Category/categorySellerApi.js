import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from '../../../models/category.js'
import { isAdmin, isAuth } from "../../../utils.js";

const categorySellerApi = express.Router()

categorySellerApi.get(
    '/getcategory',
    isAuth,
    isAdmin,
    expressAsyncHandler( async(req,res) => {
        const categories = await Category.find({})
        if(categories){
            res.status(200).send(categories)
        } else {
            res.status(404).send({message:"category not found"})
        }
    })
)

categorySellerApi.get(
    '/chield_category/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler( async(req,res) => {
        const categories = await Category.find({parentId:req.params.id})
        if(categories){
            res.status(200).send(categories)
        } else(
            res.status(404).send({message:"product not found"})
        )
    })
)



export default categorySellerApi;