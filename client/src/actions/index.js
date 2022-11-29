import axios from 'axios';

const server = 'https://e-commerce-back-production.up.railway.app';

export function getProducts() {
  return async function(dispatch) {
    const json = await axios.get(`${server}/products`);
    return dispatch({
      type: 'GET_PRODUCTS',
      payload: json.data
    })
  }
}

export function getProductsName(payload) {
  return async function(dispatch) {
    const json = await axios.get(`${server}/products?name=${payload}`);
    try {
      return dispatch({
        type: 'GET_PRODUCTS_NAME',
        payload: json.data
      })
    } catch(err) {
      console.log(err);
      return err;
    }
  }
}

export function getCategories() {
  return async function(dispatch) {
    const json = await axios.get(`${server}/categories`);
    return dispatch({
      type: 'GET_CATEGORIES',
      payload: json.data
    })
  }
}

export function getCountries() {
  return async function(dispatch) {
    const json = await axios.get(`${server}/countries`);
    return dispatch({
      type: 'GET_COUNTRIES',
      payload: json.data
    })
  }
}

export function getDetails(id) {
  return async function(dispatch) {
    try {
      const json = await axios.get(`${server}/products/${id}`);
      return dispatch({
        type: 'GET_DETAILS',
        payload: json.data
      })
    } catch(err) {
      console.log(err);
    }
  }
}

export function deleteDetails() {
  return {
    type: 'DELETE_DETAILS'
  }
}

export function filterByCategory(payload) {
  return {
    type: 'FILTER_BY_CATEGORY',
    payload
  }
}

export function filterByCategorySearch(payload) {
  return {
    type: 'FILTER_BY_CATEGORY_SEARCH',
    payload
  }
}

export function orderByName(payload) {
  return {
    type: 'ORDER_BY_NAME',
    payload
  }
}

export function postProduct(payload) {
  return async function(dispatch) {
    const response = await axios.post(`${server}/product`, payload);
    console.log(response);
    return response;
  }
}

export function postPayment(payload) {
  return async function(dispatch) {
    const response = await axios.post(`${server}/payment`, payload);
    return dispatch({
      type: 'POST_PAYMENT',
      payload: response.data
    })
  }
}

export function removePayment() {
  return {
    type: 'REMOVE_PAYMENT'
  }
}

export function postPurchase(payload) {
  return async function(dispatch) {
    const response = await axios.post(`${server}/purchase`, payload);
    return dispatch({
      type: 'POST_PURCHASE',
      payload: response.data
    })
  }
}

export function addToCart(payload) {
  return {
    type: 'ADD_TO_CART',
    payload
  }
}

export function removeFromCart(payload) {
  return {
    type: 'REMOVE_FROM_CART',
    payload
  }
}

export function refreshCart() {
  return {
    type: 'REFRESH_CART'
  }
}

export function addOrSub(payload) {
  return {
    type: 'ADD_OR_SUB',
    payload
  }
}

export function removeCart() {
  return {
    type: 'REMOVE_CART'
  }
}

export function getPurchases(payload) {
  return async function(dispatch) {
    const response = await axios.get(`${server}/purchases?user=${payload}`);
    return dispatch({
      type: 'GET_PURCHASES',
      payload: response.data
    })
  }
}

export function mobileMenuState(payload) {
  return {
    type: 'MOBILE_MENU',
    payload
  }
}

export function setTrigger() {
  return {
    type: 'SET_TRIGGER'
  }
}