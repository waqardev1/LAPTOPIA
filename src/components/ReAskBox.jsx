import React from 'react';
import styles from './ReAskBox.module.css';
import { toast } from 'react-toastify';

const ReAskBox = ({ value, onChange, onSubmit }) => {
  const handleAskAgain = () => {
    onSubmit();
    toast.info("🔄 Searching for better options...");
  };

  return (
    <div className={styles.reAskSection}>
      <textarea
        className={styles.reAskTextArea}
        placeholder="Describe what you’re looking for..."
        value={value}
        onChange={onChange}
      ></textarea>
      <div className={styles.reAskAction}>
        <button className={styles.askAgainButton} onClick={handleAskAgain}>
          🔄 Ask Again
        </button>
      </div>
    </div>
  );
};

export default ReAskBox;
