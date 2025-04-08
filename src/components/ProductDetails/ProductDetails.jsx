import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const { id, category } = useParams();

  useEffect(() => {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => setProduct(data.data));

    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        const related = data.data.filter(p => p.category.name === category);
        setRelatedProduct(related);
      });
  }, [id, category]);

  return (
    <div className="container mx-auto px-4 my-8 py-20">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <Slider dots>
            {product?.images.map((img, i) => (
              <div key={i}>
                <img src={img} alt="" className="w-full rounded" />
              </div>
            ))}
          </Slider>
        </div>

        <div className="lg:w-2/3">
          <h2 className="text-xl font-semibold mb-2">{product?.title}</h2>
          <p className="text-gray-500 mb-4">{product?.description}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">{product?.price} EGP</span>
            <span className="flex items-center gap-1 text-yellow-500">
              <i className="fa-solid fa-star"></i> {product?.ratingsAverage}
            </span>
          </div>
          <button className="btn mt-4">Add To Cart</button>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">Related Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {relatedProduct.map((product) => (
          <div key={product.id} className="border rounded p-3 group hover:shadow-lg transition">
            <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} alt={product.title} className="w-full mb-2 rounded" />
              <h5 className="text-sm text-gray-500">{product.name}</h5>
              <h2 className="text-md font-medium mb-2">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h2>
              <div className="flex justify-between text-sm mb-2">
                <span>{product.price} EGP</span>
                <span className="text-yellow-500 flex items-center gap-1">
                  <i className="fa-solid fa-star"></i> {product.ratingsAverage}
                </span>
              </div>
              <button className="btn w-full mt-2 transform translate-y-8 group-hover:translate-y-0 transition duration-300">
                Add To Cart
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
