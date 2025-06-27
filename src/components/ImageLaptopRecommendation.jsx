import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ImageLaptopRecommendation.module.css';

const ImageLaptopRecommendation = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setLoading(true);
  
    const formData = new FormData();
    formData.append('image', selectedFile);
  
    try {
      const response = await fetch('http://localhost:5000/api/image-recommendation', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
  
      // Defensive: check if data.laptops exists and is an array
      const recommendedLaptops = Array.isArray(data.laptops) ? data.laptops : [];
  
      navigate('/recommended-laptops', { state: { recommendations: recommendedLaptops } });
    } catch (error) {
      alert('Failed to get recommendations.', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        <span role="img" aria-label="camera">📷</span> Image-based Laptop Recommendation
      </h2>
      <form className={styles.form} onSubmit={handleUpload}>
        <label className={styles.uploadLabel}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <span className={styles.uploadButton}>
            {selectedFile ? 'Change Image' : 'Upload Image'}
          </span>
        </label>
        {previewUrl && (
          <div className={styles.imagePreview}>
            <img src={previewUrl} alt="Preview" />
          </div>
        )}
        <button
          type="submit"
          className={styles.recommendButton}
          disabled={!selectedFile || loading}
        >
          {loading ? 'Analyzing...' : 'Get Recommendations'}
        </button>
      </form>
    </div>
  );
};

export default ImageLaptopRecommendation;
