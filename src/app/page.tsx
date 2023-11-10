"use client";
import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRequest } from "ahooks";

import { products } from "@/db";

import CheckoutForm from "./CheckoutForm";
import Loading from "./Loading";
import ProductList from "./ProductList";
import Nav from "./Nav";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const STEPS = [
  {
    key: "cart",
    title: "Cart",
  },
  {
    key: "settle",
    title: "Settle",
  },
];

export default function Home() {
  const [stepIndex, setStepIndex] = useState(0);
  const {
    data: clientSecret,
    run: refetchPaymentIntent,
    loading,
  } = useRequest(() =>
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: products.map(({ id }) => id),
      }),
    })
      .then((res) => res?.json?.())
      .then((data) => data?.clientSecret)
  );

  console.log({ clientSecret });

  const options = {
    clientSecret,
    // appearance:{},
  };

  const step = STEPS[stepIndex]?.key;
  const stepNext = useCallback(() => {
    setStepIndex((old) =>
      old < STEPS.length - 1 ? old + 1 : STEPS.length - 1
    );
  }, [setStepIndex]);
  return (
    <main className="">
      <Nav steps={STEPS} current={step} />
      {stepIndex === 0 && (
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <ProductList />
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            {loading && <Loading />}
            {!loading && clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm
                  refetchPaymentIntent={refetchPaymentIntent}
                  stepNext={stepNext}
                />
              </Elements>
            )}
          </div>
        </div>
      )}
      {stepIndex === 1 && (
        <div className="flex justify-center items-center text-6xl font-semibold py-32">
          Pay Success!!!
        </div>
      )}
    </main>
  );
}
