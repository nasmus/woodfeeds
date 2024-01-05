import React, { useState, useEffect } from "react";
import Product from "../../components/Product";
import axios from "axios";

function CategoryProduct() {
  const [productsBookShelf, setProductsBookShelf] = useState([]);
  const displayProduct = productsBookShelf.slice(0, 10);
  const [prodcutCornarShelf, setProductCornerShelf] = useState([]);
  const displayCornerShelf = prodcutCornarShelf.slice(0, 10);
  const [prodcutBadSideShelf, setProductBadSideShelf] = useState([]);
  const displayBadSideShelf = prodcutBadSideShelf.slice(0, 10);

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
      <div className="flex my-3 justify-between items-center px-3 py-2 bg-slate-100 mx-1 rounded-md">
        <h3 className="">Book Shelf</h3>
        <button
          type="button"
          class="px-3 py-2 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:outline-none "
        >
         View More
        </button>
      </div>
      <div className="product-grid">
        {displayProduct.map((product) => (
          <Product product={product}></Product>
        ))}
      </div>

      <div className="flex gap-3 p-4 ">
        <div>
          <img
            className="object-cover w-full h-auto rounded-tl-xl rounded-bl-xl"
            src="https://media.e-valy.com/cms/banners/a71ef5d2-45ed-46c5-b2ab-a9071e8efe26"
            alt="Small1"
          />
        </div>
        <div>
          <img
            className="object-cover w-full h-auto rounded-br-xl rounded-tr-xl"
            src="https://media.e-valy.com/cms/banners/a71ef5d2-45ed-46c5-b2ab-a9071e8efe26"
            alt="Small"
          />
        </div>
      </div>

      <div className="flex my-3 justify-between items-center px-3 py-2 bg-slate-100 mx-1 rounded-md">
        <h3 className="">Wall Corner</h3>
        <button
          type="button"
          class="px-3 py-2 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:outline-none "
        >
         View More
        </button>
      </div>
      <div className="product-grid">
        {displayCornerShelf.map((product) => (
          <Product product={product}></Product>
        ))}
      </div>

      <div className="flex my-3 justify-between items-center px-3 py-2 bg-slate-100 mx-1 rounded-md">
        <h3 className="">Bad Shide shelf</h3>
        <button
          type="button"
          class="px-3 py-2 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:outline-none "
        >
         View More
        </button>
      </div>
      <div className="product-grid">
        {displayBadSideShelf.map((product) => (
          <Product product={product}></Product>
        ))}
      </div>
    </div>
  );
}

export default CategoryProduct;
