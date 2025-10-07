import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8081/auth/login', form);
      localStorage.setItem('token', res.data.token);
      onLogin();
      navigate('/');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register" className="link">Don't have an account? Register</Link>
    </div>
  );
}