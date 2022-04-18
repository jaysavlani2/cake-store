import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
import AddressForm from "components/AddressForm";
import PaymentForm from "components/PaymentForm";
import { useHistory, useLocation } from "react-router";
import { useCart } from "context/CartContext";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [addressData, setAddressData] = useState();
  const { state } = useLocation();
  const history = useHistory();
  const { cartData } = useCart();

  useEffect(() => {
    if (!state?.fromCartPage) {
      return history.push("/");
    }

    if (cartData.items.length === 0) {
      return history.push("/");
    }
  }, [cartData, history, state]);

  const nextStep = () =>
    setActiveStep((prevStep) => setActiveStep(prevStep + 1));
  const previousStep = () =>
    setActiveStep((prevStep) => setActiveStep(prevStep - 1));

  const next = (data) => {
    setAddressData(data);
    nextStep();
  };
  return (
    <Layout>
      <div className="text-gray-700 bg-gray-100 mt-12 md:mt-16 lg:mt-16 mx-auto px-4 md:px-0 flex-grow h-full w-full">
        {activeStep === 0 ? (
          <div className="lg:mx-56">
            <div className="flex flex-col justify-center items-center mt-20">
              <AddressForm next={next} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-20">
            <PaymentForm
              nextStep={nextStep}
              previousStep={previousStep}
              addressData={addressData}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
