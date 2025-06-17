/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { setToken } from '../auth';
import Header from '../components/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.title}>Welcome Back 👋</h2>
          <p style={styles.subtitle}>Login to access your dashboard</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  form: {
    backgroundColor: '#1F1F1F',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(3, 218, 198, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '10px',
    fontSize: '24px',
    color: '#E0E0E0',
  },
  subtitle: {
    marginBottom: '20px',
    fontSize: '14px',
    color: '#B0B0B0',
  },
  input: {
    backgroundColor: '#2A2A2A',
    border: '1px solid #444',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '15px',
    color: '#E0E0E0',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#03DAC6',
    color: '#000',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }
};