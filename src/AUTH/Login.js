import React, { useState, useContext } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../AUTH/userContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const defaultUser = {
    id: 'admin',
    password: '123'
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === defaultUser.id && password === defaultUser.password) {
      setUser(username);
      navigate('/main');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
      <h4>Login Page</h4>
        <label>
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
        </label>
        <label>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </label>
        <input
          type="submit"
          value="Login"
          className="login-button"
        />
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login;
