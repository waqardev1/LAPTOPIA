// FilterBar.jsx
import React from 'react';
import styles from './FilterBar.module.css';

const FilterBar = ({ onSort, onFilterChange }) => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.sort}>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" onChange={(e) => onSort?.(e.target.value)}>
          <option value="default">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="performance">Performance</option>
          <option value="battery">Battery Life</option>
        </select>
      </div>

      <div className={styles.toggles}>
        <label>
          <input type="checkbox" onChange={(e) => onFilterChange?.('inStock', e.target.checked)} />
          In Stock Only
        </label>
        <label>
          <input type="checkbox" onChange={(e) => onFilterChange?.('gpuNvidia', e.target.checked)} />
          Nvidia GPU
        </label>
      </div>
    </div>
  );
};

export default FilterBar;
