import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import "../css/ShippingAddress.css";
function ShipingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, paymentMethod, cartItems },
  } = state;
  const localData = JSON.parse(localStorage.getItem('userInfo'));
  
  

   const [address, setAddress] = useState(shippingAddress.address || "");
   const [city, setCity] = useState(shippingAddress.city || "");
   const [distric, setDistric] = useState(shippingAddress.distric || "");
   const [phoneNumber, setPhoneNumber] = useState( localData.phone ||
     shippingAddress.phoneNumber || ""
   );

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  

  const submitHandler = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 11 && /^01\d{9}$/.test(phoneNumber)) {
      ctxDispatch({
        type: "SAVE_SHIPPING_ADDRESS",
        payload: {
          fullName,
          phoneNumber,
          address,
          city,
          distric,
        },
      });
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify({
          fullName,
          phoneNumber,
          address,
          city,
          distric,
        })
      );
      // navigate("/payment");

      ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
      localStorage.setItem("paymentMethod", paymentMethodName);
      navigate("/placeorder");
    } else {
      toast.error('Invalid phone number!');
    }
  };
  const [fullName, setFullName] = useState( localData.name || shippingAddress.fullName || "");


  // Payment method

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "Nagad"
  );

  const handlePhoneNumberChange = (e) => {
        const cleanedPhoneNumber = e.target.value.replace(/\s/g, "");
        setPhoneNumber(cleanedPhoneNumber);

  }
  

  return (
    <form onSubmit={submitHandler} className="address">
      <div className="address__left">
        <div class="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                value={fullName}
                placeholder="Name"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              {/* <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p> */}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Phone
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                value={phoneNumber}
                placeholder="Phone Number"
                onChange={handlePhoneNumberChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                City
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                value={city}
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                Distric
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                value={distric}
                placeholder="Distric"
                onChange={(e) => setDistric(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <p class="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>
        </div>
        {/* this is form dev */}
      </div>
      <div className="address__right">
        <div className=" border-1 rounded-md border-green-600 px-10 py-4 bg-slate-100 ">
          <h3>Order Summery</h3>
          <div className="flex justify-between">
            <h5>Total Item</h5>
            <h5>{cartItems.reduce((a, c) => a + c.quantity, 0)}</h5>
          </div>
          <div className="flex justify-between">
            <h5>Total Price</h5>
            <h5>৳{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</h5>
          </div>
        </div>
        <div className=" m-2">
          {/* <div className="flex items-center justify-items-center  ">
            <input
              id="Nagad"
              type="radio"
              value="Nagad"
              checked={paymentMethodName === "Nagad"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500  focus:ring-2"
            />
            <label
              for="default-radio-1"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Nagad
            </label>
          </div>
          <div className="flex items-center">
            <div>
              <input
                id="Bkash"
                type="radio"
                value="Bkash"
                checked={paymentMethodName === "Bkash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2 "
              />
            </div>
            <div>
              <label
                for="default-radio-2"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Bkash
              </label>
            </div>
          </div> */}
          <div className="flex items-center">
            <div>
              <input
                
                id="cod"
                type="radio"
                value="Cash on delivery"
                checked={paymentMethodName === "Cash on delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2 "
              />
            </div>
            <div>
              <label
                for="default-radio-2"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Cash on delivey
              </label>
            </div>
          </div>
        </div>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">
          Submit address
        </button>
      </div>
    </form>
  );
              
}
export default ShipingAddressScreen;
