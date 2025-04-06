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
    <div className="container mx-auto py-5  px-4">
      {/* Title */}
      <h1 className="text-3xl mt-11 md:text-4xl font-bold text-center text-green-600 mb-6">
        All Brands
      </h1>
      <Helmet>
        <title>Brands</title>
        </Helmet>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {brands?.map((brand) => (
          <div
            key={brand._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <a href="#">
              <img
                className="w-full h-40 sm:h-48 object-cover"
                src={brand.image}
                alt={brand.name}
              />
            </a>
            <div className="p-4">
              <p className="text-lg font-semibold text-center text-gray-800 dark:text-white">
                {brand.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
