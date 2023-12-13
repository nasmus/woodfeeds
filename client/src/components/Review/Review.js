import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Rating } from "@mui/material";

function Review(props) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setReviews(props.product.reviews);
  }, [props]);
  return (
    <div className=" mt-5 sm:m-4 ">
      <h2 className="pb-4 pl-4 md:pl-4 font-sans text-neutral-500 ">
        Top Reviews In Bangladesh
      </h2>
       {reviews !== undefined ? reviews.map((item,index) => {
        return ( 
          <div key={index}>
            <div className="flex pl-6 md:pl-10 items-center ">
              <AccountCircleIcon />
              <p className=" pl-2 font-medium text-yellow-700 ">
                {item.name}
              </p>
            </div>
            <div className="pl-6 pt-2 md:pl-14">
              <Rating value={item.rating} name="read-only" readOnly />
            </div>
            <div className="pl-6 mb-8 md:pl-12 ">
              <p className="lg:w-2/3">
                {item.comment}
              </p>
            </div>
          </div>
        );
      }):''} 
    </div>
  );
}

export default Review;
