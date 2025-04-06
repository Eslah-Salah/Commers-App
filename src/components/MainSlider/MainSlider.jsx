import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-1.jpeg"
import img2 from "../../assets/images/slider-image-2.jpeg"
import img3 from "../../assets/images/slider-3.jpeg"

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  arrows:false}
  return <>
  <div className="flex">
    <div className="w-9/12">
    <Slider {...settings}>
      <div>
        <img src={img3} className="w-full h-96 object-cover" alt=''/>
      </div>
      <div>
        <img src={img2} className="w-full h-96 object-cover" alt=''/>
      </div>
      <div>
        <img src={img1} className="w-full h-96 object-cover" alt=''/>
      </div>
     
    </Slider></div>
    <div className="w-3/12">
    <div>
        <img src={img1} className="w-full h-48" alt=''/>
      </div>
      <div>
        <img src={img2} className="w-full h-48" alt=''/>
      </div>
    </div>
  </div>
 
  </>
  
}