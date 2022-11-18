import React from 'react';
import Styles from './Card.module.css';

export default function Card({ name, image, price }) {
  return (
    <div className={Styles.card}>
      <h3>{name}</h3>
      <img src={image} alt="img not found" />
      <h5>$ {price}</h5>
    </div>
  )
}