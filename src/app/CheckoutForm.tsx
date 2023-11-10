"use client";
import { products } from "@/db";
import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CoverLoading } from "./Loading";

export default function CheckoutForm({
  refetchPaymentIntent,
  stepNext,
}: {
  refetchPaymentIntent: () => void;
  stepNext: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const res = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    console.log(res);

    if (res.error) {
      alert(res.error.message);
      // refetchPaymentIntent();
    } else {
      if (res.paymentIntent.status === "succeeded") {
        stepNext();
      } else {
        alert(res.paymentIntent.status);
      }
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" className="relative" onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Product Count</p>
          <p className="font-semibold text-gray-900">{products.length}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Discount</p>
          <p className="font-semibold text-gray-900">$0.00</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">
          ${products.reduce((pre = 0, { price }) => pre + price, 0)}
        </p>
      </div>
      <button
        className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
        disabled={loading || !stripe || !elements}
        id="submit"
        type="submit"
      >
        {loading ? "Paying..." : "Pay"}
      </button>
      {loading && <CoverLoading />}
    </form>
  );
}
