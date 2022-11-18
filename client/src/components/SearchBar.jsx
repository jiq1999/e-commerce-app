import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductsName, mobileMenuState } from '../actions';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import Styles from './SearchBar.module.css';

export default function SearchBar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getProductsName(name));
    dispatch(mobileMenuState(false));
    setName('');
    navigate('/search');
  }

  return(
    <div className={Styles.searchBar}>
      <input
        type='text'
        value={name}
        placeholder='Search for a Product'
        onChange={e => handleInputChange(e)}
      />
      <button type='submit' onClick={e => handleSubmit(e)} ><IoSearchOutline/></button>
    </div>
  )
}