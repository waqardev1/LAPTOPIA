// src/components/LaptopCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './LaptopCard.module.css';
import { FaExternalLinkAlt } from 'react-icons/fa';

const LaptopCard = ({ data, onSave, saving }) => {
  const {
    name,
    specs,
    price,
    image,
    storeLink,
    reason,
  } = data;

  return (
    <div className={styles.laptopCard} tabIndex={0} aria-label={`Laptop: ${name}`}>
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={styles.laptopImage}
        />
      </div>
      <div className={styles.laptopInfo}>
        <h2 className={styles.laptopName}>{name}</h2>
        <div className={styles.laptopSpecs}>{specs}</div>
        <div className={styles.laptopPrice}>{price}</div>
        {reason && <div className={styles.laptopReason}>💡 {reason}</div>}

        <div className={styles.laptopActions}>
          <a
            href={storeLink}
            className={styles.storeLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buy ${name} on store`}
          >
            <FaExternalLinkAlt className={styles.externalLinkIcon} />
            <span>See in Store</span>
          </a>
          {onSave && (
            <button
              className={styles.saveButton}
              onClick={onSave}
              disabled={saving}
              aria-label={`Save ${name}`}
            >
              {saving ? (
                <span className={styles.spinner}></span>
              ) : (
                <>
                  💾 Save
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

LaptopCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    specs: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    storeLink: PropTypes.string,
    reason: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func,
  saving: PropTypes.bool,
};

LaptopCard.defaultProps = {
  onSave: null,
  saving: false,
};

export default LaptopCard;
