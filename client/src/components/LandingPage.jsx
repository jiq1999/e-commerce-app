import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <h1>WELCOME TO MY E-COMMERCE</h1>
      <Link to='/purchases'>
        <button>PURCHASES</button>
      </Link>
      { 
        isLoading ? 
        <h2>LOADING...</h2> :
        <div>
          <Link to='/home'>
            <button>GET IN</button>
          </Link>
          { 
            isAuthenticated ?
            <LogoutButton /> :
            <LoginButton />
          }
          <Profile />
        </div>
      }
    </div>
  )
}