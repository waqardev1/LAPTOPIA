import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SelectedComponentsContext } from '../context/SelectedComponentsContext';
import styles from './CustomPc.module.css';

const componentTypes = [
  'CPU',
  'CPU Cooler',
  'Motherboard',
  'Memory',
  'Storage',
  'Video Card',
  'Case',
  'Power Supply',
  'Operating System',
  'Monitor',
];

const toKey = (type) => type.toLowerCase().replace(/\s+/g, '-');

const CustomPc = () => {
  const navigate = useNavigate();
  const { selectedComponents, setSelectedComponents } = useContext(SelectedComponentsContext);

  // Helper: Get selected component by type
  const getSelected = (name) => selectedComponents.find((c) => toKey(c.name) === toKey(name));

  // Remove selected component by type
  const handleDeleteComponent = (name) => {
    setSelectedComponents(selectedComponents.filter((c) => toKey(c.name) !== toKey(name)));
  };

  const totalWattage = selectedComponents.reduce((sum, comp) => sum + (comp.wattage || 0), 0);

  return (
    <div className={styles.customPcContainer}>
      <h1 className={styles.pageTitle}>Custom PC Builder</h1>
      <div className={styles.statusBar}>
        <div className={styles.compatibilityStatus}>
          <span>Compatibility:</span> No issues or incompatibilities found.
        </div>
        <div className={styles.separator}></div>
        <div className={styles.estimatedWattage}>
          <span>Estimated Wattage:</span> {totalWattage}W
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Component</th>
            <th>Selection</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Power</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {componentTypes.map((type) => {
            const selected = getSelected(type);
            return (
              <tr key={type}>
                <td>{type}</td>
                <td>
                  {selected ? (
                    <span>
                      {selected.brand ? `${selected.brand} ` : ''}
                      {selected.model || selected.selection || selected.name || ''}
                    </span>
                  ) : (
                    <Link
                      to={`/custom-pc/select/${toKey(type)}`}
                      className={styles.selectionButton}
                    >
                      Add {type}
                    </Link>
                  )}
                </td>
                <td>{selected?.price ? `Rs ${selected.price}` : '-'}</td>
                <td>{selected?.availability || '-'}</td>
                <td>{selected?.wattage ? `${selected.wattage}W` : '-'}</td>
                <td>
                  {selected && (
                    <button
                      onClick={() => handleDeleteComponent(type)}
                      className={styles.deleteButton}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => navigate('/built-pc-summary')} className={styles.viewBuildButton}>
        View Build PC
      </button>
    </div>
  );
};

export default CustomPc;
