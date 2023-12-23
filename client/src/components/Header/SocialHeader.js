import { Settings } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Store } from "../../Store";
import "../../css/Navbar.css";
import Accordion from "../Sidebar/Accordion";
import NavDropdown from "react-bootstrap/NavDropdown";
import LinkContainer from "react-router-bootstrap/LinkContainer";

function SocialHeader() {
  const [category, setCategory] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  useEffect(() => {
    const fatchData = async () => {
      const categoryData = await axios.get(`/api/category/get_all_category`);
      if (categoryData) {
        setCategory(categoryData.data.categoryList);
      }
    };
    fatchData();
  }, []);

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div
        style={{ marginTop: "20px", marginRight: "20px" }}
        className="col d-lg-none "
      >
        <div className="ec-header-bottons">
          <div className="ec-header-user dropdown">
            {userInfo ? (
              <NavDropdown
                title={
                  <i className="fi-rr-user"></i>
                }
                x
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profoile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order history</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/reset_password">
                  <NavDropdown.Item>Password Reset</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link className="dropdown-item" to="/" onClick={signOutHandler}>
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link
                to="/signin"
                style={{ textDecoration: "none" }}
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fi-rr-user"></i>
              </Link>
            )}
          </div>

          <Link to="/cart" className="ec-header-btn ec-side-toggle">
            <div className="header-icon">
              <i className="fi-rr-shopping-bag"></i>
            </div>
            <span className="ec-header-count cart-count-lable">
              {cart.cartItems.length > 0 && (
                <span>
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                </span>
              )}
            </span>
          </Link>

          <Link to="#" className="ec-header-btn ec-side-toggle d-lg-none">
            <i className="fi fi-rr-menu-burger" onClick={showSidebar}></i>
          </Link>
        </div>
      </div>

      {/*navbar for mobile responsive */}

      <div className="navbar">
        <div className={sidebar ? "nav-manu active" : "nav-manu"}>
          <div
            className="navbar-toggle absolute -right-5  top-3 hover:font-bold  "
            onClick={showSidebar}
          >
            <Link
              to="#"
              className="menu-bars relative text-cyan-600 hover:text-orange-600 "
            >
              <CloseIcon />
            </Link>
          </div>
          <div className="nav-manu-items flex flex-col justify-between">
            <div>
              <section className="border-b-2 flex items-center p-3 ">
                <div>
                  <Avatar />
                </div>
                <div className=" pl-3 ">
                  {userInfo ? (
                    <>
                      <p className="m-0 text-lg font-bold ">{userInfo.name}</p>
                      <p className="m-0 text-sm font-light ">{userInfo.role}</p>
                    </>
                  ) : (
                    <Link className="no-underline" to="/signin">
                      <p className="m-0 text-lg font-bold">Log In</p>
                    </Link>
                  )}
                </div>
              </section>
              <section className="border-b py-2">
                {category.map((item, index) => {
                  return (
                    <Accordion title={item.name}>
                      {item.children.length > 0 ? (
                        <div>
                          {item.children.map((element, index) => {
                            return (
                              <div
                                key={index}
                                className=" pl-2 py-0.5 font-sans font-medium text-sm "
                              >
                                <Link
                                  className="no-underline text-slate-600 hover:text-orange-600 "
                                  onClick={showSidebar}
                                  to={`/category/${element._id}`}
                                >
                                  {element.name}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </Accordion>
                  );
                })}
              </section>
            </div>
            <div className=" pb-3 pl-2 ">
              {userInfo ? (
                <section className=" bottom-0 text-slate-400">
                  <div className="flex ">
                    <Settings
                      fontSize="small"
                      className={`mt-2 text-slate-400 `}
                    />
                    <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                      <span className={`text-sm font-medium  `}>Setting</span>
                    </button>
                  </div>
                  <Link
                    className=" no-underline text-slate-400 hover:text-slate-400 "
                    to="/"
                    onClick={signOutHandler}
                  >
                    <div className="flex ">
                      <ExitToAppIcon
                        fontSize="small"
                        className={`mt-2 text-slate-400 `}
                      />
                      <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                        <span className={`text-sm font-medium`}>Logout</span>
                      </button>
                    </div>
                  </Link>
                </section>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialHeader;
