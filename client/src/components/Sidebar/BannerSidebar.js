import React, { useEffect, useState } from "react";
import "../../css/Slider.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
function BannerSidebar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const banners = [
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/b91142ce378acb54.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/2dc3aafcc8afbaf8.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/dd7f425c6a2fa49a.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/61a578e7258cbaa5.jpeg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/99fae2c9891a1c0c.jpeg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/7fd0e4ab26429926.jpg?q=20"

    // Add your banner image URLs here
  ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [banners.length]);

  const previousBanner = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  const nextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };


  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextBanner, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div  className="banner-slider">
      <div>
        <div className="image">
          <img 
          src={banners[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`}
            className={` border slider-image ${currentIndex === currentIndex ? 'active' : ''}`}
          />
        </div>
        
        
      </div>
      {/* <div className="slider-dots">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div> */}
    </div>
  );
}

export default BannerSidebar;
