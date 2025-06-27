// PreferencesSummary.jsx
import React from 'react';
import styles from './PreferencesSummary.module.css';

const PreferencesSummary = ({ preferences }) => {
  return (
    <div className={styles.summaryBox}>
      <h2>User Preferences</h2>
      <ul>
        {Object.entries(preferences).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
    </div>
  );
};

export default PreferencesSummary;
