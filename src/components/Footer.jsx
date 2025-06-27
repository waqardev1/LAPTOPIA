import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© {new Date().getFullYear()} LAPTOPIA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;