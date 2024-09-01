import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css'


const Welcome = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate("/login")
    }
    const fetchMessage = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate("/login")
      }

      try {
        const response = await fetch('http://localhost:5000/welcome', {
          headers: {
            Authorization: token,
          },
        });

        const data = await response.json();
        console.log(data, "Welcome message")

        if (response.ok) {
          setMessage(data.message);
        } else {
          navigate("/login")
          setMessage('Failed to fetch welcome message');
        }
      } catch (err) {
        setMessage('Something went wrong');
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-message-box">
        <h2>{message}</h2>
      </div>
    </div>  );
}

export default Welcome;