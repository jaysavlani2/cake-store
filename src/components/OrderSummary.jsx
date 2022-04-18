import { useCart } from "context/CartContext";
import { formatCurrency } from "helpers/formatCurrency";
import React from "react";

const OrderSummary = () => {
  const d = new Date();
  const date = d.getDate()
  const { cartData, cartSubtotal } = useCart();

  // function subTotal() {
  //   let subtotal = 0;
  //   cartData?.items.map((item) => {
  //     return (subtotal += item?.price);
  //   })
  //   return subtotal;
  // }

  return (
    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
      <div className="flex bg-white shadow-lg flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>

        {cartData?.items.map((item) => (
          <div key={item.product_id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
            <div className="pb-4 md:pb-8 w-full md:w-40">
              <img className="w-full h-36 p-2 object-contain hidden md:block" loading="lazy" decoding="async" src={item?.image_url} alt={item?.name} />
              <img className="w-full h-36 p-2 object-contain md:hidden" loading="lazy" decoding="async" src={item?.image_url} alt={item?.name} />
            </div>
            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">

              <div className="w-full flex justify-between space-x-8 items-start">
                <p className="text-center dark:text-white xl:text-lg leading-6">Price {formatCurrency(item?.price)}</p>
                <p className="text-center dark:text-white xl:text-lg leading-6 text-gray-800"><span className="text-purple-500">Qty {item?.quantity}</span></p>
                <p className="text-center dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Total Price {formatCurrency(item?.price * item?.quantity)}</p>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* ============================================================================= */}
      <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        {/* =============================================== */}
        <div className="flex shadow-lg flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-white space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
            <div className="flex justify-between w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{formatCurrency(cartSubtotal)}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Discount
                {/* <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                  OFFER
                </span> */}
              </p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">-{formatCurrency((cartSubtotal * date) / 100)} ({date}%)</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{formatCurrency(50)}</p>
            </div>
          </div>
          {/* =============================================== */}
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{formatCurrency(((cartSubtotal * 90) / 100) + 50)}</p>
          </div>
        </div>
        {/* <div className="flex shadow-lg flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-white space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
          <div className="flex justify-between items-start w-full">
            <div className="flex justify-center items-center space-x-4">
              <div className="w-8 h-8">
                <img className="w-full h-full" alt="Box" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
              </div>
              <div className="flex flex-col justify-start items-center">
                <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">DPD Delivery<br /><span className="font-normal">Delivery with 2 Hours</span></p>
              </div>
            </div>
            <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">{formatCurrency(200)}</p>
          </div>
          <div className="w-full flex justify-center items-center">
            <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default OrderSummary;
