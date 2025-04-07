import React, { useEffect } from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-3.jpeg";

export default function MainSlider() {
  // Optimized slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
    lazyLoad: 'ondemand'
  };

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = [img1, img2, img3];
    preloadImages.forEach((img) => {
      const newImage = new Image();
      newImage.src = img;
    });
  }, []);

  return (
    <section className="slider-section w-full mb-8 px-2 md:px-4 lg:px-0">
      <div className="relative max-w-7xl mx-auto">
        {/* Main content area with responsive layout */}
        <div className="flex flex-col md:flex-row md:space-x-3">
          {/* Main slider - adjusts width responsively */}
          <div className="w-full md:w-8/12 lg:w-9/12 mb-3 md:mb-0">
            <div className="slider-container overflow-hidden rounded-lg shadow-md">
              <Slider {...sliderSettings}>
                <div className="slide-item">
                  <img src={img3} className="w-full h-48 sm:h-64 md:h-72 lg:h-96 object-cover" alt="Featured product showcase" />
                </div>
                <div className="slide-item">
                  <img src={img2} className="w-full h-48 sm:h-64 md:h-72 lg:h-96 object-cover" alt="Special offer banner" />
                </div>
                <div className="slide-item">
                  <img src={img1} className="w-full h-48 sm:h-64 md:h-72 lg:h-96 object-cover" alt="New collection banner" />
                </div>
              </Slider>
            </div>
          </div>

          {/* Side images - hidden on mobile, visible on tablet/desktop */}
          <div className="w-full md:w-4/12 lg:w-3/12 flex flex-row md:flex-col gap-3">
            <div className="w-1/2 md:w-full md:h-1/2">
              <img 
                src={img1} 
                className="w-full h-24 sm:h-32 md:h-[148px] lg:h-[190px] object-cover rounded-lg shadow-md" 
                alt="Featured promotion" 
              />
            </div>
            <div className="w-1/2 md:w-full md:h-1/2">
              <img 
                src={img2} 
                className="w-full h-24 sm:h-32 md:h-[148px] lg:h-[190px] object-cover rounded-lg shadow-md" 
                alt="Secondary promotion" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}