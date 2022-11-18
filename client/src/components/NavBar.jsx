import React from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import  {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { refreshCart, mobileMenuState } from '../actions';
import Logo from '../img/logo.png';
import Styles from './NavBar.module.css';
import { BiUserCircle, BiCartAlt } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { VscChromeClose } from 'react-icons/vsc';

export default function NavBar() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const menuMobile = useSelector(state => state.mobileMenu);
  const [cartAmount, setCartAmount] = useState('');
  const { isAuthenticated, isLoading } = useAuth0();
  const [dropdown, setDropdown] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(false);

  useEffect(() => {
    if (menuMobile === false) {
      setMobileMenu(false);
      setMobileSubMenu(false);
      dispatch(mobileMenuState(true));
    }
  }, [menuMobile, dispatch])

  useEffect(() => {
    setCartAmount(Object.keys(cart).length)
  }, [cart])

  useEffect(() => {
    dispatch(refreshCart());
  }, [dispatch])

  function handleOnClick() {
    if (mobileMenu === false) {
      setMobileMenu(true);
    } else {
      setMobileMenu(false);
    }
  }

  function handleOnClickMenu() {
    if (mobileSubMenu === false) {
      setMobileSubMenu(true);
    } else {
      setMobileSubMenu(false);
    }
  }

  function handleOnClickRedirect() {
    setMobileMenu(false);
    setMobileSubMenu(false);
  }

  if (window.innerWidth > 768) {
    return (
      <div>
        <nav className={Styles.container}>
          <div>
            <Link to='/' className={Styles.title}>
              <img
                id='logo'
                src={Logo}
                width='40px'
                height='40px'
                alt=''
              />
              <span>
                E-COMMERCE
              </span>
            </Link>
          </div>
          <SearchBar/>
          <div className={Styles.buttons}>
            {
              !isLoading && isAuthenticated ?
              <button className={Styles.button} onMouseOver={() => setDropdown(true)} /* onMouseOut={() => setDropdown(false)} */><BiUserCircle/></button>
              :
              <LoginButton/>
            }
            <Link to="/cart">
              <button className={Styles.button}><BiCartAlt/></button>
            </Link>
          </div>
        </nav> 
        {
          dropdown ? 
          <div className={Styles.subNav}  onMouseOver={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
            <Link to="/product">
              <button className={Styles.subNavButton}>ADD PRODUCT</button>
            </Link>
            <Link to='/purchases'>
              <button className={Styles.subNavButton}>PURCHASES</button>
            </Link>
            <LogoutButton/>
          </div> : 
          null
        }
      </div>
    )
  } else {
    return (
      <div>
      <nav className={Styles.container}>
        <div>
          <Link to='/' className={Styles.title}>
            <img
              id='logo'
              src={Logo}
              width='40px'
              height='40px'
              alt=''
            />
            <span>
              E-COMMERCE
            </span>
          </Link>
        </div>
        <button onClick={handleOnClick} className={Styles.burger}>
          {
            mobileMenu === true ?
            <VscChromeClose/> :
            <GiHamburgerMenu/>
          }
        </button>
      </nav>
      <div className={mobileMenu === true ? Styles.burgerOptions : Styles.notVisible}>
          <div className={Styles.buttons}>
            {
              !isLoading && isAuthenticated ?
              <div className={Styles.profile}>
                <div className={Styles.option} onClick={handleOnClickMenu}>
                  <span>PROFILE</span>
                  <span className={Styles.optionIcon}><BiUserCircle/></span>
                </div>
                <div className={mobileSubMenu === true ? Styles.mobileSubMenu : Styles.notVisible}>
                  <Link onClick={handleOnClickRedirect} className={Styles.subNavButton} to="/product">
                    <span>ADD PRODUCT</span>
                  </Link>
                  <Link onClick={handleOnClickRedirect} className={Styles.subNavButton} to='/purchases'>
                    <span>PURCHASES</span>
                  </Link>
                  <LogoutButton/>
                </div>
              </div>
              :
              <LoginButton/>
            }
            <hr/>
            <Link onClick={handleOnClickRedirect} className={Styles.option} to="/cart">
              <span>CART</span>
              <span className={Styles.optionIcon}><BiCartAlt/></span>
            </Link>
            <hr/>
          </div>
          <SearchBar/>
        </div>
      </div>
    )
  }
}