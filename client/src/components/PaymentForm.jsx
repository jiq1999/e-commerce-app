import React, { useEffect, useState } from 'react';
import  {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getProducts, getCountries, postPayment, postPurchase, removeCart, setTrigger } from '../actions';
import Select from 'react-select';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import { useAuth0 } from '@auth0/auth0-react';
import Styles from './PaymentForm.module.css';
import PopUp from './PopUp';
import LoadingIcons from 'react-loading-icons'

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const paymentData = useSelector(state => state.paymentData);
  const countriesData = useSelector(state => state.countries);
  const products = useSelector(state => state.products);
  const cart = useSelector(state => state.cart);
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    phoneNum: '',
    country: '',
    stateProvince: '',
    city: '',
    address: ''
  })
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [buttonState, setButtonState] = useState(true);
  const [cartProducts, setCartPrducts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, isLoading, user, loginWithPopup } = useAuth0();

  async function handleSubmit(e) {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })
    if (!error) {
      try {
        setLoading(true);
        setButtonState(true);
        dispatch(postPayment({
          id: paymentMethod.id,
          amount: parseInt(totalPrice * 100)
        }));
        elements.getElement(CardElement).clear();
      } catch(error) {
        console.log(error);
      }
    }
  }

  function handleChange(e) {
    if (e && e.target) {
      setInput({
        ...input,
        [e.target.name] : e.target.value
      })
    } else if (e && typeof e === 'string') {
      setInput({
        ...input,
        phoneNum : e
      })
    } else if (e && e.type) {
      setInput({
        ...input,
        [e.type]: e.value
      })
      if (e.type === 'country') {
        setStates(countriesData.filter(el => el.country === e.value)[0].provinces.map(el =>  { return { value: el, label: el, type: 'stateProvince' } }))
      }
    }
  }

  useEffect(() => {
    if (paymentData.length) {
      dispatch(postPurchase({
        user: user.email,
        ...input,
        product: cartProducts,
        income: totalPrice,
        state: paymentData
      }))
      dispatch(setTrigger());
      dispatch(removeCart());
    }
  }, [paymentData, dispatch])

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getProducts());
  }, [dispatch])

  useEffect(() => {
    setCountries(countriesData.map(el => {
      return {
        type: 'country',
        label: el.country,
        value: el.country
      }
    }))
  }, [countriesData])

  useEffect(() => {
    Object.values(input).filter(el => el === '').length ? setButtonState(true) : setButtonState(false)
  }, [input])

  useEffect(() => {
    if (cart.length && products.length) {
      const cartElements = cart.map(el => products.filter(elem => elem.id == el.id)).flat();
      setCartPrducts(cartElements.map(el => { 
        return { 
          id: el.id, 
          product: el.name, 
          amount: cart.find(elem => elem.id == el.id).amount, 
          price: el.price, 
          image: el.image 
        } 
      }))
      const productsPrices = cartElements.map(el => el.price * cart.find(elem => elem.id == el.id).amount);
      setTotalPrice(productsPrices.reduce((a, b) =>  a + b ).toFixed(2));
    }
  }, [products, cart])

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setAuth(true);
    }
  }, [isAuthenticated, isLoading])

  if (auth === true) {
    return (
      <div className={Styles.container}>
        <div className={Styles.card}>
          <h2>PAYMEMENT: ${totalPrice}</h2>
          <form onSubmit={e => handleSubmit(e)} >
            <div className={Styles.row1}>
              <div className={Styles.element}>
                <label>FIRST NAME:</label>
                <input 
                  type='text'
                  value={input.firstName}
                  name='firstName'
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className={Styles.element}>
                <label>LAST NAME:</label>
                <input 
                  type='text'
                  value={input.lastName}
                  name='lastName'
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className={Styles.element}>
                <label>PHONE NUM:</label>
                <PhoneInput
                  value={input.phoneNum}
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
            <div className={Styles.row1}>
              <div className={Styles.element}>
                <label>COUNTRY:</label>
                <Select
                  className={Styles.select}
                  options={countries}
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className={Styles.element}>
                <label>STATE/PROVINCE:</label>
                <Select
                  className={Styles.select}
                  options={states}
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className={Styles.element}>
                <label>CITY:</label>
                <input 
                  type='text'
                  value={input.city}
                  name='city'
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className={Styles.element}>
                <label>ADDRESS:</label>
                <input 
                  type='text'
                  value={input.address}
                  name='address'
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
            <div className={Styles.row2}>
              <CardElement />
            </div>
            <button className={Styles.buyButton} disabled={buttonState}>
              { 
                loading ? 
                <LoadingIcons.Oval className={Styles.loadingButton} stroke="#324A5E"/> : 
                'BUY'
              }
            </button>
          </form>
          <PopUp>
            <h3 className={Styles.popupText}>{paymentData}</h3>
          </PopUp>
        </div>
      </div>
    )
  } else {
    return (
      <div className={Styles.container}>
        <div className={Styles.card}>
          <h1>HI! PLEASE LOG IN TO BUY</h1>
          <button className={Styles.buyButton} onClick={() => loginWithPopup()}>LOG IN</button>
        </div>
      </div>
    )
  }
}