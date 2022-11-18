import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTrigger } from "../actions";
import Styles from './PopUp.module.css';

export default function PopUp(props) {
  const dispatch = useDispatch();
  const globalTrigger = useSelector(state => state.trigger);

  function handleOnClick() {
    dispatch(setTrigger());
  }

  return (globalTrigger) ? (
    <div className={Styles.popup}>
      <div className={Styles.popupCont}>
        { props.children }
        <Link to='/'>
          <button className={Styles.button} onClick={handleOnClick}>HOME</button>
        </Link>
      </div>
    </div>
  ) : ''
}