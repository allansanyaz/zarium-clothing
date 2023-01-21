import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles";
import { cartSelector } from "../../store/cart/cart.selector";
import PaymentForm from "../../components/payment-form/payment-form.component";
import { stripePromise } from "../../utils/stripe/stripe.utils";
import { Elements } from '@stripe/react-stripe-js';

const Checkout = () => {

	// load the redux states
	const { cartItems, totalCartPrice } = useSelector(cartSelector);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock as={'span'}>
					Product
				</HeaderBlock>
				<HeaderBlock as={'span'}>
					Description
				</HeaderBlock>
				<HeaderBlock as={'span'}>
					Quantity
				</HeaderBlock>
				<HeaderBlock as={'span'}>
					Price
				</HeaderBlock>
				<HeaderBlock as={'span'}>
					Total
				</HeaderBlock>
				<HeaderBlock as={'span'}>
					Remove
				</HeaderBlock>
			</CheckoutHeader>
			{
				cartItems.map((cartItem) => (
					<CheckoutItem
						key={cartItem.id}
						product={cartItem}
					/>
				))
			}
			<Total as={'span'}>Grand Total: ${totalCartPrice}</Total>

            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
            
		</CheckoutContainer>
	);
}

export default Checkout;
