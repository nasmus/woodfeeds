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
            <Link className=" no-underline text-white " to="#">
              <div className="hover:text-slate-200">About US</div>
            </Link>
            <Link className=" no-underline text-white " to="#">
              <div className="hover:text-slate-200">Terms & Conditions</div>
            </Link>
            <Link className=" no-underline text-white " to="#">
              <div className="hover:text-slate-200">Return & Refund Policy</div>
            </Link>
            <Link className=" no-underline text-white " to="#">
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
      <div className="bg-[#2b3242] text-slate-400 flex items-center justify-center p-2.5">
        <p>©{new Date().getFullYear()} woodfeeds.com . All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
