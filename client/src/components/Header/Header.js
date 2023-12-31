import { ExpandMore, Person } from "@mui/icons-material";
import React, { useContext } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import { Link } from "react-router-dom";
import { Store } from "../../Store";
import logo from "../../css/logo.png";
import SearchBox from "../SearchBox";
import SocialHeader from "./SocialHeader";

function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <div>
      <SocialHeader />
      <div className="ec-header-bottom d-none d-lg-block">
        <div className="container position-relative">
          <div className="row">
            <div className="ec-flex">
              <div className="align-self-center">
                <div className="header-logo">
                  <Link to="/">
                    <img
                      style={{ width: "230px" }}
                      src={logo}
                      alt="Site Logo"
                    />
                  </Link>
                </div>
              </div>

              {<SearchBox />}

              <div className="align-self-center">
                <div className="ec-header-bottons">
                  <div className="ec-header-user dropdown">
                    {userInfo ? (
                      <NavDropdown
                        title={
                          <button
                            type="button"
                            class=" hover:text-white hover:bg-cyan-500 focus:outline-none rounded-lg text-md px-2.5 py-2 text-center inline-flex items-center me-2"
                          >
                            <Person className="me-2" />
                            {userInfo.name}
                            <ExpandMore />
                          </button>
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
                        <Link
                          className="dropdown-item"
                          to="/"
                          onClick={signOutHandler}
                        >
                          Sign Out
                        </Link>
                      </NavDropdown>
                    ) : (
                      // <Link
                      //   to="/signin"
                      //   style={{ textDecoration: "none" }}
                      //   className="dropdown-toggle"
                      //   data-bs-toggle="dropdown"
                      // >
                      //   <i className="fi-rr-user"></i>Sign In
                      // </Link>
                      <Link
                        to="/signin"
                        class="text-black hover:bg-cyan-600 hover:!text-white focus:outline-none rounded-lg text-md px-2.5 py-2 text-center inline-flex items-center me-2 no-underline"
                      >
                        <Person className="me-2" />
                        <span className="me-2">Login</span>
                      </Link>
                    )}
                  </div>

                  <Link to="/cart" className="ec-header-btn ec-side-toggle">
                    <div className="header-icon">
                      <i className="fi-rr-shopping-bag"></i>
                    </div>
                    <span
                      style={{ background: "red" }}
                      className="ec-header-count cart-count-lable"
                    >
                      <span
                        className="main-label-note-new"
                        data-toggle="tooltip"
                        title="NEW"
                      ></span>
                      {cart.cartItems.length > 0 && (
                        <span>
                          {" "}
                          {cart.cartItems.reduce(
                            (a, c) => a + c.quantity,
                            0
                          )}{" "}
                        </span>
                      )}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile manue bar */}

      <div className="ec-header-bottom d-lg-none">
        <div className="container position-relative">
          <div className="row ">
            <div className="col">
              <div className="header-logo">
                <Link
                  style={{ display: "flex", justifyContent: "center " }}
                  to="/"
                >
                  <img style={{ width: "260px" }} src={logo} alt="Site Logo" />
                </Link>
              </div>
            </div>
            <div className="col">{<SearchBox />}</div>
          </div>
        </div>
      </div>
      {/* Header Main Categori */}
    </div>
  );
}

export default Header;
