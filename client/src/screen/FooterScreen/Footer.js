import {
  FacebookTwoTone,
  Instagram,
  SubscriptionsTwoTone,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../css/logo.png";

function Footer() {
  return (
    <div className="text-white bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="px-6 py-4 md:flex md:justify-between md:px-32 md:py-9 md:items-start">
        <div className="hidden lg:block lg:max-w-sm lg:my-6">
          <img src={logo} className="w-60" alt="Site Logo" />
          <p className="py-4">
          Transform Your Space with Exquisite Wooden Wonders - Explore Timeless Furniture at woodfeeds.com
          </p>
        </div>
        <div className="my-8 md:my-0">
          <h3 className="font-semibold text-xl py-3 text-white">Contact Us</h3>
          <p>
            Kazipur
            <br /> Sirajganj-6710.
            <br />
            Email: support@woodfeeds.com
          </p>
          <p></p>
          <p className="pt-2"></p>
        </div>
        <div>
          <h3 className="font-semibold text-xl py-3 text-white">
            Let Us Help You
          </h3>
          <div className="text-left">
            <Link className=" no-underline text-white " to="/about-us">
              <div className="hover:text-slate-200">About US</div>
            </Link>
            <Link className=" no-underline text-white " to="/terms-conditions">
              <div className="hover:text-slate-200">Terms & Conditions</div>
            </Link>
            <Link className=" no-underline text-white " to="/return-refund">
              <div className="hover:text-slate-200">Return & Refund Policy</div>
            </Link>
            <Link className=" no-underline text-white " to="/faq">
              <div className="hover:text-slate-200"> FAQ</div>
            </Link>
          </div>
        </div>
        <div className="my-8 md:my-0 flex flex-col items-start md:justify-center md:items-center">
          <h3 className="font-semibold text-xl py-3 text-white">WoodFeeds</h3>
          <div className="flex">
            <div className="flex items-center">
              <Link
                className=" !text-white"
                target="_blank"
                to="https://www.facebook.com/WoodFeeds1"
              >
                <FacebookTwoTone className="mx-2 hover:text-slate-300 cursor-pointer" />
              </Link>
              <Link
                className=" !text-white"
                target="_blank"
                to="https://www.instagram.com/woodfeeds/"
              >
                <Instagram className="mx-2  hover:text-slate-300  cursor-pointer" />{" "}
              </Link>
              <Link className=" !text-white" target="_blank" to="#">
                <SubscriptionsTwoTone className="mx-2  hover:text-slate-300  cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-slate-400 flex items-center justify-center p-2.5">
        <p>©{new Date().getFullYear()} woodfeeds.com . All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
