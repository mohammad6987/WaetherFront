import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>
          <FontAwesomeIcon icon={faCloudSun} style={styles.icon} /> WeatherApp
        </Link>
      </div>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/home" style={styles.navLink}>Home</Link></li>
          <li style={styles.navItem}><Link to="/about" style={styles.navLink}>About</Link></li>
          <li style={styles.navItem}><Link to="/contact" style={styles.navLink}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    width: '100%', // Full width of the viewport
    
    justifyContent: 'space-between', // Distribute items evenly
    alignItems: 'center', // Center vertically
    backgroundColor: '#333',
    color: '#fff',
    padding: '1rem', // Add padding for breathing room
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  logoLink: {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '0.5rem', // Space between the icon and the text
    color: '#fff',
  },
  nav: {
    display: 'flex',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    margin: 0,
    padding: 0,
  },
  navItem: {},
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
  }
};

export default Header;
