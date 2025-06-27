// src/components/LatestModelsPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './LatestModelsPage.module.css';
import laptopData from './laptops.json';

const LatestModelsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    setLaptops(laptopData);
  }, []);

  const filteredLaptops = laptops.filter(laptop =>
    laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    laptop.specs.toLowerCase().includes(searchTerm.toLowerCase()) ||
    laptop.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.sectionTitle}>Explore Latest Models</h1>
      <input
        type="text"
        placeholder="Search for laptops..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchBar}
      />
      <div className={styles.laptopGrid}>
        {filteredLaptops.map((laptop) => (
          <div key={laptop.id} className={styles.laptopCard}>
            <img src={laptop.image} alt={laptop.name} className={styles.laptopImage} />
            <h3 className={styles.laptopName}>{laptop.name}</h3>
            <p className={styles.laptopSpecs}>{laptop.specs}</p>
            <Link
              to="/laptop-details"
              state={{ laptop }}
              className={styles.readMoreButton}
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestModelsPage;