import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Component/Sidebar";
import { Store } from "../Store";
import "../Css/SellerDashboard.css";
import axios from "axios";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import AreacChart from "../Component/AreacChart";
import Notification from "../Component/Notification";

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

      <div className="dashBoard">
        <div className="Order_information">
          <div className="Order_card_1">
            <div className="left">
              <h1 className=" text-3xl font-extrabold text-center">{countProduct}</h1>
              <p>Total Product</p>
            </div>
            <div className="right">
              <ProductionQuantityLimitsIcon />
            </div>
          </div>
          <div className="Order_card_1">
            <div className="left">
              <h1 className="text-3xl font-extrabold text-center ">{countOrder}</h1>
              <p>Product Orders</p>
            </div>
            <div className="right">
              <AddAlertIcon />
            </div>
          </div>
          <div className="Order_card_1">
            <div className="left">
              {totalSelles.map((item) => (
                <h1 className=" text-3xl font-extrabold text-center ">
                  {item.totalSelles}
                </h1>
              ))}

              <p>total selles</p>
            </div>
            <div className="right">
              <AccountBalanceIcon />
            </div>
          </div>
          <div className="Order_card_1">
            <div className="left">
               <h1 className="text-3xl font-extrabold text-center ">{pandingOrder}</h1>
              <p>Panding Order</p>
            </div>
            <div className="right">
              <BatchPredictionIcon />
            </div>
          </div>
        </div>
        <div className="product_and_order_section">
          <div className="product">
            <AreacChart />
            <h4>Monthly Selles</h4>
          </div>
          <div className=" border-2 w-4/5 mr-6 rounded-lg ">
            <Notification />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
