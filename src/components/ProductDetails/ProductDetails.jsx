import React, { useEffect, useState } from "react";
import { data, Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";


export default function ProductDetails() {
  const [product, setproduct] = useState(null);
  const [relatedProduct, setrelatedProduct] = useState([]);
  let { id, category } = useParams();
  function getRelatedProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        let related = allProducts.filter(
          (product) => product.category.name == category
        );
        setrelatedProduct(related);
      })
      .catch(() => {});
  }

  function GetDetails(x) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${x}`)
      .then((req) => {
        setproduct(req.data.data); //object of one product
      });
  }
  useEffect(() => {
    GetDetails(id);
    getRelatedProducts(category);
  }, [id, category]);
  return (
    <>
      <div className="w-10/12 mx-auto my-5">
        <div className="flex justify-between items-center">
          <div className="w-3/12">
            <Slider dots>
              {product?.images.map((image, i) => {
                return (
                  <div key={i}>
                    <img src={image} className="w-full" />
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="w-8/12">
            <h2>{product?.title}</h2>
            <p className="text-gray-500 my-3">{product?.description}</p>
            <div className="flex justify-between">
              <span>{product?.price}EGP</span>
              <span>
                <i className="fa-solid fa-star text-yellow-300"></i>
                {product?.ratingsAverage}
              </span>
            </div>
            <button className="btn mt-5">Add To Cart</button>
          </div>
        </div>
        <div className="flex items-center mt-5">
          {relatedProduct.map((Product) => {
            return<>
             <div
              key={Product.id}
              className="lg:w-1/4 md:w-3/12 sm:w-6-12 w-full"
            >
              <Link to={`/ProductDetails/${Product.id}/${Product.category.name}`}>
                <div className="item hover:border group overflow-hidden hover:border-active p-2">
                  <img src={Product.imageCover} alt={Product.title} className="w-full" />
                  <h5>{Product.name}</h5>
                  <h2>{Product.title.split(" ").slice(0, 2).join}</h2>
                  <div className="flex justify-between">
                    <span>{Product.price}EGP</span>
                    <span>
                      <i className="fa-solid fa-star text-yellow-300"></i>
                      {Product.ratingsAverage}
                    </span>
                  </div>
                  <button className="btn mt-3 duration-500 translate-y-24 group-hover:translate-y-0">
                    Add To Cart
                  </button>
                </div>
              </Link>
            </div>
            </>

           
          })}
        </div>
      </div>
    </>
  );
}
