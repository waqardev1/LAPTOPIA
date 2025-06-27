import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FaHome, FaLaptop, FaDesktop, FaInfoCircle, FaUser } from 'react-icons/fa'; // Adding Icons

const Header = () => {
  return (
    <header className={styles.header}>
<nav className={styles.nav}>
  {/* Logo */}
  <div className={styles.logo}>
    <Link to="/" className={styles.logoLink}>
      <span className={styles.logoText}>LAPTOPIA</span>
    </Link>
  </div>

  {/* Links + Profile wrapper */}
  <div className={styles.navProfileWrapper}>
    <ul className={styles.navLinks}>

      <li>
        <Link to="/recommendations" className={styles.navLink}>
          <FaLaptop className={styles.navIcon} />
          Find Laptop
        </Link>
      </li>
      <li>
        <Link to="/custom-pc" className={styles.navLink}>
          <FaDesktop className={styles.navIcon} />
          PC Builder
        </Link>
      </li>
      <li>
        <Link to="/about" className={styles.navLink}>
          <FaInfoCircle className={styles.navIcon} />
          About
        </Link>
      </li>
      <li>
        <Link to="/profile" className={styles.navLink}>
          <FaUser className={styles.navIcon} />
          Profile
        </Link>
      </li>
    </ul>
  </div>
</nav>


    </header>
  );
};

export default Header;