import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SavedLaptops.module.css';

const SavedLaptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedLaptops = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/laptops');
        setLaptops(res.data);
      } catch (err) {
        console.error('Failed to fetch saved laptops:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedLaptops();
  }, []);

  return (
    <div className={styles.savedContainer}>
      <h1 className={styles.heading}>💾 Saved Laptops</h1>
      {loading ? (
        <p>Loading...</p>
      ) : laptops.length === 0 ? (
        <p>No laptops saved yet.</p>
      ) : (
        <div className={styles.laptopList}>
          {laptops.map((laptop, idx) => (
            <div key={idx} className={styles.laptopCard}>
              <img src={laptop.image} alt={laptop.name} />
              <h3>{laptop.name}</h3>
              <p>{laptop.specs}</p>
              <p><strong>{laptop.price}</strong></p>
              <a href={laptop.storeLink} target="_blank" rel="noopener noreferrer">🔗 View Store</a>
              <p className={styles.reason}>🧠 {laptop.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedLaptops;
