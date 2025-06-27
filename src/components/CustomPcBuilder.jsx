import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CustomPcBuilder.module.css';

const CustomPcBuilder = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.customPcBuilderSection}>
      <h2 className={styles.sectionTitle}>Build Your Dream PC</h2>
      <p className={styles.sectionDescription}>
        Customize every component to create your perfect computer.
      </p>
      <div className={styles.customPcVisual}>
        {/* Image instead of iframe */}
        <img
          src="../../public/images/gamingPc.jpg"
          alt="3D PC Model"
          className={styles.customPcImage}
        />
      </div>
      <button onClick={() => navigate('/custom-pc')} className={styles.ctaButton}>Start Building</button>
    </div>
  );
};

export default CustomPcBuilder;