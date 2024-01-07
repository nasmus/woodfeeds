import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../Store";
import { getError } from "../../utils";

function SignUpScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  //const cartItem = localStorage.getItem('cartItems')
  var cartItem = JSON.parse( localStorage.getItem('cartItems') );
 
  const submitHendler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password do not match");
      return;
    }
    if (phone.length === 11 && /^01\d{9}$/.test(phone)) {
      
      try {
        const { data } = await Axios.post("/api/users/signup", {
          name,
          email,
          phone,
          password,
        });
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        if(cartItem.length > 0){
          navigate('/shipping')
        } else{
          navigate(redirect || "/");
        }
        
      } catch (err) {
        toast.error(getError(err));
      }
    } else {
      toast.error('Invalid phone number!');
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    
  }, [navigate, redirect, userInfo]);

  const handlePhone = (e) => {
    const withoutSpace = e.target.value.replace(/\s/g, "");
    setPhone(withoutSpace);
    
  }
  
  return (
    <div>
      <section className=" m-auto ">
        <div
          className="px-4  py-5 px-md-5 text-center text-lg-start"
          style={{ background: "hsl(0, 0%, 96%)" }}
        >
          <div className="container m-auto ">
            <div className="row gx-lg-5  align-items-center">
              <div className="col-lg-6 m-auto mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <h3 className=" font-bold pb-3 leading-tight tracking-tight">
                      Create Your Account
                    </h3>
                    <form onSubmit={submitHendler}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              onChange={(e) => setName(e.target.value)}
                              required
                              className="form-control"
                            />
                            <label className="form-label">Name</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              onChange={(e) => handlePhone(e)}
                              required
                              className="form-control"
                              placeholder="01712000000"
                            />
                            <label className="form-label">Phone Number</label>
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="form-control"
                        />
                        <label className="form-label">Email address</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="form-control"
                        />
                        <label className="form-label">Password</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="form-control"
                        />
                        <label className="form-label"> Confirm Password</label>
                      </div>

                      <button
                        type="submit"
                        className="w-full text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      >
                        Create an account
                      </button>

                      <div className="text-center mt-3 ">
                        <p>
                          Already Have an account ?{" "}
                          <Link to={`/signin?redirect=${redirect}`}>
                            Sign In
                          </Link>
                        </p>
                        {/* <p>or sign up with:</p>
                        <button
                          type="button"
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-google"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-github"></i>
                        </button> */}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUpScreen;
