import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ padding: '10px', backgroundColor: '#1F1F1F', marginBottom: '20px' }}>
      <nav>
        <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}