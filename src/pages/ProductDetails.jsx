// import { Button } from "@windmill/react-ui";
import { Button } from "@windmill/react-ui";
import Rating from "components/Rating";
import { useCart } from "context/CartContext";
import { formatCurrency } from "helpers/formatCurrency";
import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
// import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import productService from "services/product.service";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (e) => {
    await addItem(product, quantity);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { data: product } = await productService.getProduct(id);
      console.log(product);
      setProduct(product);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  return (
    <Layout loading={isLoading}>
      <div className="text-gray-700 bg-gray-100 mt-8 md:mt-16 lg:mt-16 mx-auto px-4 md:px-0 flex-grow h-full w-full">
        <section className="bg-gray-100 text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 md:py-20 lg:py-20 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt={product?.name}
                className="lg:w-2/5 w-full object-contain object-center md:p-5 lg:p-5 px-5"
                src={product?.image_url}
                style={{ height: "500px" }}
              />
              <div className="lg:w-3/5 w-full lg:pl-10 lg:py-6 lg:mt-0 my-auto">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {product?.brandname}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product?.name}
                </h1>
                <div className="flex border-b-2 border-gray-200 mb-3 mt-3 pb-3">
                  <span className="flex items-center">
                    <Rating rating={+product?.avg_rating} />
                    <span className="text-gray-600 ml-3">{product ? +product.count : 0} Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <div className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </div>
                    <div className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </div>
                    <div className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </div>
                  </span>
                </div>
                <div className="flex flex-wrap border-b-2 border-gray-200 mb-3 mt-3 pb-3">
                  <p className="w-full lg:w-1/5 md:w-1/4"><strong>Description</strong></p>
                  <p className="w-full lg:w-4/5 md:w-3/4 leading-relaxed">{product?.description}</p>
                </div>
                <div className="flex mt-3 items-center pb-3 border-b-2 border-gray-200 mb-3">
                  {/* <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div> */}
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Quantity</span>
                    <div className="py-auto flex items-center" >
                      <Button
                        size="small"
                        layout="outline"
                        disabled={quantity === 1}
                        onClick={() => setQuantity(quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mr-2 ml-2">{quantity}</span>
                      <Button size="small" layout="outline" onClick={() => setQuantity(quantity + 1)}>
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex mt-3 pb-3">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    <del>{formatCurrency(product?.price)}</del> {formatCurrency(((product?.price * 90) / 100).toFixed(2))}
                    {/* for discount */}
                    {/* {formatCurrency(((product?.price * (Math.random() * (100 - 90) + 90)) / 100).toFixed(2))} */}
                  </span>
                  <button
                    className="flex ml-auto text-white bg-purple-600 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded"
                    onClick={(e) => addToCart(e)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetails;
