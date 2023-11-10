import Stripe from "stripe";
import { products } from "@/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  const { ids = [] } = await request.json();
  const amount =
    ids?.reduce((acc = 0, id: string) => {
      const product = products.find((product) => product.id === id);
      return product ? acc + product.price * 100 : acc;
    }, 0) || 99;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "USD",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}
