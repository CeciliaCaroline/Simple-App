import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css'


const LoginForm = (props) => {


  const { name, password, onUsernameChange, onPasswordChange, onSubmit, error, loggedIn } = props
  const navigate = useNavigate();


  useEffect(() => {
    localStorage.getItem('token') && navigate('/welcome');
  }, [loggedIn])



  return (
    <div className='login-container'>
      <form className="login-form" onSubmit={onSubmit} >
        <h2>Login</h2>
        <div>
          <input
            type="text"
            value={name}
            onChange={onUsernameChange}
            placeholder='Enter username'
            required
          />

        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder='Enter password'
            required
          />

        </div>

        <button type='submit'>Submit</button>

      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>


  );
}

export default LoginForm;