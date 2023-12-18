import {
  FacebookTwoTone,
  Instagram,
  SubscriptionsTwoTone,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="text-white bg-orange-900">
      <div className="px-6 py-4 md:flex md:justify-between md:px-20 md:py-9 md:items-start">
        <div className="max-w-sm my-6 md:my-0">
          <h1 className="text-5xl font-bold py-1 text-white">LOGO</h1>
          <p className="py-4">
            Largest product search engine, maximum categorized online shopping
            mall and quickest home delivery system.
          </p>
        </div>
        <div className="my-8 md:my-0">
          <h3 className="font-semibold text-xl py-3 text-white">Contact Us</h3>
          <p>
            House #8, Road # 14,Dhanmondi,
            <br /> Dhaka-1209.
            <br />
            Email: support@e-valy.com
          </p>
          <p></p>
          <p className="pt-2"></p>
        </div>
        <div>
          <h3 className="font-semibold text-xl py-3 text-white">
            Let Us Help You
          </h3>
          <div className="text-left">
            <Link className=" no-underline text-white " to="#">
              <div>Your Account</div>
            </Link>
            <Link className=" no-underline  text-white" to="#">
              <div>Your Order</div>
            </Link>
            <Link className=" no-underline text-white " to="#">
              <div>Terms & Conditions</div>
            </Link>
            <Link className=" no-underline text-white " to="#">
              <div>Return & Refund Policy</div>
            </Link>
            <Link className=" no-underline text-white " to="#">
              <div>FAQ</div>
            </Link>
          </div>
        </div>
        <div className="my-8 md:my-0 flex flex-col items-start md:justify-center md:items-center">
          <h3 className="font-semibold text-xl py-3 text-white">
            MoneybagGo App
          </h3>
          <div className="flex" >
            <div className="flex items-center ">
              <FacebookTwoTone className="mx-2 cursor-pointer" />
              <Instagram className="mx-2 cursor-pointer" />
              <SubscriptionsTwoTone className="mx-2 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#2b3242] text-slate-400 flex items-center justify-center p-2.5">
        <p>2023 E-valy.com Limited. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
