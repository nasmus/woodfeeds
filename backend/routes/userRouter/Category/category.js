import express from 'express';
import Category from '../../../models/category.js';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../../models/productModel.js';

const getCategoryRouter = express.Router();

function createAddCategories(categories, parentId=null) {
    const categoryList =[];
    let category;
    if(parentId == null){
        category= categories.filter(cat => cat.parentId == "")
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for( let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type:cate.type,
            children: createAddCategories(categories, cate._id)
        })
    }
    return categoryList;
}

getCategoryRouter.get(
    '/get_all_category',
    expressAsyncHandler( async(req,res) =>{
        const category = await Category.find({})
        if(category){
            const categoryList = createAddCategories(category)
            res.status(200).send({categoryList})
        } else(
            res.status(404).send({message:"product not found"})
        )
    })
    
)

getCategoryRouter.get(
    '/:id/:slug',
    expressAsyncHandler( async(req,res) => {
        const categoryid = await Product.find({"category":req.params.id})
        if(categoryid){
            res.status(200).send(categoryid)
        } else{
            res.status(400).send({message:"product not found"})
        }
    })
)


//home page category api bookshelf
getCategoryRouter.get(
    '/bookshelf',
    expressAsyncHandler( async(req,res) => {
        const categoryProduct = await Product.find({"category":'653176b645798d1826089e07'})
        if(categoryProduct){
            res.status(200).send(categoryProduct)
        } else{
            res.status(400).send({message:"product not found"})
        }
    })
)

//home page category api wallCorner
getCategoryRouter.get(
    '/wall_cornar',
    expressAsyncHandler( async(req,res) => {
        const categoryProduct = await Product.find({"category":'6531777c45798d1826089e29'})
        if(categoryProduct){
            res.status(200).send(categoryProduct)
        } else{
            res.status(400).send({message:"product not found"})
        }
    })
)

//home page category api Bad Side Shelf
getCategoryRouter.get(
    '/bad_side_shelf',
    expressAsyncHandler( async(req,res) => {
        const categoryProduct = await Product.find({"category":'653176ca45798d1826089e09'})
        if(categoryProduct){
            res.status(200).send(categoryProduct)
        } else{
            res.status(400).send({message:"product not found"})
        }
    })
)

export default getCategoryRouter;