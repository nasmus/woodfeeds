import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from '../../../models/category.js'
import { isAuth,isAdmin } from "../../../utils.js";
import path from "path";
import multer from "multer";


const categoryApi = express.Router()

const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });

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
            categoryImage:cate.categoryImage,
            children: createAddCategories(categories, cate._id)
        })
    }
    return categoryList;
}

categoryApi.get(
    '/getcategory',
    isAuth,
    isAdmin,
    expressAsyncHandler( async(req,res) => {
        const categories = await Category.find({})
        if(categories){
            const categoryList = createAddCategories(categories)
            res.status(200).json({ categoryList })
        } else {
            res.status(404).send({message:"category not found"})
        }
    })
)

categoryApi.post(
    '/addcategory',
    isAuth,
    isAdmin,
    expressAsyncHandler( async(req,res) => {
        
        const categoryObj = {
            name: req.body.name,
            slug: req.body.name,//`${slugify(req.body.name)}-${shortId.generate()}`
            parentId: req.body.parentId,
            
        }
        
        
        // if(req.body.parentId){
        //     categoryObj.parentId = req.body.parentId;
        // }
    
        const category = new Category(categoryObj);
        category.save((error,category) => {
            if(error){
                return res.status(400).json({error})
            }
            if(category){
                return res.status(201).json({category})
            }
        })
    })
)

categoryApi.post(
    '/update',
    isAuth,
    isAdmin,
    expressAsyncHandler (async (req,res) =>{
        const {_id,name, parentId, type} = req.body;
    const updateCategories = [];
    if(name instanceof Array){
        for(let i=0; i<name.length; i++){
            const category = {
                name: name[i],
                type: type[i]
            }
            if(parentId[i] !== ""){
                category.parentId = parentId[i];
            }
            const updateCategory = await Category.findOneAndUpdate({_id:_id[i]}, category, {new:true})
            updateCategories.push(updateCategory); 
        }
        return res.status(201).json({updateCategories: updateCategories});
    } else{
        const category = {
            name,
            type
        };
        if(parentId !== ""){
            category.parentId = parentId;

        }
        const updateCategory =await Category.findByIdAndUpdate({_id}, category, {new:true})
        return res.status(201).json({updateCategory});
    }
    })
)

//category image upload

categoryApi.post('/categories/:categoryId/upload', upload.single('image'), async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const category = await Category.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      category.image = req.file.filename;
      await category.save();
  
      res.json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

categoryApi.post(
    '/delete',
    isAuth,
    isAdmin,
    expressAsyncHandler( async(req,res) =>{
        const { ids } = req.body.payload;
    const deleteCategories = [];
    for(let i = 0; i<ids.length; i++){
        const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id})
        deleteCategories.push(deleteCategory);
    }
    if(deleteCategories.length == ids.length){
        return res.status(201).json({message:'Category Removed'})
    }
    else{
        return res.status(400).json({message:'Something went wrong'})
    }
    })
)

export default categoryApi;