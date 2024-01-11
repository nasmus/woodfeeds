import axios from "axios";
import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Row from "react-bootstrap/esm/Row";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import MessageBox from "../components/MessageBox";
import "../css/CartScreen.css";

function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandeler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry Bro !");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandeler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const checkOutHandler = () => {
    navigate("/shipping/?redirect=/placeorder");
  };

  return (
    <div>
      <Container>
        <h1 className="mainScreen">Shoping Cart</h1>
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <MessageBox>
                cart is empty. <Link to="/">Go Shoping</Link>
              </MessageBox>
            ) : (
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroupItem key={item._id}>
                    <div className="cartScreen">
                      <div className="cartScreen_image_cart items-center">
                        <img
                          style={{ height: "50px" }}
                          src={`/images/${item.image}`}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>
                        <Link
                          className="cartScreen__image_link"
                          to={`/product/${item.slug}`}
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="cartScreen__button">
                        <div className="cartScreen__button_left">
                          <Button
                            variant="light"
                            onClick={() =>
                              updateCartHandeler(item, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}
                          >
                            <i className="fas fa-minus-circle"></i>
                          </Button>
                        </div>
                        <div className="cartScreen__button_right">
                          <Button
                            variant="light"
                            onClick={() =>
                              updateCartHandeler(item, item.quantity + 1)
                            }
                            disabled={item.quantity === item.countInStock}
                          >
                            <i className="fas fa-plus-circle"> </i>
                          </Button>
                        </div>
                      </div>
                      <div className="cartScreen_span">
                        <span>{item.quantity}</span>
                      </div>

                      <div className="cartScreen__button_delete">
                        <Button
                          onClick={() => removeItemHandeler(item)}
                          variant="light"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h3>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) :{" "}
                      <span className="cartScreen_span">
                        ৳
                        {cartItems.reduce(
                          (a, c) => a + c.price * c.quantity,
                          0
                        )}
                      </span>
                    </h3>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className="d-grid">
                      <button
                        className="px-4 py-2.5 text-white bg-cyan-500 hover:bg-cyan-600 rounded-lg"
                        onClick={checkOutHandler}
                        disabled={cartItems.length === 0}
                      >
                        Process To Checkout
                      </button>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CartScreen;
