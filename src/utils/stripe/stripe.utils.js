import { loadStripe } from "@stripe/stripe-js";

// ensure the key is a string
export const stripePromise = loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);