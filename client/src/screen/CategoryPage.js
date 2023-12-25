import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { useParams } from "react-router-dom";

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
        {categoryValue.map((product) => {
          return <Product product={product}></Product>;
        })}
      </div>
    </div>
  );
}

export default CategoryPage;
