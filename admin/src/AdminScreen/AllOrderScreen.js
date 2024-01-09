import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import { Store } from "../Store";

function AllOrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [allOrder, setAllOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsOrderPerPage] = useState(10);

  useEffect(() => {
    const fatchData = async () => {
      const orderList = await axios.get(`/api/admin/orderlist/allorder`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      if (orderList) {
        setAllOrder(orderList.data);
      } else {
        console.log("order not found");
      }
    };
    fatchData();
  }, [userInfo.token]);

  // Calculate the indexes for the products to be displayed on the current page
  const indexOfLastProduct = currentPage * productsOrderPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsOrderPerPage;
  const currentProducts = allOrder.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <Sidebar />

      <div class=" ml-52 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Order ID
              </th>
              <th scope="col" class="px-6 py-3">
                Payment
              </th>
              <th scope="col" class="px-6 py-3">
                items Price
              </th>
              <th scope="col" class="px-6 py-3">
                User name
              </th>
              <th scope="col" class="px-6 py-3">
                Order Date
              </th>
              <th scope="col" class="px-6 py-3">
                Order Time
              </th>
              <th scope="col" class="px-6 py-3">
                Order Status
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((item, index) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item._id}
                </th>
                <td class="px-6 py-4">{item.paymentMethod}</td>
                <td class="px-6 py-4">{item.itemsPrice}</td>
                <td class="px-6 py-4">{item.shippingAddress.fullName}</td>
                <td class="px-6 py-4">{item.createdAt.slice(0, 10)}</td>
                <td class="px-6 py-4">{item.createdAt.slice(11, 19)}</td>
                <td class="px-6 py-4">
                  {/* <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Red
                  </span> */}
                  <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Delivered
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="px-3 py-2 text-xs font-medium text-center text-white bg-gradient-to-r rounded-lg from-cyan-400 via-cyan-500 to-cyan-600 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                    onClick={() => {
                      navigate(`/orderdetails/${item._id}`);
                    }}
                  >
                    Order Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center pt-4">
        {Array.from({
          length: Math.ceil(allOrder.length / productsOrderPerPage),
        }).map((_, index) => (
          <button className="px-3 mr-1 py-2 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700  focus:outline-none focus:ring-blue-300 " key={index} onClick={() => paginate(index + 1)}>
             <b>{index + 1}</b>
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}

export default AllOrderScreen;
