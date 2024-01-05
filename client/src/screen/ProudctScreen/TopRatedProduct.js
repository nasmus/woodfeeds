import React, { useEffect, useState } from 'react'
import Product from '../../components/Product';
import axios from 'axios';

function TopRatedProduct() {
  const [products, setProducts] = useState([]);
  const displayProduct = products.slice(0, 10);

  useEffect(() => {
    const fatchData = async () => {
      const getProduct = await axios.get("/api/top_product/top_rating_product");

      setProducts(getProduct.data);
    };
    fatchData();
  }, []);

  return (
    <div className=" mt-2 mb-2 ">
      <div className="flex my-4 justify-between items-center px-3 py-2 bg-slate-100 mx-1 rounded-md">
        <h3 className="">Top Rated Product</h3>
        <button
          type="button"
          class="px-3 py-2 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
         View More
        </button>
      </div>
      <div className="product-grid mt-2">
        {displayProduct.map((product) => (
          <Product product={product}></Product>
        ))}
      </div>
    </div>
  );
}

export default TopRatedProduct;
