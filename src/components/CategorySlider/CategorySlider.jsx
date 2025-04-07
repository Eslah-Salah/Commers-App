import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

export default function CategorySlider() {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Responsive settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: 'ondemand',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Get categories with error handling and loading state
  const getAllCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategoryList(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Show a loading skeleton while data is being fetched
  if (loading) {
    return (
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-32 sm:h-36 md:h-40 lg:h-44 rounded-lg mb-2"></div>
              <div className="bg-gray-200 h-4 w-20 mx-auto rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="category-slider my-8">
      <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
      <div className="overflow-hidden">
        <Slider {...settings}>
          {categoryList.map((category) => (
            <div className="px-2" key={category._id}>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="relative pb-[75%]">
                  <img 
                    src={category.image} 
                    className="absolute inset-0 h-full w-full object-cover object-center" 
                    alt={category.name}
                    loading="lazy" 
                  />
                </div>
                <h5 className="text-center py-2 font-medium text-gray-700 truncate px-2">
                  {category.name}
                </h5>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}