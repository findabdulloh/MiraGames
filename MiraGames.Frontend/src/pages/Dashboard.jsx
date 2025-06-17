import Header from '../components/Header.jsx';
import ClientsTable from '../components/ClientsTable.jsx';
import RateWidget from '../components/RateWidget.jsx';

export default function Dashboard() {
  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>📊 Dashboard</h1>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>👥 Table of Clients</h2>
          <ClientsTable />
        </section>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>💱 Rate of the Tokens</h2>
          <RateWidget />
        </section>
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
    fontSize: '32px',
    color: '#03DAC6',
    textAlign: 'center',
    marginBottom: '40px',
  },
  subtitle: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#E0E0E0',
  },
  section: {
    marginBottom: '50px',
  }
};