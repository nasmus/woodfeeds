import React,{ useContext, useReducer, useEffect, useState } from 'react'

import { Store } from '../Store'
import { useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils";
import Sidebar from '../Component/Sidebar';

const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, orderDetail: action.payload };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

function OrderDetails() {

    const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const [orderStatus, setOrderStatus] = useState("");
  const [{ eorro, loading, orderDetail }, dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
    orderDetail: [],
  });

  useEffect(() => {
    const fatchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/order/orderdetails/${orderId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fatchData();
  }, [userInfo, orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `/api/order/status/${orderId}`,
        {
          orderStatus,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fatchDataApi = async () => {};
    fatchDataApi();
  }, [orderId, userInfo.token]);

  return (
    <div style={{ paddingLeft: "200px" }}>
      <Sidebar />

      <div className="flex items-center justify-between px-5 py-5">
        <h1 className="text-4xl text-center text-cyan-500 font-bold">
          Order Details
        </h1>
        <div className="flex md:flex-col md:w-1/5">
        <form onSubmit={handleSubmit}>
          <select
            name="rderStatus"
            id="status"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:px-6 p-2 "
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Received">Received</option>
          </select>
          <button className="bg-green-500 w-full hover:bg-green-600 p-2 ml-2 md:ml-0 md:px-6 md:my-1.5 text-white rounded-lg">
            Submit
          </button>
        </form>
        </div>
      </div>

      <div className="px-5 py-5 md:flex w-10/12 ">
        <section className="md:w-4/5 md:px-6 text-black">
          <div className="relative overflow-x-auto py-3 md:py-6">
            <table className="w-full text-sm text-left rtl:text-right text-black font-medium">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              {orderDetail.orderItems &&
                orderDetail.orderItems.map((item) => {
                   
                    return (
                      <tbody>
                        <tr className="bg-white border-b ">
                          <th
                            scope="row"
                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            <img
                              src={`/images/${item.image}`}
                              alt=""
                              className="w-8 h-8"
                            />
                            <span className="pl-2">{item.name}</span>
                          </th>
                          <td className="px-6 py-4">{item._id}</td>
                          <td className="px-6 py-4 ">
                            <span>{item.quantity}</span>
                          </td>
                          <td className="px-6 py-4">
                            {item.price * item.quantity}
                          </td>
                          <td className="px-6 py-4">
                          <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{item.orderStatus}</span>
                            
                          </td>
                        </tr>
                      </tbody>
                    );
                  
                })}
            </table>
          </div>
        </section>
        <section className="">
          <div className="bg-gradient-to-tr from-gray-700 to-gray-600 text-white rounded-lg w-11/12 p-5">
            <h1 className="text-4xl  font-bold">Address Info.</h1>
            <div className="pt-6">
              <div className="text-lg">
                <div className="flex py-3 justify-center">
                  <p className="pr-4">Name:</p>
                  <p>
                    {orderDetail.shippingAddress &&
                      orderDetail.shippingAddress.fullName}
                  </p>
                </div>
                <div className="flex justify-center">
                  <p className="px-4 ">UserId: </p>
                  <p className=" pr-4 ">{orderDetail.user}</p>
                </div>
              </div>
              <div className="flex text-cyan-500">
                <p>Address: </p>
                <p>
                  {orderDetail.shippingAddress &&
                    orderDetail.shippingAddress.address}
                </p>
              </div>

              <div className="text-cyan-500">
                <div className="flex">
                  <p>District: </p>
                  <p>
                    {orderDetail.shippingAddress &&
                      orderDetail.shippingAddress.distric}
                  </p>
                </div>
                <div className="flex">
                  <p className="">Thana: </p>
                  <p className="">
                    {orderDetail.shippingAddress &&
                      orderDetail.shippingAddress.city}
                  </p>
                </div>
                <div className="flex ">
                  <p>Phone : </p>
                  <p>
                    {orderDetail.shippingAddress &&
                      orderDetail.shippingAddress.phoneNumber}
                  </p>
                </div>

                <div className="flex py-3 text-emerald-500 justify-between">
                  <p className=" font-bold text-2xl">Total amount: </p>
                  <p className="font-bold text-2xl ">$545</p>
                </div>
              </div>
              <div className="flex justify-center py-1">
                <button className="text-xl border px-6 py-1 rounded-full  ">
                  Invoice
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default OrderDetails