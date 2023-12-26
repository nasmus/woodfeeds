import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import productImg from "../../css/category-80.jpg";

const reducer = (state, action) => {
  switch (action.type) {
    case "FATCH_REQUEST":
      return { ...state, loading: true };
    case "FATCH_SUCCESS":
      return { ...state, category: action.payload, loading: false };
    case "FATCH_FAILLED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function CategoryHeader() {
  const [{ loading, error, category }, dispatch] = useReducer(reducer, {
    category: [],
    loading: true,
    error: "",
  });



  //const [category, setCategory] = useState([]);


  useEffect(() => {
    const fatchData = async () => {
      dispatch({type: "FATCH_REQUEST"})
      try{
        const categoryData = await axios.get(`/api/category/get_all_category`);
        dispatch({ type: "FATCH_SUCCESS", payload:categoryData.data.categoryList })
      } catch(error){
        console.log("eroor",error)
        dispatch({ type: "FATCH_FAILLED", payload: error.message })
      }
      
      //setCategory(categoryData.data.categoryList);
    };
    fatchData();
  }, []);


  return (
    <div>
      <div
        style={{ marginBottom: "10px", marginTop: "10px" }}
        className="header_category"
      >
        <div id="ec-main-menu-desk" className="d-none d-lg-block sticky-nav">
          <div className="container position-relative">
            <div className="row">
              <div className="col-md-12 align-self-center">
                <div className="ec-main-menu">
                  <ul>
                    {category && category.map((item, index) => {
                      return (
                        <li key={index} className="dropdown position-static">
                          <Link to={`/category/${item._id}/${item.slug}`}>
                            <div className="flex flex-col items-center">
                              <img src="https://rukminim1.flixcart.com/flap/96/96/image/22fddf3c7da4c4f4.png?q=100" alt="category-img" className='h-16 w-16' />
                              {item.name}
                            </div>
                          </Link>
                          {item.children.length > 0 ? (
                            <ul style={{ width: "20%" }} className="sub-menu">
                              {item.children.map((element, index) => {
                                return (
                                  <li key={index}>
                                    <Link to={`/category/${element._id}/${element.slug}`}>
                                      {element.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            ""
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryHeader;
