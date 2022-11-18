import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51Le5DzE5V5AOBrk19uMK4KOyDO1OsmhPhpD84HuuHpnhbQLlasIh7eae9fJ2XzBbiOd3nxWoqPugJyRbIKikb9ff00OhXjdQuO');

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  )
}