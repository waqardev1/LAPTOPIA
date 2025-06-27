// src/components/LaptopDetails.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './LaptopDetails.module.css';

const LaptopDetails = () => {
  const location = useLocation();
  const { laptop } = location.state || {};

  if (!laptop) {
    return <div className={styles.pageContainer}>Laptop not found</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1>{laptop.name}</h1>
      <p>{laptop.details.description}</p>
      <div className={styles.imageContainer}>
        {laptop.details.images.map((image, index) => (
          <img key={index} src={image} alt={laptop.name} className={styles.modalImage} />
        ))}
      </div>
      <a href={laptop.details.buyLink} className={styles.buyButton} target="_blank" rel="noopener noreferrer">
        Buy Now
      </a>
    </div>
  );
};

export default LaptopDetails;