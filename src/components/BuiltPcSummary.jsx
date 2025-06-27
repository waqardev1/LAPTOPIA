import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BuiltPcSummary.module.css';

const BuiltPcSummary = () => {
  const navigate = useNavigate();

  // Dummy data for the selected components
  const selectedComponents = [
    { name: 'CPU', details: 'Intel Core i9-12900K', price: 599 },
    { name: 'GPU', details: 'NVIDIA GeForce RTX 3080', price: 799 },
    { name: 'Motherboard', details: 'ASUS ROG Maximus XIII Hero', price: 499 },
    { name: 'Memory', details: 'Corsair Vengeance RGB Pro 32GB', price: 199 },
    { name: 'Storage', details: 'Samsung 970 EVO Plus 1TB', price: 129 },
    { name: 'Case', details: 'NZXT H510', price: 89 },
    { name: 'Power Supply', details: 'Corsair RM750x', price: 149 },
    { name: 'Operating System', details: 'Windows 10 Pro', price: 199 },
    { name: 'Monitor', details: 'Dell UltraSharp U2720Q', price: 499 },
  ];

  const estimatedWattage = 750;
  const totalPrice = selectedComponents.reduce((total, component) => total + component.price, 0);
  const usage = 'Gaming and Professional Use';

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.builtPcSummaryContainer}>
      <h1 className={styles.pageTitle}>Your Built PC</h1>
      <div className={styles.summaryDetails}>
        <h2 className={styles.sectionTitle}>Selected Components</h2>
        <table className={styles.componentsTable}>
          <thead>
            <tr>
              <th>Component</th>
              <th>Details</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedComponents.map((component, index) => (
              <tr key={index}>
                <td>{component.name}</td>
                <td>{component.details}</td>
                <td>${component.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.summaryInfo}>
          <p><strong>Estimated Power Wattage:</strong> {estimatedWattage}W</p>
          <p><strong>Total Price:</strong> ${totalPrice}</p>
          <p><strong>Usage:</strong> {usage}</p>
        </div>
        <button onClick={handleLoginClick} className={styles.loginButton}>
          Login to save the custom built
        </button>
      </div>
    </div>
  );
};

export default BuiltPcSummary;