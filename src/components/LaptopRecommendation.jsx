import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LaptopRecommendation.module.css';

const LaptopRecommendation = () => {
  const [userInput, setUserInput] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [usagePurpose, setUsagePurpose] = useState('');
  const [otherUsage, setOtherUsage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (error) {
      setError(''); // Clear error if user starts typing
    }
  };

  const handleBudgetChange = (e) => {
    setBudgetRange(e.target.value);
  };

  const handleUsagePurposeChange = (e) => {
    setUsagePurpose(e.target.value);
  };

  const handleOtherUsageChange = (e) => {
    setOtherUsage(e.target.value);
  };

  // const handleTextRecommendation = () => {
  //   if (!userInput.trim()) {
  //     setError('Please enter a description of what you need in a laptop.');
  //     return;
  //   }
  //   navigate('/recommended-laptops', {
  //     state: {
  //       userPreferences: {
  //         inputText: userInput,
  //       },
  //     },
  //   });
  // };
  const handleTextRecommendation = async () => {
    if (!userInput.trim()) {
      setError('Please enter a description of what you need in a laptop.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: userInput })
      });
      const preferences = await res.json();
      // Now navigate with structured preferences!
      navigate('/recommended-laptops', {
        state: {
          userPreferences: preferences,
        },
      });
    } catch (err) {
      setError('Gemini failed to analyze your query.');
    }
  };
  

  const handleFormRecommendation = () => {
    if (!budgetRange || !usagePurpose) {
      setError('Please fill out the basic preferences.');
      return;
    }
    navigate('/recommended-laptops', {
      state: {
        userPreferences: {
          budgetRange,
          usagePurpose: usagePurpose === 'Other' ? otherUsage : usagePurpose,
        },
      },
    });
  };

  return (
    <div className={styles.recommendationSection}>
      <div className={styles.recommendationInput}>
        <h2 className={styles.sectionTitle}>Find Your Perfect Laptop</h2>
        <p className={styles.sectionDescription}>
          Get AI-powered recommendations based on your needs and budget.
        </p>
        <textarea
          placeholder="Describe what you need in a laptop..."
          value={userInput}
          onChange={handleInputChange}
          className={styles.inputField}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.ctaButton} onClick={handleTextRecommendation}>
          Start Recommendation
        </button>
      </div>
      <div className={styles.orSeparator}>
        <p>OR</p>
      </div>
      <div className={styles.basicForm}>
        <h3 className={styles.formTitle}>Basic Preferences</h3>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Budget Range *</label>
            <select
              className={styles.formControl}
              required
              value={budgetRange}
              onChange={handleBudgetChange}
            >
              <option value="">Select Budget Range</option>
              <option value="$0-$500">$0-$500</option>
              <option value="$501-$1000">$501-$1000</option>
              <option value="$1001-$1500">$1001-$1500</option>
              <option value="$1501-$2000">$1501-$2000</option>
              <option value="$2001 and above">$2001 and above</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Usage Purpose *</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="usagePurpose"
                  value="Gaming"
                  required
                  onChange={handleUsagePurposeChange}
                />
                Gaming
              </label>
              <label>
                <input
                  type="radio"
                  name="usagePurpose"
                  value="Work"
                  required
                  onChange={handleUsagePurposeChange}
                />
                Work
              </label>
              <label>
                <input
                  type="radio"
                  name="usagePurpose"
                  value="School"
                  required
                  onChange={handleUsagePurposeChange}
                />
                School
              </label>
              <label>
                <input
                  type="radio"
                  name="usagePurpose"
                  value="Multimedia"
                  required
                  onChange={handleUsagePurposeChange}
                />
                Multimedia
              </label>
              <label>
                <input
                  type="radio"
                  name="usagePurpose"
                  value="General Use"
                  required
                  onChange={handleUsagePurposeChange}
                />
                General Use
              </label>
              <label>
                <input
                  type="radio"
                  name="usagePurpose"
                  value="Other"
                  required
                  onChange={handleUsagePurposeChange}
                />
                Other
              </label>
              {usagePurpose === 'Other' && (
                <input
                  type="text"
                  placeholder="Specify other usage"
                  value={otherUsage}
                  onChange={handleOtherUsageChange}
                  className={styles.otherUsageInput}
                />
              )}
            </div>
          </div>
          <button type="button" className={styles.ctaButton} onClick={handleFormRecommendation}>
            Get Recommendations
          </button>
        </form>
      </div>
    </div>
  );
};

export default LaptopRecommendation;