import React, { useState, useEffect } from "react";
import Product from "../../components/Product";
import axios from "axios";

function CategoryProduct() {
  const [productsBookShelf, setProductsBookShelf] = useState([]);
  const displayProduct = productsBookShelf.slice(0, 10);
  const [prodcutCornarShelf, setProductCornerShelf] = useState([])
  const displayCornerShelf = prodcutCornarShelf.slice(0, 10)
  const [prodcutBadSideShelf, setProductBadSideShelf] = useState([])
  const displayBadSideShelf = prodcutBadSideShelf.slice(0, 10)

  useEffect(() => {
    const fatchData = async () => {
      const getProduct = await axios.get("/api/category/bookshelf");
      setProductsBookShelf(getProduct.data);
    };
    fatchData();
  }, []);

  useEffect(() => {
    const fatchData = async () => {
      const getProduct = await axios.get("/api/category/wall_cornar");
      setProductCornerShelf(getProduct.data);
    };
    fatchData();
  }, []);

  useEffect(() => {
    const fatchData = async () => {
      const getProduct = await axios.get("/api/category/bad_side_shelf");
      setProductBadSideShelf(getProduct.data);
    };
    fatchData();
  }, []);

  return (
    <div className=" mt-2 mb-2 ">
      <h2 className=" m-2 ">Book Shelf </h2>
      <div className="product-grid">
        {displayProduct.map((product) => (
          <Product product={product}></Product>
        ))}
      </div>

      <h2 className="ml-2">Wall Corner</h2>
      <div className="product-grid">
        {displayCornerShelf.map((product) => (
          <Product product={product}></Product>
        ))}
      </div>

      <h2 className="ml-2">Bad Side Shelf</h2>
      <div className="product-grid">
        {displayBadSideShelf.map((product) => (
          <Product product={product}></Product>
        ))}
      </div>
    </div>
  );
}

export default CategoryProduct;
