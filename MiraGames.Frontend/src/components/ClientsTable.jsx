import { useEffect, useState } from 'react';
import api from '../api';

export default function ClientsTable() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get('/clients')
      .then(res => setClients(res.data))
      .catch(() => alert('Failed to fetch clients'));
  }, []);

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td style={styles.td}>{client.id}</td>
              <td style={styles.td}>{client.name}</td>
              <td style={styles.td}>{client.email}</td>
              <td style={styles.td}>{client.balanceT}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    overflowX: 'auto',
    backgroundColor: '#1F1F1F',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    backgroundColor: '#222',
    color: '#03DAC6',
    borderBottom: '1px solid #333',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #333',
    color: '#E0E0E0',
  }
};