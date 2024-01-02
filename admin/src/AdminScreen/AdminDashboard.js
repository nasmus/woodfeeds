import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AreacChart from "../Component/AreacChart";
import Notification from "../Component/Notification";
import Sidebar from "../Component/Sidebar";
import "../Css/SellerDashboard.css";
import { Store } from "../Store";

function AdminDashboard() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [countOrder, setCountOrder] = useState([]);
  const [countProduct, setCountProduct] = useState([]);
  const [totalSelles, setTotalSelles] = useState([]);
  const [pandingOrder, setPandingOrder] = useState()

  useEffect(() => {
    const fatchData = async () => {
      const orderCount = axios.get(`/api/admin/order/ordercount`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setCountOrder((await orderCount).data);
    };
    fatchData();
  }, [userInfo.token]);

  useEffect(() => {
    const fatchData = async () => {
      const adminAllProductCount = await axios.get(
        `/api/admin/product/product_count`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      if (adminAllProductCount) {
        setCountProduct(adminAllProductCount.data);
      }
    };
    fatchData();
  });

  useEffect(() => {
    const fatchData = async () => {
      const adminTotalSelles = await axios.get(
        `/api/admin/selles/total_selles`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      if (adminTotalSelles) {
        setTotalSelles(adminTotalSelles.data);
      } else {
      }
    };
    fatchData();
  }, [userInfo.token]);

  useEffect(() => {
    const fatchData = async() => {
      const pandingstatus = await axios.get(`/api/order/orderStatus`,{headers: { Authorization: `Bearer ${userInfo.token}` }})
      setPandingOrder(pandingstatus.data.pendingOrdersCount)
    }
    fatchData()
  },[userInfo.token])

  return (
    <div>
      
        <Sidebar />

      <div className="m-2">
        <div className="Order_information justify-between">
          <div className="flex p-3 h-1/6 lg:w-1/5  text-violet-600 bg-white justify-evenly items-center rounded-lg shadow-lg me-3">
            <div className="left">
              <h1 className=" text-3xl font-extrabold text-center">
                {countProduct}
              </h1>
              <p>Total Product</p>
            </div>
            <div className="right hidden lg:block">
              <ProductionQuantityLimitsIcon />
            </div>
          </div>
          <div className="flex p-3 h-1/6 lg:w-1/5 text-violet-600 bg-white justify-evenly items-center rounded-lg shadow-lg me-3">
            <div className="left">
              <h1 className="text-3xl font-extrabold text-center ">
                {countOrder}
              </h1>
              <p>Product Orders</p>
            </div>
            <div className="right hidden lg:block">
              <AddAlertIcon className="" />
            </div>
          </div>
          <div className="flex p-3 h-1/6 lg:w-1/5 text-violet-600 bg-white justify-evenly items-center rounded-lg shadow-lg me-3">
            <div className="left">
              {totalSelles.map((item) => (
                <h1 className=" text-3xl font-extrabold text-center ">
                  {item.totalSelles}
                </h1>
              ))}

              <p>Total Sales</p>
            </div>
            <div className="right hidden lg:block">
              <AccountBalanceIcon />
            </div>
          </div>
          <div className="flex p-3 h-1/6 lg:w-1/5 text-violet-600 bg-white justify-evenly items-center rounded-lg shadow-lg">
            <div className="left">
              <h1 className="text-3xl font-extrabold text-center ">
                {pandingOrder}
              </h1>
              <p>Pending Order</p>
            </div>
            <div className="right hidden lg:block">
              <BatchPredictionIcon />
            </div>
          </div>
        </div>
        <div className="product_and_order_section flex flex-col lg:flex-row">
          <div className="product pb-4">
            <h2 className="text-lg font-semibold pb-2">Monthly Sales</h2>
            <AreacChart />
          </div>
          <div className=" border-2 w-full mr-6 rounded-lg">
            <Notification />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
