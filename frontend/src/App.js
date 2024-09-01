
import React, { useState } from 'react';

import LoginForm from './components/Login';
import Welcome from './components/Welcome';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import './App.css';


const App = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault()

    validate(name, password)

    try {

      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();
      console.log(data, "DATAAA")
      if (response.ok) {
        const {token } = data
        setLoggedIn(true)
        localStorage.setItem('token', token);
      } else {
        setError(data.message || 'Login failed');
      }

    } catch (error) {
      setError('Something went wrong. Please try again later.');
      console.log(error, "err")

    }

  }


  const validate = (name, password) => {
    if (!name) {
      setError('Please enter a username')
      return;
    }
    if (!password) {
      setError('Please enter a password')
      return;
    }
  }
  const handleUsernameChange = (event) => {
    setName(event.target.value)

  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)

  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm
            onUsernameChange={handleUsernameChange}
            onPasswordChange={handlePasswordChange}
            name={name}
            password={password}
            onSubmit={handleSubmit}
            error={error}
            loggedIn={loggedIn}
          />} />
          <Route
            path="/welcome"
            element={<PrivateRoute><Welcome /></PrivateRoute>}
          />
          <Route path="*" element={<LoginForm />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
