import React, { useEffect, useState } from 'react'

import axios from 'axios';
import Slider from 'react-slick';
export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
  };
  let [categorylist,setcategorylist]=useState([]); 
  function GetAllCategory(){
    axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((req)=>{
      setcategorylist(req.data.data)
    })
  }
  
    useEffect(()=>{
      GetAllCategory();
    },[]);
  return (
    <><Slider  {...settings}>
      {categorylist?.map((category)=>{
        return(
         
          <div className='my-5' key={category._id}>
            <img src={category.image} className='h-48 w-full object-cover object-top' alt=''/>
            <h5 className='text-center'>{category.name}</h5>

          </div>
          
        );
      })}
    </Slider>
    </>
  )
}
