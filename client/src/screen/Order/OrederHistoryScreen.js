import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { getError } from "../../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  useEffect(() => {
    if(!userInfo){
      navigate('/')
    }
  },[userInfo,navigate])

  return (
    <div>
      <Container>
        <h1>Order History</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>৳{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  {/* <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : 'No'}
                  </td> */}
                  <td>{order.orderItems.isDelivered}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                      className="px-3 py-2.5 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </div>
  );
}