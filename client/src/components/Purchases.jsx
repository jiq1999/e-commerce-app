import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchases } from '../actions';
import { useAuth0 } from '@auth0/auth0-react';
import Styles from './Purchases.module.css';

export default function Cart() {
  const dispatch = useDispatch();
  const purchases = useSelector(state => state.purchases);
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [products, setProducts] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getPurchases(user.email));
    }
  }, [isAuthenticated, dispatch])

  useEffect(() => {
    if (purchases.length) {
      setProducts(purchases.map(el => el.product).flat());
    }
  }, [purchases])

  return (
    <div>
      <div className={Styles.container}>
        {
          products.length ?
          products.map(el => {
            return (
              <div key={el.id} className={Styles.item}>
                <h2>{el.product}</h2>
                <h4>AMOUNT: {el.amount}</h4>
                <img src={el.image} alt='Product' width='100px'/>
              </div>
            )
          }):
          <h1 className={Styles.title}>No Products</h1>
        }
      </div>
    </div>
  )
}