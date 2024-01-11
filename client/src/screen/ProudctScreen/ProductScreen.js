import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../Store";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Product from "../../components/Product";
import Rating from "../../components/Review/Rating";
import RatingSubmit from "../../components/Review/RatingSubmit";
import Review from "../../components/Review/Review";
import "../../css/ProductScreen.css";
import { getError } from "../../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FATCH_REQUEST":
      return { ...state, loading: true };
    case "FATCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FATCH_FAILLED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    error: "",
    loading: true,
  });

  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    const fatchData = async () => {
      dispatch({ type: "FATCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FATCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FATCH_FAILLED", payload: getError(err) });
      }
    };
    fatchData();
  }, [slug]);

  window.scrollTo({
    behavior: "smooth",
  });

  useEffect(() => {
    const fatchData = async () => {
      const randomData = await axios.get(`/api/random/product_suggest`);
      if (randomData.data !== "") {
        setRandomProducts(randomData.data);
      }
    };
    fatchData();
  }, []);

  // bring data from react context api
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const userinfo = localStorage.getItem("userInfo");

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error("Sorry, Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  const [activeImage, setActiveImage] = useState();
  const [imageValue, setImageValue] = useState([]);
  useEffect(() => {
    if (product.multipleImage !== undefined) {
      setActiveImage(product.multipleImage[0]);
      setImageValue(product.multipleImage);
    }
  }, [product.multipleImage]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <div>
      <div className="product_section">
        <div className="images">
          <img
            className="main_image max-h-96 object-scale-down"
            src={`/images/${activeImage}`}
            alt=""
          />
          <div className="grid_viev_product">
            {imageValue.length > 0
              ? imageValue.map((image, index) => {
                  return (
                    <img
                      src={`/images/${image}`}
                      alt=""
                      onClick={() => setActiveImage(image)}
                    />
                  );
                })
              : ""}
          </div>
        </div>
        <div className="product_content pt-4">
          <h1>{product.name}</h1>
          <p>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <b className=" text-cyan-500 ">
              {product.numReviews ? product.numReviews : 0} reviews
            </b>{" "}
            | <b className=" text-orange-600 ">{product.countInStock} Stock</b>
          </p>
          <h5>
            {" "}
                {/* <i class="fa-solid fa-bangladeshi-taka-sign"></i> */}
                ৳{product.price}
          </h5>
          <h4>Product Features</h4>
          <ul>
            {/* <li style={{ listStyleType: "square" }}>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </li> */}
            <li style={{ listStyleType: "square" }}>
              Product Hight <b>{product.hight}</b>
            </li>
            <li style={{ listStyleType: "square" }}>
              Product width <b>{product.width}</b>
            </li>
            <li style={{ listStyleType: "square" }}>
              Thickness <b>{product.thickness}</b>
            </li>
            <li style={{ listStyleType: "square" }}>
              Product Color <b>{product.color}</b>
            </li>
            <li style={{ listStyleType: "square" }}>
              Product Materials <b>{product.productMaterials}</b>
            </li>
          </ul>
          <div className="button">
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <div className="d-grid">
                  <button
                    className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white"
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </button>
                </div>
              </ListGroup.Item>
            )}
          </div>
        </div>
      </div>
      <div className="product_description mx-8 lg:my-2 my-4">
        <h3>Description</h3>
        <p><div dangerouslySetInnerHTML={{ __html: product.description }} /></p>
      </div>
      <div className="product_suggest">
        <h2>Product Related To This Item</h2>
        <div className="product-grid2">
          {randomProducts.map((product) => {
            return <Product product={product}></Product>;
          })}
        </div>
      </div>
      {userinfo ? (
        <div>
          <RatingSubmit product={product} />
        </div>
      ) : (
        ""
      )}
      <div className="product_review">
        <Review product={product} />
      </div>
    </div>
  );
}

export default ProductScreen;
