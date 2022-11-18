import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postProduct, getCategories, setTrigger } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../firebase/config';
import { useAuth0 } from '@auth0/auth0-react';
import Styles from './ProductCreate.module.css';
import PopUp from './PopUp';

/* function validate(input) {
  let errors = {};
  if(!input.name) {
    errors.name = 'NAME REQUIRED'
  }
   if (!input.description) {
    errors.description = 'DESCRIPTION REQUIRED'
  }
  return errors;
} */

export default function ProductCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(state => state.categories);
  const [auth, setAuth] = useState(false);
  const { isAuthenticated, isLoading, user, loginWithPopup } = useAuth0();
  const [input, setInput] = useState({
    name: '',
    stock: '',
    price: '',
    rating: '',
    image: '',
    description: '',
    category: []
  })
  //const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [buttonState, setButtonState] = useState(true);
  const [finalMsg, setFinalMsg] = useState('');

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    /* setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    })) */
  }

  function handleCheck(e) {
    if(e.target.checked) {
      setInput({
        ...input,
        category: [...input.category, e.target.value]
      })
    } else if (!e.target.checked) {
      setInput({
        ...input,
        category: input.category.filter(el => el !== e.target.value)
      })
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (file) {
        const url = await uploadFile(file);
        dispatch(postProduct({
          ...input,
          image: url
        }));
        setFinalMsg('PRODUCT UPLOADED');
        setInput({
          name: '',
          stock: '',
          price: '',
          rating: '',
          image: '',
          description: '',
          category: ''
        })
        dispatch(setTrigger());
      } else {
        dispatch(postProduct({
          ...input,
          image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-3913f.appspot.com/o/default.png?alt=media&token=b40b0e23-7440-4af6-aa5c-100c04077244'
        }));
        setFinalMsg('PRODUCT UPLOADED');
        setInput({
          name: '',
          stock: '',
          price: '',
          rating: '',
          image: '',
          description: '',
          category: ''
        })
        dispatch(setTrigger());
      }
    } catch(err) {
      console.log(err);
      setFinalMsg('UPLOAD FAILED');
      dispatch(setTrigger());
    }
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setAuth(true);
    }
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    let obj = input;
    delete obj.image;
    Object.values(obj).filter(el => el.length).length !== 6 ? setButtonState(true) : setButtonState(false)
  }, [input])

  if (auth === true) {
    return (
      <div className={Styles.container}>
        <div className={Styles.card}>
          <h1>ADD PRODUCT</h1>
          <form onSubmit={e => handleSubmit(e)}>
            <div className={Styles.row1}>
              <div className={Styles.element}>
                <label>NAME:</label>
                <input
                  className={Styles.input}
                  type='text'
                  value={input.name}
                  name='name'
                  onChange={e => handleChange(e)}
                />
                {/* {
                  errors.name ? <label>{errors.name}</label> : null
                } */}
              </div>
              <div className={Styles.element}>
                <label>STOCK:</label>
                <input
                  className={Styles.input}
                  type='number'
                  value={input.stock}
                  name='stock'
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className={Styles.element}>
                <label>PRICE:</label>
                <input
                  className={Styles.input}
                  type='number'
                  value={input.price}
                  name='price'
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className={Styles.element}>
                <label>RATING:</label>
                <input
                  className={Styles.input}
                  type='number'
                  value={input.rating}
                  name='rating'
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
            <div className={Styles.row1}>
              <div className={Styles.element}>
                <label>DESCRIPTION:</label>
                <textarea
                  type='text'
                  value={input.description}
                  name='description'
                  onChange={e => handleChange(e)}
                />
                {/* {
                  errors.description ? <label>{errors.description}</label> : null
                } */}
              </div>
              <div className={Styles.element}>
                <label>CATEGORIES:</label>
                <div className={Styles.categories}>
                  {
                    categories?.map(el => {
                      return (
                        <div key={el.id} className={Styles.category}>
                          <input
                            type='checkbox'
                            value={el.name}
                            name={el.name}
                            onChange={e => handleCheck(e)}
                          />
                          {el.name}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className={Styles.element}>
                <label>IMAGE:</label>
                <input className={Styles.fileInput} type='file' accept="image/png, image/jpeg" onChange={e => setFile(e.target.files[0])}/>
              </div>
            </div>
            <button className={Styles.uploadButton} disabled={buttonState} type='submit'>UPLOAD</button>
          </form>
          <PopUp>
            <h3 className={Styles.popupText}>{finalMsg}</h3>
          </PopUp>
        </div>
      </div>
    )
  } else {
    return (
      <div className={Styles.container}>
        <div className={Styles.card}>
          <h1>HI! PLEASE LOG IN TO ADD A PRODUCT</h1>
          <button className={Styles.uploadButton} onClick={() => loginWithPopup()}>LOG IN</button>
        </div>
      </div>
    )
  }
}