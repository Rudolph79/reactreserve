import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Button, Segment, Divider } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';

const CartSummary = ({ products, handleCheckout, success }) => {
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [isCartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setStripeAmount(stripeTotal);
    setCartAmount(cartTotal);
    setCartEmpty(products.length === 0);
  }, [products]);

  return (
    <Segment clearing size="large">
      <strong>Sous total:</strong> { cartAmount } €
      <StripeCheckout
        name="React Reserve"
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : ""}
        currency="EUR"
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        token={handleCheckout}
        triggerEvent="onClick"
        stripeKey="pk_test_gqaMtfMiu1pGVuIGiuUFK1jQ00OjBce1ZG"
      >
        <Button icon="cart" disabled={isCartEmpty || success} color="teal" floated="right" content="Valider" />
      </StripeCheckout>
    </Segment>
  );
}

export default CartSummary;
