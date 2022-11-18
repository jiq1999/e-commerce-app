import React, { useEffect, useState } from 'react';
import  {useDispatch, useSelector} from 'react-redux';
import { deleteDetails, filterByCategory, getProducts, orderByName, removePayment } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Pagination from './Pagination';
import Styles from './Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.products);
  const [order, setOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = allProducts.slice(firstProductIndex, lastProductIndex);

  const pagination = (pageNum) => {
    setCurrentPage(pageNum);
  }

  useEffect(() => {
    dispatch(getProducts());
    dispatch(deleteDetails());
    dispatch(removePayment());
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getProducts());
  }

  function handleCategoryFilter(e) {
    dispatch(filterByCategory(e.target.value));
  }

  function handleNameOrder(e) {
    dispatch(orderByName(e.target.value));
    setOrder(`Ordered by ${e.target.value}`);
    setCurrentPage(1);
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.box}>
        <div>
          <span>FILTER BY</span>
          <select onChange={e => handleCategoryFilter(e)}>
            <option value='all'>ALL</option>
            <option value='electronics'>ELECTRONICS</option>
            <option value='jewelery'>JEWELERY</option>
            <option value="men's clothing">MEN'S CLOTHING</option>
            <option value="women's clothing">WOMEN'S CLOTHING</option>
          </select>
        </div>
        <div>
          <span>ORDER BY</span>
          <select onChange={e => handleNameOrder(e)}>
            <option>NONE</option>
            <option value='nasc'>NAME ASC</option>
            <option value='ndesc'>NAME DESC</option>
            <option value='pasc'>PRICE ASC</option>
            <option value='pdesc'>PRICE DESC</option>
          </select>
        </div>
        <button onClick={e => handleClick(e)}>
          RELOAD
        </button>
      </div>
      <div className={Styles.cardContainer}>
        {
          currentProducts?.map(el => {
            return (
              <Link key={el.id} className={Styles.link} to={`/home/${el.id}`}>
                <Card name={el.name} image={el.image} price={el.price}/>
              </Link>
            )
          })
        }
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        allProducts={allProducts.length}
        pagination={pagination}
      />
    </div>
  )
}