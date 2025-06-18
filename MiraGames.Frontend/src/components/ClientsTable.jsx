import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function ClientsTable() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get('/clients')
      .then(res => setClients(res.data))
      .catch(() => alert('Failed to fetch clients'));
  }, []);

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Balance</th>
            <th style={styles.th}>Payments</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td style={styles.td}>{client.id}</td>
              <td style={styles.td}>{client.name}</td>
              <td style={styles.td}>{client.email}</td>
              <td style={styles.td}>{client.balanceT}</td>
              <td style={styles.td}>
                <Link
                  to={`/payments?clientId=${client.id}`}
                  style={styles.link}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#1F1F1F',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 0 12px rgba(255, 255, 255, 0.04)',
    marginTop: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#222',
    color: '#03DAC6',
    borderBottom: '1px solid #333',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #333',
    color: '#E0E0E0',
  },
  link: {
    color: '#03DAC6',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};