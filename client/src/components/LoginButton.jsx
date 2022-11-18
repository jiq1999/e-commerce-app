import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Styles from './LoginButton.module.css';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return <button className={Styles.button} onClick={() => loginWithRedirect()}>LOG IN</button>
}