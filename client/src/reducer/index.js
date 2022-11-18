const initialState = {
  products: [],
  productsCopy: [],
  productsSearch: [],
  categories: [],
  countries: [],
  states: [],
  productDetails: [],
  paymentData: [],
  cart: [],
  purchases: [],
  mobileMenu: true,
  trigger: false
}

function rootReducer (state=initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        productsCopy: action.payload
      }
    case 'GET_PRODUCTS_NAME':
      return {
        ...state,
        productsSearch: action.payload,
        productsCopy: action.payload
      }
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      }
    case 'GET_COUNTRIES':
      return {
        ...state,
        countries: action.payload
      }
    case 'GET_DETAILS':
      return {
        ...state,
        productDetails: action.payload
      }
    case 'DELETE_DETAILS':
      return {
        ...state,
        productDetails: []
      }
    case 'FILTER_BY_CATEGORY':
      const productsFiltered = action.payload === 'all' ? state.productsCopy : state.productsCopy.filter(el => el.category === action.payload);
      return {
        ...state,
        products: productsFiltered
      }
    case 'FILTER_BY_CATEGORY_SEARCH':
      const productsFilteredSearch = action.payload === 'all' ? state.productsCopy : state.productsCopy.filter(el => el.category === action.payload);
      return {
        ...state,
        productsSearch: productsFilteredSearch
      }
    case 'ORDER_BY_NAME':
      switch (action.payload) {
        case 'nasc':
          let orderNameAsc = state.products.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            } else if (a.name < b.name) {
              return -1;
            } else {
              return 0;
            }
          })
          return {
            ...state,
            products: orderNameAsc
          }
        case 'ndesc':
          let orderNameDesc = state.products.sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            } else if (a.name < b.name) {
              return 1;
            } else {
              return 0;
            }
          })
          return {
            ...state,
            products: orderNameDesc
          }
        case 'pasc':
          let orderPriceAsc = state.products.sort((a, b) => {
            if (a.price > b.price) {
              return 1;
            } else if (a.price < b.price) {
              return -1;
            } else {
              return 0;
            }
          })
          return {
            ...state,
            products: orderPriceAsc
          }
        case 'pdesc':
          let orderPriceDesc = state.products.sort((a, b) => {
            if (a.price > b.price) {
              return -1;
            } else if (a.price < b.price) {
              return 1;
            } else {
              return 0;
            }
          })
          return {
            ...state,
            products: orderPriceDesc
          }
        default:
          return {
            ...state
          }
      }
    case 'POST_PRODUCT':
      return {
        ...state
      }
    case 'POST_PAYMENT':
      return {
        ...state,
        paymentData: action.payload
      }
    case 'REMOVE_PAYMENT':
      return {
        ...state,
        paymentData: ''
      }  
    case 'POST_PURCHASE':
      return {
        ...state
      }
    case 'ADD_TO_CART':
      if (window.localStorage.getItem('cart') === null || window.localStorage.getItem('cart') === '[]') {
        window.localStorage.setItem('cart', JSON.stringify([{id: action.payload, amount: 1}]));
        return {
          ...state,
          cart: [
            {id: action.payload, amount: 1}
          ]
        }
      } else if (!(JSON.parse(window.localStorage.getItem('cart')).find(el => el.id == action.payload))) {
        let localCart = JSON.parse(window.localStorage.getItem('cart'));
        window.localStorage.setItem('cart', JSON.stringify([...localCart, {id: action.payload, amount: 1}]));
        return {
          ...state,
          cart: [
            ...localCart,
            {id: action.payload, amount: 1}
          ]
        }
      } else {
        return {
          ...state
        }
      }
    case 'REMOVE_FROM_CART':
      if (window.localStorage.getItem('cart').length) {
        let localCart2 = JSON.parse(window.localStorage.getItem('cart'));
        window.localStorage.setItem('cart', JSON.stringify(localCart2.filter(el => el.id != action.payload)))
        return {
          ...state,
          cart: state.cart.filter(el => el.id != action.payload)
        }
      }
    case 'REFRESH_CART':
      if (!(window.localStorage.getItem('cart') === null) && window.localStorage.getItem('cart').length) {
        let localCart3 = JSON.parse(window.localStorage.getItem('cart'));
        return {
          ...state,
          cart: [
            ...localCart3
          ]
        }
      } else {
        return {
          ...state
        }
      }
    case 'ADD_OR_SUB':
      if (action.payload[1] === '+') {
        let localCart4 = JSON.parse(window.localStorage.getItem('cart')).map(el => el.id == action.payload[0] ? { id: el.id, amount: ++el.amount } : el);
        window.localStorage.setItem('cart', JSON.stringify(localCart4));
        return {
          ...state,
          cart: state.cart.map(el => el.id == action.payload[0] ? { id: el.id, amount: ++el.amount } : el)
        }
      } else {
        let localCart5 = JSON.parse(window.localStorage.getItem('cart')).map(el => el.id == action.payload[0] ? { id: el.id, amount: --el.amount } : el);
        window.localStorage.setItem('cart', JSON.stringify(localCart5)); 
        return {
          ...state,
          cart: state.cart.map(el => el.id == action.payload[0] ? { id: el.id, amount: --el.amount } : el)
        }
      }
    case 'REMOVE_CART': {
      window.localStorage.removeItem('cart');
      return {
        ...state,
        cart: []
      }
    }
    case 'GET_PURCHASES':
      return {
        ...state,
        purchases: action.payload
      }
    case 'MOBILE_MENU': 
      return {
        ...state,
        mobileMenu: action.payload
      }
    case 'SET_TRIGGER':
      return {
        ...state,
        trigger: state.trigger ? false : true
      }
    default:
      return state;
  }
}

export default rootReducer;