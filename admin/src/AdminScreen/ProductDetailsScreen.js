import React, { useContext, useEffect, useReducer, useState } from "react";
import { Store } from "../Store";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getError } from "../utils";
import { Avatar } from "@mui/material";
import Sidebar from "../Component/Sidebar";


const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, product: action.payload };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  

function ProductDetailsScreen() {
    const navigate = useNavigate();
  const { state } = useContext(Store);
  const params = useParams();
  const { id: productId } = params;
  const { userInfo } = state;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
    product: [],
  });
  const [imageValue, setImageValue] = useState([]);

  useEffect(() => {
    const fatchdata = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/productdetails/${productId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fatchdata();
  }, [userInfo, productId]);

  useEffect(() => {
    setImageValue(product.multipleImage);
  }, [product.multipleImage]);
  return (
    <div>
      <Sidebar />
      <div className=" ml-52 pt-2 ">
        <div className="flex justify-between px-14 pb-5">
          <h1 className=" text-xl font-bold ">Product Details</h1>
          <div className="flex justify-center">
            <button
              onClick={() => {
                navigate(`/editproduct/${product._id}`);
              }}
              type="button"
              class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Edit Product
            </button>
          </div>
        </div>
        <div className="flex justify-center pb-16">
          <div className="grid grid-cols-2 gap-4 w-1/3 ">
            {imageValue &&
              imageValue.map((image, index) => {
                return (
                  <img
                    className=" w-11/12 border-2"
                    src={`/images/${image}`}
                    alt=""
                  />
                );
              })}
          </div>
          <div className=" w-3/5 pl-6">
            <h1 className=" text-3xl font-bold pb-4">{product.name}</h1>

            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-1 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Price:
                    </th>
                    <td class="px-6 py-4">{product.price}</td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-1 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Category ID:
                    </th>
                    <td class="px-6 py-4">{product.category}</td>
                  </tr>
                  <tr class="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      class="px-6 py-1 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Available Producct
                    </th>
                    <td class="px-6 py-4">{product.countInStock}</td>
                  </tr>
                  <tr class="bg-white">
                    <th
                      scope="row"
                      class="px-6 py-1 font-medium text-gray-900 whitespace-nowrap "
                    >
                      product upload date
                    </th>
                    <td class="px-6 py-4">{product.createdAt}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly ">
          <div>
            <h2 className="text-xl font-bold pt-5">Product Review List</h2>
            
            {product.reviews && product.reviews.map((item, index) => {
              return (
                <div>
                  <div className="flex items-center">
                    <Avatar sx={{ width: 24, height: 24 }} />
                    <p className="pl-3">{item.name}</p>
                  </div>
                  <div></div>
                  <div className="pl-8">
                    <p>{item.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-xl font-bold">
            <h2>Review</h2>
            <h3 className="text-cyan-600 text-center">
              {product.numReviews}/5
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsScreen