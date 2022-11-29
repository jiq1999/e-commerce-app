import React from 'react';
import Styles from './Pagination.module.css';

export default function Pagination({ productsPerPage, allProducts, pagination }) {
  let pageNumbers = [];
  
  for(var i = 1; i <= Math.ceil(allProducts/productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={Styles.paginationCont}>
      {
        pageNumbers?.map(num => {
          return (
            <div onClick={() => pagination(num)} className={Styles.pagination} key={num}>
              <span>{num}</span>
            </div>
          )
        })
      }
    </div>
  )
}