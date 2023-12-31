import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../components/Product";

function CategoryPage() {
  const [categoryValue, setCategoryValue] = useState([]);
  const param = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    const fatchData = async () => {
      const category = await axios.get(
        `/api/category/${param.id}/${param.slug}`
      );
      if (category) {
        setCategoryValue(category.data);
      }
    };
    fatchData();
  }, [param.id, param.slug]);

  // Calculate the indexes for the products to be displayed on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryValue.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="product-grid2">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => {
            return <Product product={product}></Product>;
          })
        ) : (
          <div className="min-h-[50vh]">
            <h3 className="text-center">No Product found!</h3>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center pt-4">
        {Array.from({
          length: Math.ceil(categoryValue.length / productsPerPage),
        }).map((_, index) => (
          <button className="px-3 mr-1 py-2 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700  focus:outline-none focus:ring-blue-300 " key={index} onClick={() => paginate(index + 1)}>
             <b>{index + 1}</b>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
