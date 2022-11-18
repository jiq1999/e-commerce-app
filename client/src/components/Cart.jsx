import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOrSub, getProducts, removeFromCart } from '../actions';
import Styles from './Cart.module.css';
import { IoClose, IoAdd, IoRemove } from 'react-icons/io5';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const allProducts = useSelector(state => state.products);
  const [products, setProducts] = useState('');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])

  useEffect(() => {
    let data = [];
    if (cart) {
      cart.forEach(el => {
        allProducts.forEach(elem => {
          if (elem.id == el.id) {
            data.push({...elem, amount: el.amount});
          }
        })
      })
    }
    setProducts(data);
  }, [allProducts, cart])

  function handleOnClick(id, symbol) {
    dispatch(addOrSub([id, symbol]));
  }

  function handleRemove(id) {
    dispatch(removeFromCart(id));
  }

  return (
    <div>
      {
        products.length ?
        <div className={Styles.container}>
          {
            products.map(el => {
              return (
                <div key={el.id} className={Styles.item}>
                  <button className={Styles.xButton} onClick={() => handleRemove(el.id)}><IoClose/></button>
                  <h2>{el.name}</h2>
                  <img src={el.image} alt='product' width='100px'/>
                  <h3>$ {el.price}</h3>
                  <p>STOCK: {el.stock}</p>
                  <div className={Styles.amount}>
                    <button className={Styles.amountButton} disabled={!(el.amount > 1)} onClick={() => handleOnClick(el.id, '-')}><IoRemove/></button>
                    <h4>{el.amount}</h4>
                    <button className={Styles.amountButton} disabled={el.amount >= el.stock} onClick={() => handleOnClick(el.id, '+')}><IoAdd/></button>
                  </div>
                </div>
              )
            })
          }
          <Link to='/payment'>
            <button className={Styles.buyButton}>BUY</button>
          </Link>
        </div> :
        <h1 className={Styles.title}>No Products</h1>
      }
    </div>
  )
}