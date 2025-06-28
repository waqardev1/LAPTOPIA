// src/components/Home.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LaptopRecommendation from './LaptopRecommendation';
import CustomPcBuilder from './CustomPcBuilder';
import styles from './Home.module.css';
import laptopData from './latestLaptops.json';
import ImageLaptopRecommendation from './ImageLaptopRecommendation';

function Home() {
  const [laptops, setLaptops] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const laptopsPerPage = 12;

  useEffect(() => {
    setLaptops(laptopData);
  }, []);

  const uniqueCompanies = Array.from(new Set(laptops.map(laptop => laptop.Company)));

  const handleCompanyClick = (company) => {
    setSelectedCompany(current => current === company ? null : company);
    setCurrentPage(1);
  };

  const filteredLaptops = selectedCompany
    ? laptops.filter(laptop => laptop.Company === selectedCompany)
    : laptops;

  const indexOfLastLaptop = currentPage * laptopsPerPage;
  const indexOfFirstLaptop = indexOfLastLaptop - laptopsPerPage;
  const currentLaptops = filteredLaptops.slice(indexOfFirstLaptop, indexOfLastLaptop);

  const totalPages = Math.ceil(filteredLaptops.length / laptopsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Welcome to LAPTOPIA</h1>
        <p className={styles.heroSubtitle}>
          Your ultimate destination for laptop recommendations and PC building
        </p>
      </div>

      {/* Two-Column Featured Sections */}
      <div className={styles.featuredSectionsRow}>
        <div className={styles.laptopRecommendationColumn}>
          <LaptopRecommendation />
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.imageLaptopRecommendationSection}>
            <ImageLaptopRecommendation />
          </div>
          <div className={styles.customPcBuilderSection}>
            <CustomPcBuilder />
          </div>

          {/* Chatbot Integration */}
          <div style={{ marginTop: 1, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', borderRadius: 16, overflow: 'hidden', background: '#fff', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/dIt4-jktab08koS77g472"
              width="100%"
              style={{ height: '350px', minHeight: '300px', border: 'none', display: 'block' }}
              frameBorder="0"
              title="Laptopia Chatbot"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Latest Models Section */}
      <div className={styles.latestModelsSection}>
        <h2 className={styles.sectionTitle}>Explore Latest Models</h2>

        <div className={styles.companyFilters}>
          <button
            className={`${styles.filterButton} ${selectedCompany === null ? styles.activeFilter : ''}`}
            onClick={() => handleCompanyClick(null)}
          >
            ALL
          </button>
          {uniqueCompanies.map(company => (
            <button
              key={company}
              className={`${styles.filterButton} ${selectedCompany === company ? styles.activeFilter : ''}`}
              onClick={() => handleCompanyClick(company)}
            >
              {company}
            </button>
          ))}
        </div>

        <div className={styles.laptopGrid}>
          {currentLaptops.map((laptop) => (
            <div key={laptop.indx} className={styles.laptopCard}>
              <img
                src={`path_to_images/${laptop.Company}_${laptop.indx}.jpg`}
                alt={laptop.Company}
                className={styles.laptopImage}
              />
              <h3 className={styles.laptopName}>{laptop.Company} {laptop.TypeName}</h3>
              <p className={styles.laptopSpecs}>
                CPU: {laptop.cpu_name.trim()} | RAM: {laptop.Ram}GB | Storage: {laptop.Memory}
              </p>
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

        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`${styles.pageButton} ${currentPage === i + 1 ? styles.activePage : ''}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={styles.pageButton}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
