import axios from "axios";
import React, { useEffect, useReducer } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import BannerSidebar from "../components/Sidebar/BannerSidebar";
import "../css/Product.css";
import side from "../css/side.png";
import TopRatedProduct from "./ProudctScreen/TopRatedProduct";
import CategoryProduct from "./ProudctScreen/CategoryProduct";

const reducer = (state, action) => {
  switch (action.type) {
    case "FATCH_REQUEST":
      return { ...state, loading: true };
    case "FATCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FATCH_FAILLED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen(props) {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  //const [products,setProducts] = useState([]); // if we use useState then use it
  useEffect(() => {
    const fatchData = async () => {
      dispatch({ type: "FATCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products`);
        dispatch({ type: "FATCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FATCH_FAILLED", payload: err.message });
      }

      //setProducts(result.data); // if we use useState then we use it
    };
    fatchData();
  }, []);

  const filteredProducts = products.filter(product => product.countInStock > 0);
  return (
    <div>
      {/* {
        (props.isVisible) ? <LeftSideBar /> : <div></div>
      } */}

      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <>
            <div>
              <div>
                <BannerSidebar />
              </div>
            </div>
            <TopRatedProduct />
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <Product product={product}></Product>
              ))}
            </div>
            <CategoryProduct />
          </>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
