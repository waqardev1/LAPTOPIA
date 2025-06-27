// src/components/LatestModels.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LatestModels.module.css';

const LatestModels = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const laptops = [
    {
      id: 1,
      name: 'Dell XPS 13',
      image: '../../public/images/Dell XPS 13/notebook-xps-13-9345-t-gray-gallery-10.avif',
      specs: 'Intel Core i7, 16GB RAM, 512GB SSD',
      company: 'Dell',
      details: {
        description: 'The Dell XPS 13 is a high-performance ultrabook with a sleek design.',
        images: [
          '../../public/images/Dell XPS 13/notebook-xps-13-9345-t-gray-gallery-2.avif',
          '../../public/images/Dell XPS 13/notebook-xps-13-9345-t-gray-gallery-5.avif'
        ],
        buyLink: 'https://www.dell.com/xps13'
      }
    },
    // Add more laptops as needed
  ];

  const handleCompanyClick = (company) => {
    if (selectedCompany === company) {
      setSelectedCompany(null); // Reset filter if the same company is clicked again
    } else {
      setSelectedCompany(company);
    }
  };

  const filteredLaptops = selectedCompany
    ? laptops.filter((laptop) => laptop.company === selectedCompany)
    : laptops;

  return (
    <div className={styles.latestModelsSection}>
      <h2 className={styles.sectionTitle}>Explore Latest Models</h2>
      <div className={styles.companyFilters}>
        <button
          className={selectedCompany === 'Dell' ? styles.activeFilter : styles.filterButton}
          onClick={() => handleCompanyClick('Dell')}
        >
          Dell
        </button>
        <button
          className={selectedCompany === 'HP' ? styles.activeFilter : styles.filterButton}
          onClick={() => handleCompanyClick('HP')}
        >
          HP
        </button>
        <button
          className={selectedCompany === 'Lenovo' ? styles.activeFilter : styles.filterButton}
          onClick={() => handleCompanyClick('Lenovo')}
        >
          Lenovo
        </button>
        {/* Add more company buttons as needed */}
      </div>
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

export default LatestModels;