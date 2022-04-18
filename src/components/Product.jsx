// import { Button, CardBody } from "@windmill/react-ui";
import { Button } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import React from "react";
import { ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";
import { formatCurrency } from "../helpers/formatCurrency";
import './ProductCard.css'

const Product = ({ product }) => {
  const { addItem } = useCart();

  const addToCart = async (e) => {
    e.preventDefault();
    await addItem(product, 1);
  };
  return (
    <div className="w-full flex flex-col justify-between sm:w-1/2 md:w-1/3 lg:w-1/4 my-2 px-2">
      <Link to={`/products/${product.product_id}`}>
        <div className="card">
          <div className="imgBox">
            <img src={product.image_url}
              alt={product.name}
              loading="lazy"
              decoding="async"
              title={product.name}
              className="mouse"
              style={{ width: "180px", height: "180px", objectFit: "contain" }} />
          </div>

          <div className="contentBox">
            <h3>{product.name}</h3>
            <h3 className="price">{formatCurrency(product.price)}</h3>
            <Button iconLeft={ShoppingCart} onClick={(e) => addToCart(e)} className="buy text-center">Add to Cart</Button>
          </div>

        </div>
      </Link>

    </div>
  );
};

export default Product;
