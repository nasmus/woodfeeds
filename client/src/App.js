//import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProudctScreen/ProductScreen";
//import { Store } from './Store';
import { useState } from "react";
import CategoryHeader from "./components/Header/CategoryHeader";
import Header from "./components/Header/Header";
import AboutUs from "./pages/AboutUs";
import ReturnRefund from './pages/ReturnRefund';
import TermsConditions from "./pages/Termsconditions";
import FAQ from "./pages/faq";
import CartScreen from "./screen/CartScreen";
import CategoryPage from "./screen/CategoryPage";
import Footer from "./screen/FooterScreen/Footer";
import NotFound from "./screen/NotFound";
import OrderScreen from "./screen/Order/OrderScreen";
import OrederHistoryScreen from "./screen/Order/OrederHistoryScreen";
import PaymentMethodScreen from "./screen/Order/PaymentMethodScreen";
import PlaceOrderScreen from "./screen/Order/PlaceOrderScreen";
import ShippingInformation from "./screen/Order/ShippingInformation";
import ProfileScreen from "./screen/ProfileScreen";
import SearchScreen from "./screen/SearchScreen";
import ResetPassword from "./screen/SignUp/ResetPassword";
import SendEmail from "./screen/SignUp/SendEmail";
import SignInScreen from "./screen/SignUp/SignInScreen";
import SignUpScreen from "./screen/SignUp/SignUpScreen";


function App() {
  // const {state, dispatch:ctxDispatch} = useContext(Store);
  // const {cart,userInfo} = state;
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(!isVisible);
    
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column main_section">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Header isVisible={isVisible} handleClick={handleClick} />
          <CategoryHeader />
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen isVisible={isVisible} />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/shipping" element={<ShippingInformation />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/orderhistory" element={<OrederHistoryScreen />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/reset_password/:token" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<SendEmail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/return-refund" element={<ReturnRefund />} />
            <Route path="/category/:id/:slug" element={ <CategoryPage /> } />
            <Route path="/reset_password/:token" element={ <ResetPassword /> } />
            <Route path="/forgot-password" element={ <SendEmail /> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </main>
        <footer className=" mt-16 ">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
