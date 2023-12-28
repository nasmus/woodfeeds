import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../components/Product";

function CategoryPage() {
  const [categoryValue, setCategoryValue] = useState([]);
  const param = useParams();
  

  useEffect(() => {
    const fatchData = async () => {
      const category = await axios.get(`/api/category/${param.id}/${param.slug}`);
      if (category) {
        setCategoryValue(category.data);
      }
    };
    fatchData();
  }, [param.id,param.slug]);
  return (
    <div>
      <div className="product-grid2">
        {categoryValue.length > 0 ? (
        categoryValue.map((product) => {
          return <Product product={product}></Product>;
        })
        ) : (
            <div className="min-h-[50vh]">
              <h3 className="text-center">No Product found!</h3>
            </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
