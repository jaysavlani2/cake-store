import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { HelperText } from "@windmill/react-ui";
import API from "api/axios.config";
import { useCart } from "context/CartContext";
import { formatCurrency } from "helpers/formatCurrency";
import React, { useState , useEffect } from "react";
import { useHistory } from "react-router";
import PulseLoader from "react-spinners/PulseLoader";
import OrderService from "services/order.service";
import OrderSummary from "./OrderSummary";
import { useUser } from "context/UserContext";
import { useOrders } from "context/OrderContext";
import orderService from "services/order.service";

const PaymentForm = ({ previousStep, addressData, nextStep }) => {
  const { userData } = useUser();
  const { cartSubtotal, cartTotal, cartData, setCartData } = useCart();
  const [error, setError] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);
  const history = useHistory();
  const { fullname, email, address, city, state, country } = addressData;
  const { orders, setOrders } = useOrders();

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    setError();
    if (!stripe || !elements) {
      return;
    }
    try {
      setIsProcessing(true);
      const { data } = await API.post("/payment", {
        amount: (cartSubtotal * 100).toFixed(),
        email,
      });

      const card = elements.getElement(CardElement);
      const result = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: fullname,
          email,
          address: {
            city,
            line1: address,
            state,
            country: "IN", // TODO: change later
          },
        },
      });
      if (result.error) {
        setError(result.error);
      }

      await stripe.confirmCardPayment(data.client_secret, {
        payment_method: result.paymentMethod.id,
      });

      OrderService.createOrder(cartSubtotal, cartTotal, data.id, "STRIPE").then(
        () => {
          setCartData({ ...cartData, items: [] });
          setIsProcessing(false);
          history.push({
            pathname: "/cart/success",
            state: {
              fromPaymentPage: true,
            },
          });
        }
      );
    } catch (error) {
      setIsProcessing(false);
      // throw error
    }
  };

  useEffect(() => {
    orderService.getAllOrders(1).then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="w-full">
      <div className="pb-6 px-2 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">

          {/* ===== Oredr Summary ===== */}
          <OrderSummary />

          {/* ============================================================================= */}
          <div className="shadow-lg bg-white  w-full xl:w-2/5 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{userData?.fullname?.split(" ").join(" ")}</p>
                    <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">{orders?.total} Previous Orders</p>
                  </div>
                </div>

                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="cursor-pointer text-sm leading-5 ">{userData?.email}</p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Default Shipping Address</p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{userData?.address}, {userData?.city}, {userData?.state}, {userData?.country}.</p>
                  </div>
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Current Shipping Address</p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{address}, {city}, {state}, {country}.</p>
                  </div>
                  <div className="w-full space-y-4">
                    <h1 className="text-base dark:text-white font-semibold leading-4 text-gray-800">Pay with Stripe</h1>
                    <Elements stripe={stripePromise}>
                      <ElementsConsumer>
                        {({ stripe, elements }) => (
                          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement className="border py-2 pl-2" />
                            {error && <HelperText valid={false}>{error.message}</HelperText>}
                            <div className="flex justify-between py-4">
                              <button className="border px-4 py-1" onClick={previousStep} layout="outline" size="small">
                                Back
                              </button>
                              <button
                                className="bg-gray-800 px-4 py-1 text-white"
                                disabled={!stripe || isProcessing}
                                type="submit"
                                size="small"
                              >
                                {isProcessing || !stripe ? (
                                  <PulseLoader size={10} color={"#0a138b"} />
                                ) : (
                                  `Pay ${formatCurrency(((cartSubtotal * 90)/100)+50)}`
                                )}
                              </button>
                            </div>
                          </form>
                        )}
                      </ElementsConsumer>
                    </Elements>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
