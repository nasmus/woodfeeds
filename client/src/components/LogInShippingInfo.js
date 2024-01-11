import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";

export default function LogInShippingInfo() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, paymentMethod, cartItems },
  } = state;
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [distric, setDistric] = useState(shippingAddress.distric || "");
  const [phoneNumber, setPhoneNumber] = useState(
    shippingAddress.phoneNumber || ""
  );
  const [shippingCharge, setShippingCharge] = useState(200);


  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "cod"
  );
  const handlePhoneNumberChange = (e) => {
    const cleanedPhoneNumber = e.target.value.replace(/\s/g, "");
    setPhoneNumber(cleanedPhoneNumber);
  };

  var cartItem = JSON.parse(localStorage.getItem("cartItems"));

  const submitHendler = async (e) => {
    e.preventDefault();

    if (phoneNumber.length === 11 && /^01\d{9}$/.test(phoneNumber)) {

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

          ctxDispatch({
            type: "SAVE_PAYMENT_METHOD",
            payload: paymentMethodName,
          });
          localStorage.setItem("paymentMethod", paymentMethodName);
          navigate("/placeorder");
        } else {
          toast.error("Invalid phone number!");
        }

        if (cartItem.length > 0) {
          navigate("/placeorder");
        } else {
          navigate(redirect || "/");
        }
     
    } else {
      toast.error("Invalid phone number!");
    }
  };

  return (
    <div className="px-3 lg:mx-20 ">
      <form
        onSubmit={submitHendler}
        className="lg:flex justify-around lg:gap-4"
      >
        <div className="lg:w-[40%]">
          <h3>Delivery</h3>
          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              required
              value={fullName}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              required
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(e)}
              type="text"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="flex">
            <div class="mb-6 w-1/2">
              <label
                for="default-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City
              </label>

              <input
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                id="default-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[95%] p-2.5"
              />
            </div>
            <div class="mb-6 w-1/2">
              <label
                for="default-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                District
              </label>
              <input
                required
                value={distric}
                onChange={(e) => setDistric(e.target.value)}
                type="text"
                id="default-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <h4>Payment</h4>
          <div class="flex items-center  me-4">
            <input
              required
              checked
              id="inline-radio"
              type="radio"
              value=""
              name="inline-radio-group"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label
              for="inline-radio"
              class="ms-2 pt-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Cash on delivery
            </label>
          </div>
          <button
            type="submit"
            className="w-full hidden lg:block text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
          >
            Complete Order
          </button>
        </div>
        <div className="lg:w-[30%]">
          <h3 className="pt-3">Order Summary</h3>
          <div className="lg:pt-20">
            {cartItems.map((item) => (
              <div className="flex justify-between items-center items pt-2 ">
                <div className="flex items-center ">
                  <img
                    src={`/images/${item.image}`}
                    alt="i"
                    className="me-3 w-8 h-9 object-cover"
                  />
                  <p className="text-sm w-64">{item.name}</p>
                </div>
                <div>৳{item.price}</div>
              </div>
            ))}
            <div className="pt-3">
              <div className="flex justify-between items-center">
                <p>Subtotal</p>
                <p>
                  ৳{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p>Shipping</p>
                <p>৳{shippingCharge}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Total</p>
                <p>
                  ৳
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0) +
                    shippingCharge}
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full lg:hidden text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
            >
              Complete Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
