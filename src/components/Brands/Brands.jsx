import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  
  async function getAllBrands() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }
  
  useEffect(() => {
    getAllBrands();
  }, []);
  
  return (
    <div className="container mx-auto py-8 mt-8 px-4">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-semibold text-center text-green-700 mb-8">
        All Brands
      </h1>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {brands?.map((brand) => (
          <div
            key={brand._id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)"
            }}
          >
            <div className="p-3"> {/* Padding around the content */}
              <div className="bg-gray-50 rounded-md p-2"> {/* Light gray background for the image area */}
                <a href="#" className="block">
                  <img
                    className="w-full h-36 sm:h-44 object-contain"
                    src={brand.image}
                    alt={brand.name}
                  />
                </a>
              </div>
              <div className="p-2 mt-2">
                <p className="text-lg font-medium text-center text-gray-800">
                  {brand.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}