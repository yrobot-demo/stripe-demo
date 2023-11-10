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
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="relative mt-4">
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
          {loading && <CoverLoading />}
        </div>
        <button
          className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          disabled={loading || !stripe || !elements}
          id="submit"
          type="submit"
        >
          {loading ? "Paying..." : "Pay"}
        </button>
      </form>

      <div className="fixed bottom-0 left-0 right-0 border-t-2 border-gray-200 bg-white z-10 pb-8 pt-4 lg:px-20 xl:px-32 grid grid-cols-3 gap-8">
        {[
          {
            title: "卡号",
            content: (
              <div className="space-y-2">
                {[
                  { label: "付款成功", card: "4242424242424242" },
                  { label: "付款需要验证", card: "4000002500003155" },
                  { label: "付款被拒绝", card: "4000000000009995" },
                ].map(({ label, card }) => (
                  <div className="flex items-center" key={card}>
                    <div className="mr-auto">{label}</div>
                    <div className="">{card}</div>
                  </div>
                ))}
              </div>
            ),
          },
          {
            title: "有效期",
            content: <div className="">1224</div>,
          },
          {
            title: "CVC",
            content: <div className="">135</div>,
          },
        ].map(({ title, content }) => (
          <div className="" key={title}>
            <div className="text-xl font-bold mb-4">{title}</div>
            {content}
          </div>
        ))}
      </div>
    </>
  );
}
