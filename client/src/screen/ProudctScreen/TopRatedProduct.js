import React, { useEffect, useState } from 'react'
import Product from '../../components/Product';
import axios from 'axios';

function TopRatedProduct() {
    const[products, setProducts] =useState([])
    const displayProduct = products.slice(0,10)

    useEffect(() =>{
        const fatchData =async()=>{
            const getProduct = await axios.get('api/top_product/top_rating_product')
            
            setProducts(getProduct.data)
        }
        fatchData()
    },[])


  return (
    <div className=' mt-2 mb-2 '>
        <h2 className=' m-2 ' >Top Rated Product</h2>
        <div className="product-grid">
            {displayProduct.map((product) => (
              <Product product={product}></Product>
            ))}
          </div>
    </div>
  )
}

export default TopRatedProduct