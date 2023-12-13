import Axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { Store } from "../../Store";
import Container from "react-bootstrap/esm/Container";
import { getError } from "../../utils";
import LoadingBox from "../../components/LoadingBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};
function PlaceOrderScreen() {
  const navigate = useNavigate();
  const [cartItemsData, setCartItemsData] = useState([]);
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  useEffect(() => {
    // Extracting id and quantity from cartItems
    const extractedData = cart.cartItems.map((item) => ({
      productId: item._id,
      quantityOrdered: item.quantity,
    }));

    // Storing the extracted data in the state variable
    setCartItemsData(extractedData);
  }, [cart.cartItems]);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; //convart 123.2345 = 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });

      await Axios.post(
        "/api/count_in_stock/order",
        {cartItemsData},
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const { data } = await Axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      

      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div className="">
      {/* <CheckOut step1 step2 step3 step4 ></CheckOut> */}

      <Container>
        <h1 className="my-3">Place Order</h1>
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address:</strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city},{cart.shippingAddress.distric}
                </Card.Text>
                <Link className="no-underline" to="/shipping">
                  Edit
                </Link>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> {cart.paymentMethod}
                </Card.Text>
                <Link className="no-underline" to="/payment">
                  Edit
                </Link>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={`/images/${item.image}`}
                            alt={item.name}
                            className="h-20"
                          ></img>{" "}
                          <Link
                            className="no-underline"
                            to={`/product/${item.slug}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>${item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Link className="no-underline" to="/cart">
                  Edit
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${cart.itemsPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${cart.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${cart.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Order Total</strong>
                      </Col>
                      <Col>
                        <strong>${cart.totalPrice.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        type="button"
                        variant="warning"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                      >
                        Place Order
                      </Button>
                    </div>
                    {loading && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PlaceOrderScreen;
