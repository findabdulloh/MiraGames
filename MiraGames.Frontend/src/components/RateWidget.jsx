import { useEffect, useState } from 'react';
import api from '../api';

export default function RateWidget() {
  const [rate, setRate] = useState({ id: '', value: '', updatedAt: '' });

  useEffect(() => {
    api.get('/rate')
      .then(res => setRate(res.data))
      .catch(() => alert('Failed to load rate'));
  }, []);

  const updateRate = () => {
    api.post(`/rate/`, { value: rate.value })
      .then(res => {
        alert('Rate is updated.');
        setRate(res.data);
      })
      .catch(() => alert('Failed to update rate'));
  };

  return (
    <div style={styles.card}>
      <input
        type="text"
        value={rate.value}
        onChange={(e) => setRate(prev => ({ ...prev, value: e.target.value }))}
        placeholder="Enter new rate"
        style={styles.input}
      />
      <button onClick={updateRate} style={styles.button}>Update</button>
      <p style={styles.meta}><strong>Last Updated:</strong> {parseUtcDate(rate.updatedAt).toLocaleString()}</p>
    </div>
  );
}

function parseUtcDate(dateStr) {
  // If it already ends with Z, treat as UTC
  if (dateStr.endsWith('Z')) return new Date(dateStr);

  // If not, force it to UTC by adding Z
  return new Date(dateStr + 'Z');
}

const styles = {
  card: {
    backgroundColor: '#1F1F1F',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(3, 218, 198, 0.15)',
    maxWidth: '400px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    backgroundColor: '#2A2A2A',
    border: '1px solid #444',
    color: '#E0E0E0',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#03DAC6',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
  meta: {
    fontSize: '14px',
    color: '#B0B0B0',
    marginTop: '15px',
  }
};