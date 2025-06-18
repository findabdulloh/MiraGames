import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { label: 'Login', to: '/login' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Payments', to: '/payments' },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo}>
          <img
            src="/logo.svg"
            alt="App Logo"
            style={styles.logo}
          />
        </h1>
        <nav style={styles.nav}>
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                ...styles.link,
                ...(location.pathname === item.to ? styles.active : {})
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#1F1F1F',
    borderBottom: '1px solid #333',
    padding: '12px 0',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: '32px',
    width: 'auto',
    display: 'block',
    margin: '0px',
    marginBottom: '0px',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#E0E0E0',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '15px',
    padding: '6px 10px',
    borderRadius: '5px',
    transition: 'background 0.3s',
  },
  active: {
    backgroundColor: '#03DAC6',
    color: '#000',
  },
};