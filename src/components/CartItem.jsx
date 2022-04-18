import { Button } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import { formatCurrency } from "helpers/formatCurrency";
import React from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item, setShow }) => {
  const { decrement, increment, deleteItem } = useCart();

  const increase = () => {
    increment(item.product_id);
  };
  const decrease = () => {
    decrement(item.product_id);
  };
  return (
    <>
      <li className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img src={item.image_url} alt={item.name} className="h-full w-full p-2 object-contain object-center" />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <Link onClick={() => setShow(false)} to={`/products/${item.product_id}`}>{item.name}</Link>
              </h3>
              <p className="ml-4">{formatCurrency(((item.price * 10) * (item.quantity * 10)) / 100)}</p>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="py-auto flex items-center" >
              <Button
                size="small"
                layout="outline"
                disabled={item.quantity === 1}
                onClick={() => decrease()}
              >
                -
              </Button>
              <span className="mr-2 ml-2">{item.quantity}</span>
              <Button size="small" layout="outline" onClick={() => increase()}>
                +
              </Button>
            </div>

            <div className="flex">
              <button onClick={() => deleteItem(item.product_id)} type="button" className="font-medium text-lg text-purple-600 hover:text-purple-800">Remove</button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default CartItem;
