import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartSelector} from "../../store/cart/cart.selector";
import { userSelector } from "../../store/user/user.selector";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { clearCart } from "../../store/cart/cart.slice";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const PaymentForm = () => {
    // create navigation item
    const navigate = useNavigate();
    // create dispatch item
    const dispatch = useDispatch();
    // get the cart items total price from the redux store
    const { totalCartPrice } = useSelector(cartSelector);
    // get the current user from the redux store
    const { currentUser } = useSelector(userSelector);

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    
    const paymentHandler = async (event) => {
        event.preventDefault();

        // check and see if the user is signed in
        if(!currentUser) {
            // navigate to sign in page if the're not signed in
            navigate('/sign-in');
            // exit the function
            return;
        }

        // exit if there is no strip instance or elements instance
        if(!stripe || !elements) {
            return;
        }

        // set the processing payment to true
        setIsProcessingPayment(true);

        // compute the total price of the cart items stripe expects all values in cents
        const totalPriceCents = parseInt(totalCartPrice) * 100;

        // create a payment intent (so that stripe knows that there is a payment coming)
        // could also use axios
        // note that the amount is in cents so multiply by 100 ideally cart price * 100
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ 
                amount: totalPriceCents 
            })
        })
        .then(res => res.json())
        .catch(err => console.log(err));

        // the client secret is the key to that attaches the payment to the actual payment intentuon
        // handshake token that confirms that the payment is connected to the payment intent

        // const { client_secret } = response.paymentIntent;
        const { paymentIntent: {client_secret} } = response;

        // get the payment result and conform the payment
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName: 'Guest',
                }
            }
        });

        // set the processing payment to false
        setIsProcessingPayment(false);

        // check if the payment was successful
        if(paymentResult.error) {
            alert('Error: ', paymentResult.error.message);
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment successful');
                // in most cases then you want to clear the cart if succerssful
                dispatch(clearCart());
            }
        }

    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                    <CardElement/>
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>
                    Pay Now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;
