import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getDetails } from '../actions';
import Styles from './Detail.module.css';

export default function Detail() {
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector(state => state.productDetails);
  //const cart = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getDetails(params.id));
  }, [dispatch, params.id])

  function handleOnClick() {
    dispatch(addToCart(params.id))
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        {
          product.length > 0 ?
          <div>
            <h1>{product[0].name}</h1>
            <div className={Styles.content}>
              <div className={Styles.col1}>
                {
                  product[0].createdInDB ?
                  <p>
                    {
                      product[0].categories.map(el => {
                        return (
                          <label className={Styles.category}> {el.name}</label>
                        )
                      })
                    }
                  </p> :
                  <p className={Styles.category}>{product[0].category}</p>
                }
                <p>{product[0].description}</p>
                <h3>$ {product[0].price}</h3>
                <div className={Styles.cartButton}>
                  <p>STOCK: {product[0].stock}</p>
                  <Link to='/cart'>
                    <button onClick={handleOnClick}>ADD TO CART</button>
                  </Link>
                </div>
              </div>
              <div className={Styles.col2}>
                <img src={product[0].image} alt='product'/>
              </div>
            </div>
          </div> :
          <h2>LOADING...</h2>
        }
      </div>
    </div>
  )
}