import React, { useState } from 'react';
import styles from './FiltersSection.module.css';

const merchants = [
  'All', 'Abt', 'Adorama', 'Amazon', 'ASUS', 'B&H', 'Best Buy', 
  'Corsair', 'Das Keyboard', 'Dell Technologies', 'GameStop', 
  'HP', 'HYTE', 'iBUYPOWER', 'JBL', 'Lenovo', 'LG', 'Logitech', 
  'MemoryC', 'ModMyMods', 'Monoprice', 'MSI', 'Newegg', 
  'Newegg Sellers', 'NZXT', 'Other World Computing', 'Razer', 
  'Samsung', 'SanDisk', 'Target', 'Western Digital'
];

const FiltersSection = ({
  coreCount, setCoreCount,
  threadCount, setThreadCount,
  coreClock, setCoreClock,
  l2Cache, setL2Cache,
  l3Cache, setL3Cache,
  tdp, setTdp,
  priceRange, setPriceRange,
  selectedMerchants, setSelectedMerchants
}) => {
  const [isMerchantsOpen, setIsMerchantsOpen] = useState(false);

  // Default fallback values for all filters if undefined
  const cc = coreCount ?? [1, 64];
  const tc = threadCount ?? [1, 128];
  const clk = coreClock ?? [1.1, 4.7];
  const l2 = l2Cache ?? [0.25, 40];
  const l3 = l3Cache ?? [0, 256];
  const tdpv = tdp ?? [20, 280];
  const price = priceRange ?? [0, 2780];
  const selected = selectedMerchants ?? [];

  const handleRangeChange = (value, setter) => setter(value);

  const toggleMerchantsDropdown = () => setIsMerchantsOpen(v => !v);

  const handleMerchantChange = (merchant) => {
    if (merchant === 'All') {
      setSelectedMerchants(selected.length === merchants.length - 1 ? [] : merchants);
    } else {
      if (selected.includes(merchant)) {
        setSelectedMerchants(selected.filter(m => m !== merchant));
      } else {
        setSelectedMerchants([...selected, merchant]);
      }
    }
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...price];
    newPriceRange[index] = Number(e.target.value);
    setPriceRange(newPriceRange);
  };

  return (
    <div className={styles.filtersSection}>
      <h2 className={styles.sectionTitle}>Filter CPUs</h2>
      {/* Core Count */}
      <div className={styles.filterGroup}>
        <label>Core Count</label>
        <div className={styles.rangeValues}>{cc[0]} - {cc[1]}</div>
        <input
          type="range"
          min="1" max="64"
          value={cc[1]}
          onChange={e => handleRangeChange([cc[0], parseInt(e.target.value)], setCoreCount)}
        />
      </div>
      {/* Thread Count */}
      <div className={styles.filterGroup}>
        <label>Thread Count</label>
        <div className={styles.rangeValues}>{tc[0]} - {tc[1]}</div>
        <input
          type="range"
          min="1" max="128"
          value={tc[1]}
          onChange={e => handleRangeChange([tc[0], parseInt(e.target.value)], setThreadCount)}
        />
      </div>
      {/* Core Clock */}
      <div className={styles.filterGroup}>
        <label>Core Clock (GHz)</label>
        <div className={styles.rangeValues}>{clk[0]} - {clk[1]}</div>
        <input
          type="range"
          min="1.1" max="4.7" step="0.1"
          value={clk[1]}
          onChange={e => handleRangeChange([clk[0], parseFloat(e.target.value)], setCoreClock)}
        />
      </div>
      {/* L2 Cache */}
      <div className={styles.filterGroup}>
        <label>L2 Cache (MB)</label>
        <div className={styles.rangeValues}>{l2[0]} - {l2[1]}</div>
        <input
          type="range"
          min="0.25" max="40" step="0.25"
          value={l2[1]}
          onChange={e => handleRangeChange([l2[0], parseFloat(e.target.value)], setL2Cache)}
        />
      </div>
      {/* L3 Cache */}
      <div className={styles.filterGroup}>
        <label>L3 Cache (MB)</label>
        <div className={styles.rangeValues}>{l3[0]} - {l3[1]}</div>
        <input
          type="range"
          min="0" max="256"
          value={l3[1]}
          onChange={e => handleRangeChange([l3[0], parseInt(e.target.value)], setL3Cache)}
        />
      </div>
      {/* TDP */}
      <div className={styles.filterGroup}>
        <label>TDP (W)</label>
        <div className={styles.rangeValues}>{tdpv[0]}W - {tdpv[1]}W</div>
        <input
          type="range"
          min="20" max="280"
          value={tdpv[1]}
          onChange={e => handleRangeChange([tdpv[0], parseInt(e.target.value)], setTdp)}
        />
      </div>
      {/* Price */}
      <div className={styles.filterGroup}>
        <label>Price ($)</label>
        <div className={styles.priceRangeContainer}>
          <input
            type="number"
            min="0" max="2780"
            value={price[0]}
            onChange={e => handlePriceChange(e, 0)}
            className={styles.priceInput}
          />
          <span className={styles.priceSeparator}>-</span>
          <input
            type="number"
            min="0" max="2780"
            value={price[1]}
            onChange={e => handlePriceChange(e, 1)}
            className={styles.priceInput}
          />
        </div>
      </div>
      {/* Merchants */}
      <div className={styles.filterGroup}>
        <div
          className={styles.merchantsHeader}
          onClick={toggleMerchantsDropdown}
        >
          <span className={styles.merchantsTitle}>Merchants</span>
          <span className={styles.toggleIcon}>
            {isMerchantsOpen ? '−' : '+'}
          </span>
        </div>
        {isMerchantsOpen && (
          <div className={styles.merchantsDropdown}>
            {merchants.map((merchant) => (
              <div key={merchant} className={styles.merchantItem}>
                <input
                  type="checkbox"
                  id={`merchant-${merchant}`}
                  checked={selected.includes(merchant) ||
                  (merchant === 'All' && selected.length === merchants.length - 1)}
                  onChange={() => handleMerchantChange(merchant)}
                />
                <label htmlFor={`merchant-${merchant}`}>{merchant}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersSection;
