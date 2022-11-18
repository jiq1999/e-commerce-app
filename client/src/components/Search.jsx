import React, { useEffect, useState } from 'react';
import  {useDispatch, useSelector} from 'react-redux';
import { deleteDetails, filterByCategorySearch } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Pagination from './Pagination';
import Styles from './Home.module.css';

export default function Search() {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.productsSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = allProducts.slice(firstProductIndex, lastProductIndex);

  const pagination = (pageNum) => {
    setCurrentPage(pageNum);
  }

  useEffect(() => {
    dispatch(deleteDetails());
  }, [dispatch])

  function handleCategoryFilter(e) {
    dispatch(filterByCategorySearch(e.target.value));
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
      </div>
      <div className={Styles.cardContainer}>
        {
          currentProducts?.map(el => {
            return (
              <Link key={el.id} className={Styles.link} to={`/home/${el.id}`}>
                <Card name={el.name} image={el.image} price={el.price} />
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