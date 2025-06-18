import { useState, useEffect } from 'react';
import api from '../api';
import Header from '../components/Header';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Payments() {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');
  const [take, setTake] = useState(5);
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const loadPayments = (id = clientId, tk = take) => {
    const params = new URLSearchParams();
    if (id) params.append('clientId', id);
    if (tk) params.append('take', tk);

    api.get(`/payments?${params.toString()}`)
      .then(res => setPayments(res.data))
      .catch(() => alert('Failed to load payments'));

    navigate(`/payments?${params.toString()}`);
  };

  useEffect(() => {
    const initialClientId = searchParams.get('clientId');
    const initialTake = parseInt(searchParams.get('take'), 10);

    if (initialClientId) setClientId(initialClientId);
    if (!isNaN(initialTake)) setTake(initialTake);
  }, []);

  useEffect(() => {
    api.get('/clients')
      .then(res => {
        setClients(res.data);
      })
      .catch(() => alert('Failed to load clients'));
  }, []);

  useEffect(() => {
    if (clients.length > 0) {
      loadPayments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clients, clientId]);

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>📥 Payments</h1>

        <div style={styles.filterBox}>
          <div style={styles.filterGroup}>
            <label style={styles.label}>Client</label>
            <select
              value={clientId}
              onChange={e => {
                const newId = e.target.value;
                setClientId(newId);
                loadPayments(newId, take);
              }}
              style={styles.select}
            >
              <option value="">All Clients</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroupSmall}>
            <label style={styles.label}>Take</label>
            <input
              type="number"
              min="1"
              value={take}
              onChange={e => setTake(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const inputValue = parseInt(e.target.value, 10) || 1;
                  setTake(inputValue);
                  loadPayments(clientId, inputValue);
                }
              }}
              style={styles.input}
            />
          </div>

          <button
            onClick={() => loadPayments()}
            style={styles.button}
          >
            Load
          </button>
        </div>

        {payments.length > 0 && (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Client's Name</th>
                  <th style={styles.th}>Amount of Tokens</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id}>
                    <td style={styles.td}>{p.id}</td>
                    <td style={styles.td}>{p.clientName}</td>
                    <td style={styles.td}>{p.amountT}</td>
                    <td style={styles.td}>{new Date(p.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    fontSize: '36px',
    padding: '0',
    color: '#03DAC6',
    margin: '0px 0 20px',
    textAlign: 'center',
    textShadow: '0 0 6px rgba(3, 218, 198, 0.4)',
  },
  filterBox: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '30px',
    backgroundColor: '#1F1F1F',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(255, 255, 255, 0.05)',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    margin: '3px'
  },
  filterGroupSmall: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    minWidth: '100px',
    flex: 'none',
  },
  label: {
    color: '#B0B0B0',
    fontSize: '14px',
    marginBottom: '6px',
  },
  select: {
    padding: '10px',
    backgroundColor: '#2A2A2A',
    color: '#E0E0E0',
    border: '1px solid #444',
    borderRadius: '6px',
    height: '40px',
  },
  input: {
    padding: '10px',
    backgroundColor: '#2A2A2A',
    color: '#E0E0E0',
    border: '1px solid #444',
    borderRadius: '6px',
    height: '40px',
  },
  button: {
    height: '42px',
    backgroundColor: '#03DAC6',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    padding: '0 20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    alignSelf: 'flex-end',
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#1F1F1F',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 0 12px rgba(255, 255, 255, 0.04)',
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
    fontSize: '15px',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #333',
    color: '#E0E0E0',
    fontSize: '14px',
  },
};