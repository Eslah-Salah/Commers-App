import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';


export default function Categories() {
  let [categories, setCategories] = useState([]);

  async function getAllCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="container mx-auto p-5">
        <Helmet>
        <title>Categories</title>
        </Helmet>
      {/* Flex container to arrange items in rows of 3 */}
      <div className="flex flex-wrap  mt-11 gap-6">
        {categories?.map((category) => (
          <div
            key={category._id}
            className="hover:shadow-2xl transition-shadow duration-300   w-full mx-auto  sm:w-[48%] md:w-[30%] lg:w-[30%] xl:w-[30%] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={category.image}
                alt={category.name}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2  text-center text-green-600 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {category.name}
                </h5>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
