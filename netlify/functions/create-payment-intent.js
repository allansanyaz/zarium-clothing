require("dotenv").config();
// call stripe and pass it the secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async(event) => {
    try {
        // to make a payment intent that are a couple of things we have to know
        /*
        currency, payment method, amount
        */
       const { amount } = JSON.parse(event.body);
        // create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent }),
        };

    } catch(error) {
        console.log({ error });

        return {
            statusCode: 400,
            body: JSON.stringify({ error }),
        }
    };
}
