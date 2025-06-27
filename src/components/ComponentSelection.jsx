import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SelectedComponentsContext } from '../context/SelectedComponentsContext';
import styles from './ComponentSelection.module.css';

const COMPONENT_API = {
  cpu: '/api/cpus',
  'cpu-cooler': '/api/cpu-coolers',
  motherboard: '/api/motherboards',
  memory: '/api/memory',
  storage: '/api/storage',
  'video-card': '/api/video-cards',
  case: '/api/cases',
  'power-supply': '/api/power-supplies',
  'operating-system': '/api/operating-systems',
  monitor: '/api/monitors',
};

const COMPONENT_TABLES = {
  cpu: [
    { key: 'name', label: 'Name' },
    { key: 'manufacturer', label: 'Manufacturer' },
    { key: '# of CPU Cores', label: 'Cores' },
    { key: '# of Threads', label: 'Threads' },
    { key: 'Base Clock', label: 'Base Clock' },
    { key: 'Max Boost Clock', label: 'Boost Clock' },
    { key: 'Default TDP', label: 'TDP' },
    { key: 'CPU Socket', label: 'Socket' },
    { key: 'Graphics Model', label: 'Graphics' },
    { key: 'price', label: 'Price' },
  ],
  'cpu-cooler': [
    { key: 'name', label: 'Name' },
    { key: 'rpm', label: 'RPM' },
    { key: 'noise_level', label: 'Noise (dB)' },
    { key: 'color', label: 'Color' },
    { key: 'size', label: 'Size (mm)' },
    { key: 'price', label: 'Price' },
  ],
  motherboard: [
    { key: 'name', label: 'Name' },
    { key: 'socket', label: 'Socket' },
    { key: 'form_factor', label: 'Form Factor' },
    { key: 'max_memory', label: 'Max Memory (GB)' },
    { key: 'memory_slots', label: 'Slots' },
    { key: 'color', label: 'Color' },
    { key: 'price', label: 'Price' },
  ],
  memory: [
    { key: 'name', label: 'Name' },
    { key: 'speed', label: 'Speed (MHz)' },
    { key: 'modules', label: 'Modules' },
    { key: 'first_word_latency', label: 'FW Latency' },
    { key: 'cas_latency', label: 'CAS Latency' },
    { key: 'color', label: 'Color' },
    { key: 'price', label: 'Price' },
  ],
  storage: [
    { key: 'name', label: 'Name' },
    { key: 'capacity', label: 'Capacity (GB)' },
    { key: 'form_factor', label: 'Form Factor' },
    { key: 'interface', label: 'Interface' },
    { key: 'cache', label: 'Cache (MB)' },
    { key: 'type', label: 'Type' },
    { key: 'price', label: 'Price' },
  ],
  'video-card': [
    { key: 'name', label: 'Name' },
    { key: 'chipset', label: 'Chipset' },
    { key: 'memory', label: 'Memory' },
    { key: 'core_clock', label: 'Core Clock' },
    { key: 'boost_clock', label: 'Boost Clock' },
    { key: 'color', label: 'Color' },
    { key: 'price', label: 'Price' },
  ],
  case: [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'color', label: 'Color' },
    { key: 'side_panel', label: 'Side Panel' },
    { key: 'internal_35_bays', label: '3.5\ " Bays' },
    { key: 'external_525_bays', label: '5.25\ " Bays' },
    { key: 'price', label: 'Price' },
  ],
  'power-supply': [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'efficiency', label: 'Efficiency' },
    { key: 'wattage', label: 'Wattage' },
    { key: 'modular', label: 'Modular' },
    { key: 'price', label: 'Price' },
  ],
  'operating-system': [
    { key: 'name', label: 'Name' },
    { key: 'mode', label: 'Mode' },
    { key: 'max_memory', label: 'Max Memory (GB)' },
    { key: 'price', label: 'Price' },
  ],
  monitor: [
    { key: 'name', label: 'Name' },
    { key: 'screen_size', label: 'Size (in)' },
    { key: 'resolution', label: 'Resolution' },
    { key: 'refresh_rate', label: 'Refresh Rate' },
    { key: 'response_time', label: 'Resp. Time (ms)' },
    { key: 'panel_type', label: 'Panel' },
    { key: 'aspect_ratio', label: 'Aspect Ratio' },
    { key: 'price', label: 'Price' },
  ],
};

function formatCell(value) {
  if (Array.isArray(value)) return value.join(' x ');
  if (typeof value === 'object' && value !== null) return JSON.stringify(value);
  if (value === null || value === undefined) return '—';
  return value;
}

const PER_PAGE = 15;

const toApiKey = (name) =>
  name.toLowerCase().replace(/\s+/g, '-');

const ComponentSelection = () => {
  const { componentName } = useParams();
  const navigate = useNavigate();
  const { setSelectedComponents } = useContext(SelectedComponentsContext);

  const apiKey = toApiKey(componentName);
  const apiUrl = COMPONENT_API[apiKey];
  const tableCols = COMPONENT_TABLES[apiKey] || [];

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('az');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!apiUrl) return;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((resp) => setData(Array.isArray(resp) ? resp : resp[apiKey.replace(/-/g, '') + 's'] || resp.cpus || []))
      .catch(() => setData([]));
  }, [apiUrl, componentName]);

  const filtered = data.filter((item) =>
    !searchTerm ||
    Object.values(item).some(
      v => v && v.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    const nameA = a.name ? a.name.toLowerCase() : '';
    const nameB = b.name ? b.name.toLowerCase() : '';
    return sort === 'az' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const pageCount = Math.ceil(sorted.length / PER_PAGE);
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleAddComponent = (component) => {
    setSelectedComponents(prev => [
      ...prev.filter(c => toApiKey(c.name) !== apiKey),
      { ...component, name: componentName }
    ]);
    navigate('/custom-pc');
  };

  return (
    <div className={styles.gridWrapper}>
      <main className={styles.mainContent}>
        <div className={styles.headerRow}>
          <h1 className={styles.pageTitle}>Select {componentName.replace(/-/g, ' ')}</h1>
          <div className={styles.filterBar}>
            <input
              type="text"
              placeholder={`Search ${componentName.replace(/-/g, ' ')}…`}
              className={styles.searchInput}
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
            <select
              className={styles.sortSelect}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="az">Sort: A-Z</option>
              <option value="za">Sort: Z-A</option>
            </select>
          </div>
        </div>
        <div className={styles.componentList}>
          <table className={styles.componentsTable}>
            <thead>
              <tr>
                {tableCols.map(col => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={tableCols.length + 1} className={styles.notFoundCell}>
                    No {componentName} found.
                  </td>
                </tr>
              ) : (
                paginated.map((item, idx) => (
                  <tr key={item._id || idx}>
                    {tableCols.map(col => (
                      <td key={col.key}>{formatCell(item[col.key])}</td>
                    ))}
                    <td>
                      <button
                        onClick={() => handleAddComponent(item)}
                        className={styles.addButton}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.paginationBar}>
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className={styles.paginationBtn}
          >
            Previous
          </button>
          <span>
            Page {page} of {pageCount || 1}
          </span>
          <button
            disabled={page >= pageCount}
            onClick={() => setPage(page + 1)}
            className={styles.paginationBtn}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default ComponentSelection;
 