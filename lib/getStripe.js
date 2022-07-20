import { loadStripe } from "@stripe/stripe-js";

let stripe;

export default async function getStripe() {
  if (!stripe) {
    stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripe;
}