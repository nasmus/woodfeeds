import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import '../css/Product.css';
import Rating from "./Review/Rating";

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandeler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      toast.error('Sorry.. Product out of stock');
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <>
      <div className="product-card">
        <Link to={`/product/${product.slug}`}>
          <img
            className="main-image"
            src={`/images/${product.image}`}
            //src={product.image}
            alt={product.name}
          />
        </Link>
        <Link className="product-card_link" to={`/product/${product.slug}`}>
          <p>{product.name}</p>
        </Link>
        <span>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews ? product.numReviews : 0}
          />
        </span>
        <p>
          {/* <i class="fa-solid fa-bangladeshi-taka-sign"></i> */}৳
          {product.price}
        </p>
        {/* {product.countInStock === 0 ? (
          
          <Button
            variant="contained"
            size="small"
            endIcon={<AddShoppingCartIcon />}
            disabled
          >
            Out Of Stock
          </Button>
        ) : (
          
          <Button
            onClick={() => addToCartHandeler(product)}
            variant="contained"
            size="small"
            endIcon={<AddShoppingCartIcon />}
          >
            Add To Cart
          </Button>
        )} */}
      </div>
    </>
  );
}

export default Product;
