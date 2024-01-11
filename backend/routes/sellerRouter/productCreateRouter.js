import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../../models/productModel.js";
import { isAdmin, isAuth, isSeller } from "../../utils.js";
import path from "path";
import multer from "multer";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);


const productCreateRouter = express.Router();

//display image upload
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


//const upload = multer({ storage: storage });
const multipleUpload = multer({ storage: storage })



//single product upload
productCreateRouter.post(
  "/create",
  //upload.single("image"),
  multipleUpload.array('multipleImage', 5),
  isAuth,
  expressAsyncHandler(async (req, res) => {

    const {
      name,
      brand,
      category,
      description,
      price,
      countInStock,
      rating,
      numReviews,
      hight,
      width,
      thickness,
      color,
      productMaterials,
    } = req.body;
    //const image = req.file.filename;
    const multipleImage = req.files.map((file) => file.filename);
    

    const product = new Product({
      name: name,
      slug: name,
      image:multipleImage[0],
      brand,
      category,
      description,
      price,
      countInStock,
      rating,
      numReviews,
      createdBy: req.user._id,
      multipleImage,
      hight,
      width,
      thickness,
      color,
      productMaterials,
    });
    product.save((error, product) => {
      if (error) {
        res.status(400).send({ message: error });
      }
      if (product) {
        res.status(200).send({ message: "product is create successfully" });
      }
    });
  })
);

productCreateRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const data = await Product.find({ createdBy: req.user._id });
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// product update by id

productCreateRouter.put(
  "/:id",
  multipleUpload.single('image'),
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (product) {
        
        product.name = req.body.name || product.name;
        product.slug = product.name;
        product.category = req.body.category || product.category;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.countInStock = req.body.countInStock || product.countInStock;
        const updateProduct = await product.save();
        res.status(201).send({
          message: "Product updated successfull",
          product: updateProduct,
        });
      } else {
        res.status(401).send({ message: "product not found" });
      }
    } catch (err) {
      res.status(401).send(err);
    }
    
  })
);

export default productCreateRouter;
