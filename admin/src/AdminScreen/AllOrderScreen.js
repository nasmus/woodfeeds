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
                itemsPrice
              </th>
              <th scope="col" class="px-6 py-3">
                user ID
              </th>
              <th scope="col" class="px-6 py-3">
                Order Date
              </th>
              <th scope="col" class="px-6 py-3">
                Order Time
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allOrder.map((item, index) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item._id}
                </th>
                <td class="px-6 py-4">{item.paymentMethod}</td>
                <td class="px-6 py-4">{item.itemsPrice}</td>
                <td class="px-6 py-4">{item.user}</td>
                <td class="px-6 py-4">{item.createdAt.slice(0,10)}</td>
                <td class="px-6 py-4">{item.createdAt.slice(11,19)}</td>
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
      </div>
    </div>
  );
}

export default AllOrderScreen;
