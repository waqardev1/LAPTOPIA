// // src/components/RecommendedLaptops.jsx
// import React, { useEffect, useState, useRef, useMemo } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// import styles from './RecommendedLaptops.module.css';
// import LaptopCard from './LaptopCard';
// import PreferencesSummary from './PreferencesSummary';
// import FilterBar from './FilterBar';
// import ReAskBox from './ReAskBox';
// import Pagination from './Pagination';
// import { useAuth } from '../context/AuthContext';

// const RecommendedLaptops = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   // Memoize preferences so the dependency doesn't trigger infinite re-renders
//   const { userPreferences = {} } = location.state || {};
//   const memoizedPreferences = useMemo(
//     () => userPreferences,
//     [JSON.stringify(userPreferences)]
//   );

//   const [filteredLaptops, setFilteredLaptops] = useState([]);
//   const [allLaptops, setAllLaptops] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);
//   const [justSaved, setJustSaved] = useState(null);
//   const [savedLaptops, setSavedLaptops] = useState([]);
//   const [loadingSaved, setLoadingSaved] = useState(false);
//   const laptopsPerPage = 6;
//   const initialLoad = useRef(true);

//   // Fetch laptops from DB only once per (user/preferences) combination
//   useEffect(() => {
//     let isMounted = true;
//     setLoading(true);

//     axios
//       .get('http://localhost:5000/api/laptops')
//       .then(({ data }) => {
//         if (!isMounted) return;
//         setAllLaptops(data);
//         setFilteredLaptops(data);

//         // Log recommendations (don't block UI on error)
//         axios.post('http://localhost:5000/api/recommendations/auto-log', {
//           userId: user ? user._id : null,
//           preferencesSource: memoizedPreferences.inputText
//             ? 'text'
//             : memoizedPreferences.advanced
//             ? 'advanced'
//             : 'basic',
//           preferences: memoizedPreferences,
//           recommendedLaptops: data,
//         }).catch(() => {});
//       })
//       .catch(() => {
//         toast.error("Couldn't connect to server. Showing offline data.");
//         import('./laptops.json').then((mod) => {
//           if (!isMounted) return;
//           setAllLaptops(mod.default);
//           setFilteredLaptops(mod.default);
//         });
//       })
//       .finally(() => {
//         if (isMounted) setLoading(false);
//       });

//     return () => { isMounted = false };
//     // Only refetch if user or preferences change
//     // eslint-disable-next-line
//   }, [user, memoizedPreferences]);

//   // Fetch saved laptops for this user
//   useEffect(() => {
//     if (!user || !user.token) {
//       setSavedLaptops([]);
//       return;
//     }
//     setLoadingSaved(true);
//     axios.get('http://localhost:5000/api/saved-laptops', {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//       withCredentials: true,
//     })
//       .then((res) => setSavedLaptops(res.data))
//       .catch(() => setSavedLaptops([]))
//       .finally(() => setLoadingSaved(false));
//   }, [user, justSaved]); // Refresh when user or new save

//   // Auto-save after login (if redirected after save attempt)
//   useEffect(() => {
//     if (user && initialLoad.current) {
//       const intent = sessionStorage.getItem('saveIntent');
//       if (intent) {
//         const { laptop, userPreferences } = JSON.parse(intent);
//         handleSave(laptop, userPreferences, true);
//         sessionStorage.removeItem('saveIntent');
//       }
//       initialLoad.current = false;
//     }
//     // eslint-disable-next-line
//   }, [user]);

//   // Save to account (User's profile)
//   const handleSave = async (laptop) => {
//     if (!user || !user.token) {
//       sessionStorage.setItem(
//         'saveIntent',
//         JSON.stringify({ laptop, userPreferences: memoizedPreferences })
//       );
//       toast.info('Please login to save laptops.');
//       navigate('/login', { state: { redirectTo: '/recommended-laptops' } });
//       return;
//     }
//     try {
//       setSavingId(laptop._id || laptop.name);
  
//       await axios.post(
//         'http://localhost:5000/api/saved-laptops',
//         {
//           laptop: {
//             name: laptop.name,
//             specs: laptop.specs,
//             price: laptop.price,
//             image: laptop.image,
//             storeLink: laptop.storeLink,
//             reason: laptop.reason,
//           },
//           preferences: memoizedPreferences,
//           preferencesSource: memoizedPreferences.inputText
//             ? 'text'
//             : memoizedPreferences.advanced
//             ? 'advanced'
//             : 'basic',
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       toast.success('Saved to your account');
//       setJustSaved(laptop._id || laptop.name);
//     } catch (err) {
//       toast.error('❌ Failed to save laptop.');
//       console.error(err.response?.data || err.message);
//     } finally {
//       setSavingId(null);
//     }
//   };
  

//   // Pagination logic
//   const lastIdx = currentPage * laptopsPerPage;
//   const firstIdx = lastIdx - laptopsPerPage;
//   const current = filteredLaptops.slice(firstIdx, lastIdx);

//   return (
//     <div className={styles.recommendedLaptopsContainer}>
//       <div className={styles.headerSection}>
//         <button
//           onClick={() => navigate(-1)}
//           className={styles.backButton}
//           aria-label="Go back to previous page"
//         >
//           ⬅ Back
//         </button>
//         <h1 className={styles.pageTitle}>Recommended Laptops</h1>
//         {user && (
//           <div className={styles.loggedInMsg}>
//             Logged in as <b>{user.name || user.email}</b>
//           </div>
//         )}
//       </div>

//       {/* --- User's Saved Laptops --- */}
//       {user && (
//         <section className={styles.savedSection}>
//           <h2>Your Saved Laptops</h2>
//           {loadingSaved ? (
//             <div className={styles.loadingIndicator}>Loading your saved laptops…</div>
//           ) : savedLaptops.length === 0 ? (
//             <div className={styles.emptyMsg}>No laptops saved yet.</div>
//           ) : (
//             <div className={styles.savedGrid}>
//               {savedLaptops.map((item, idx) => (
//                 <LaptopCard
//                   key={item._id || idx}
//                   data={item.laptop}
//                 />
//               ))}
//             </div>
//           )}
//         </section>
//       )}

//       <PreferencesSummary preferences={memoizedPreferences} />
//       <FilterBar />

//       {/* ───── Laptop Grid ───── */}
//       {loading ? (
//         <div className={styles.loadingIndicator} aria-live="polite">
//           Loading…
//         </div>
//       ) : (
//         <div className={styles.gridWrapper}>
//           <div className={styles.laptopGrid}>
//             {current.length > 0 ? (
//               current.map((lap, idx) => (
//                 <div
//                   key={lap._id || lap.name || idx}
//                   className={styles.cardCell}
//                 >
//                   {/* Only pass expected fields to LaptopCard */}
//                   <LaptopCard
//                     data={{
//                       name: lap.name,
//                       specs: lap.specs,
//                       price: lap.price,
//                       image: lap.image,
//                       storeLink: lap.storeLink,
//                       reason: lap.reason,
//                     }}
//                   />

//                   <button
//                     onClick={() => handleSave(lap)}
//                     className={styles.saveButton}
//                     disabled={savingId === (lap._id || lap.name)}
//                     aria-label={
//                       justSaved === (lap._id || lap.name)
//                         ? 'Laptop saved'
//                         : savingId === (lap._id || lap.name)
//                         ? 'Saving laptop…'
//                         : 'Save this laptop'
//                     }
//                   >
//                     {savingId === (lap._id || lap.name)
//                       ? 'Saving…'
//                       : justSaved === (lap._id || lap.name)
//                       ? '✔️ Saved'
//                       : '💾 Save'}
//                   </button>
//                   {justSaved === (lap._id || lap.name) && (
//                     <span className={styles.saveFeedback} role="status">
//                       Saved!
//                     </span>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No laptops to display.</p>
//             )}
//           </div>
//         </div>
//       )}

//       <Pagination
//         currentPage={currentPage}
//         totalPages={Math.ceil(filteredLaptops.length / laptopsPerPage)}
//         onPageChange={setCurrentPage}
//       />
//       <ReAskBox
//         value={inputText}
//         onChange={(e) => setInputText(e.target.value)}
//         onSubmit={() =>
//           navigate('/laptop-recommendation', { state: { inputText } })
//         }
//       />
//     </div>
//   );
// };

// export default RecommendedLaptops;




// src/components/RecommendedLaptops.jsx
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import styles from './RecommendedLaptops.module.css';
import LaptopCard from './LaptopCard';
import PreferencesSummary from './PreferencesSummary';
import FilterBar from './FilterBar';
import ReAskBox from './ReAskBox';
import Pagination from './Pagination';
import { useAuth } from '../context/AuthContext';

const RecommendedLaptops = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Memoize preferences so the dependency doesn't trigger infinite re-renders
  const { userPreferences = {} } = location.state || {};
  const memoizedPreferences = useMemo(
    () => userPreferences,
    [JSON.stringify(userPreferences)]
  );

  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [allLaptops, setAllLaptops] = useState([]);
  const [inputText, setInputText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [justSaved, setJustSaved] = useState(null);
  const [savedLaptops, setSavedLaptops] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const laptopsPerPage = 6;
  const initialLoad = useRef(true);

  // Helper function to transform database laptop object to expected format
  const transformLaptopData = (dbLaptop) => {
    // Create a comprehensive specs string from database fields
    const specs = [
      `${dbLaptop.cpu_brand} ${dbLaptop.cpu_name?.trim()} ${dbLaptop.cpu_speed}GHz`,
      `${dbLaptop.Ram}GB RAM`,
      dbLaptop.Memory || (dbLaptop.hdd > 0 ? `${dbLaptop.hdd}GB HDD` : '') + (dbLaptop.ssd > 0 ? ` + ${dbLaptop.ssd}GB SSD` : ''),
      `${dbLaptop.gpu_brand} ${dbLaptop.gpu_name?.trim()}`,
      `${dbLaptop.Inches}" Display`,
      dbLaptop.resolution_width && dbLaptop.resolution_height ? `${dbLaptop.resolution_width}x${dbLaptop.resolution_height}` : '',
      dbLaptop.touchscreen === "1" ? 'Touchscreen' : '',
      dbLaptop.ipspanel === "1" ? 'IPS Panel' : '',
      dbLaptop.retinadisplay === "1" ? 'Retina Display' : '',
      `${dbLaptop.OpSys}`,
      `${dbLaptop.Weight_kg}kg`
    ].filter(Boolean).join(', ');

    // Generate a display name
    const displayName = `${dbLaptop.Company} ${dbLaptop.TypeName} - ${dbLaptop.Inches}"`;

    // Format price (assuming it's in cents or needs formatting)
    const formattedPrice = `$${parseFloat(dbLaptop.Price).toLocaleString()}`;

    // Generate a basic reason based on specs (you might want to enhance this)
    let reason = '';
    const ram = parseInt(dbLaptop.Ram);
    const hasGoodCPU = dbLaptop.cpu_name?.includes('i7') || dbLaptop.cpu_name?.includes('i9') || dbLaptop.cpu_name?.includes('Ryzen 7') || dbLaptop.cpu_name?.includes('Ryzen 9');
    const hasGamingGPU = dbLaptop.gpu_name?.includes('GTX') || dbLaptop.gpu_name?.includes('RTX') || dbLaptop.gpu_name?.includes('Radeon');

    if (hasGamingGPU && ram >= 8) {
      reason = 'Great for gaming with dedicated graphics and sufficient RAM';
    } else if (hasGoodCPU && ram >= 16) {
      reason = 'Excellent for professional work and multitasking';
    } else if (ram >= 8 && dbLaptop.ssd > 0) {
      reason = 'Good balance of performance and storage for everyday use';
    } else if (parseInt(dbLaptop.Price) < 50000) {
      reason = 'Budget-friendly option for basic computing needs';
    } else {
      reason = 'Reliable laptop for general use';
    }

    return {
      _id: dbLaptop._id,
      name: displayName,
      specs: specs,
      price: formattedPrice,
      image: `/images/laptops/${dbLaptop.Company.toLowerCase()}-${dbLaptop.indx}.jpg`, // Placeholder image path
      storeLink: `#`, // You'll need to add actual store links
      reason: reason,
      // Keep original data for filtering
      originalData: dbLaptop
    };
  };

  // Function to filter laptops based on AI preferences
  const filterLaptopsByPreferences = (laptops, preferences) => {
    if (!laptops || laptops.length === 0) return [];
    
    let filtered = [...laptops];
    
    console.log('Filtering with preferences:', preferences);
    
    // Filter by budget
    if (preferences.budgetMin || preferences.budgetMax) {
      filtered = filtered.filter(laptop => {
        const price = parseFloat(laptop.originalData.Price || 0);
        const minBudget = preferences.budgetMin || 0;
        const maxBudget = preferences.budgetMax || Infinity;
        
        return price >= minBudget && price <= maxBudget;
      });
    }
    
    // Filter by purpose/usage
    if (preferences.purpose) {
      const purpose = preferences.purpose.toLowerCase();
      filtered = filtered.filter(laptop => {
        const specs = laptop.specs.toLowerCase();
        const reason = laptop.reason.toLowerCase();
        const originalData = laptop.originalData;
        
        // Gaming laptops
        if (purpose.includes('gaming')) {
          return originalData.gpu_name?.includes('GTX') || 
                 originalData.gpu_name?.includes('RTX') || 
                 originalData.gpu_name?.includes('Radeon') ||
                 parseInt(originalData.Ram) >= 8 ||
                 specs.includes('gaming') ||
                 reason.includes('gaming');
        }
        
        // Work/Business laptops
        if (purpose.includes('work') || purpose.includes('business') || purpose.includes('office')) {
          return (originalData.cpu_name?.includes('i5') || originalData.cpu_name?.includes('i7') || 
                  originalData.cpu_name?.includes('Ryzen 5') || originalData.cpu_name?.includes('Ryzen 7')) &&
                 parseInt(originalData.Ram) >= 8 ||
                 reason.includes('work') ||
                 reason.includes('professional');
        }
        
        // Student/School laptops
        if (purpose.includes('school') || purpose.includes('student') || purpose.includes('study')) {
          return parseFloat(originalData.Price) < 60000 && // Budget-friendly
                 parseInt(originalData.Ram) >= 4 ||
                 reason.includes('student') ||
                 reason.includes('basic');
        }
        
        // Multimedia/Creative
        if (purpose.includes('multimedia') || purpose.includes('creative') || purpose.includes('design')) {
          return parseInt(originalData.Ram) >= 16 ||
                 originalData.cpu_name?.includes('i7') ||
                 originalData.cpu_name?.includes('Ryzen 7') ||
                 originalData.resolution_width >= 1920 ||
                 reason.includes('creative');
        }
        
        return true; // If no specific purpose match, include all
      });
    }
    
    // Filter by brand preference
    if (preferences.brandPreference) {
      const brand = preferences.brandPreference.toLowerCase();
      filtered = filtered.filter(laptop => {
        const laptopBrand = laptop.originalData.Company.toLowerCase();
        return laptopBrand.includes(brand);
      });
    }
    
    // Filter by performance level
    if (preferences.performanceLevel) {
      const perfLevel = preferences.performanceLevel.toLowerCase();
      filtered = filtered.filter(laptop => {
        const originalData = laptop.originalData;
        const ram = parseInt(originalData.Ram);
        const hasHighEndCPU = originalData.cpu_name?.includes('i7') || 
                             originalData.cpu_name?.includes('i9') || 
                             originalData.cpu_name?.includes('Ryzen 7') || 
                             originalData.cpu_name?.includes('Ryzen 9');
        const hasMidRangeCPU = originalData.cpu_name?.includes('i5') || 
                              originalData.cpu_name?.includes('Ryzen 5');
        
        if (perfLevel.includes('high') || perfLevel.includes('premium')) {
          return hasHighEndCPU && ram >= 16 && originalData.ssd > 0;
        }
        
        if (perfLevel.includes('medium') || perfLevel.includes('mid')) {
          return (hasMidRangeCPU || hasHighEndCPU) && ram >= 8;
        }
        
        if (perfLevel.includes('low') || perfLevel.includes('basic')) {
          return ram >= 4;
        }
        
        return true;
      });
    }
    
    // Sort by relevance and value
    filtered = filtered.sort((a, b) => {
      let scoreA = 0, scoreB = 0;
      
      // Give bonus points for exact purpose matches
      if (preferences.purpose) {
        const purpose = preferences.purpose.toLowerCase();
        if (a.reason.toLowerCase().includes(purpose)) scoreA += 10;
        if (b.reason.toLowerCase().includes(purpose)) scoreB += 10;
      }
      
      // Give bonus points for budget matches
      if (preferences.budgetMin || preferences.budgetMax) {
        const priceA = parseFloat(a.originalData.Price || 0);
        const priceB = parseFloat(b.originalData.Price || 0);
        const targetBudget = ((preferences.budgetMin || 0) + (preferences.budgetMax || 100000)) / 2;
        
        scoreA += Math.max(0, 10 - Math.abs(priceA - targetBudget) / 10000);
        scoreB += Math.max(0, 10 - Math.abs(priceB - targetBudget) / 10000);
      }
      
      // Bonus for better specs
      const ramA = parseInt(a.originalData.Ram);
      const ramB = parseInt(b.originalData.Ram);
      scoreA += ramA / 4; // More RAM = higher score
      scoreB += ramB / 4;
      
      return scoreB - scoreA; // Higher score first
    });
    
    console.log(`Filtered ${laptops.length} laptops down to ${filtered.length}`);
    return filtered;
  };

  // Fetch laptops from DB and apply AI-based filtering
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    axios
      .get('http://localhost:5000/api/laptops')
      .then(({ data }) => {
        if (!isMounted) return;
        
        // Transform database format to expected format
        const transformedData = data.map(transformLaptopData);
        setAllLaptops(transformedData);
        
        // Apply AI-based filtering
        const filtered = filterLaptopsByPreferences(transformedData, memoizedPreferences);
        setFilteredLaptops(filtered);

        // Log recommendations (don't block UI on error)
        axios.post('http://localhost:5000/api/recommendations/auto-log', {
          userId: user ? user._id : null,
          preferencesSource: memoizedPreferences.inputText
            ? 'text'
            : memoizedPreferences.advanced
            ? 'advanced'
            : 'basic',
          preferences: memoizedPreferences,
          recommendedLaptops: filtered, // Log filtered results
        }).catch(() => {});
      })
      .catch(() => {
        toast.error("Couldn't connect to server. Showing offline data.");
        import('./laptops.json').then((mod) => {
          if (!isMounted) return;
          const transformedData = mod.default.map(transformLaptopData);
          setAllLaptops(transformedData);
          const filtered = filterLaptopsByPreferences(transformedData, memoizedPreferences);
          setFilteredLaptops(filtered);
        });
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false };
    // Only refetch if user or preferences change
    // eslint-disable-next-line
  }, [user, memoizedPreferences]);

  // Fetch saved laptops for this user
  useEffect(() => {
    if (!user || !user.token) {
      setSavedLaptops([]);
      return;
    }
    setLoadingSaved(true);
    axios.get('http://localhost:5000/api/saved-laptops', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      withCredentials: true,
    })
      .then((res) => setSavedLaptops(res.data))
      .catch(() => setSavedLaptops([]))
      .finally(() => setLoadingSaved(false));
  }, [user, justSaved]); // Refresh when user or new save

  // Auto-save after login (if redirected after save attempt)
  useEffect(() => {
    if (user && initialLoad.current) {
      const intent = sessionStorage.getItem('saveIntent');
      if (intent) {
        const { laptop, userPreferences } = JSON.parse(intent);
        handleSave(laptop, userPreferences, true);
        sessionStorage.removeItem('saveIntent');
      }
      initialLoad.current = false;
    }
    // eslint-disable-next-line
  }, [user]);

  // Save to account (User's profile)
  const handleSave = async (laptop) => {
    if (!user || !user.token) {
      sessionStorage.setItem(
        'saveIntent',
        JSON.stringify({ laptop, userPreferences: memoizedPreferences })
      );
      toast.info('Please login to save laptops.');
      navigate('/login', { state: { redirectTo: '/recommended-laptops' } });
      return;
    }
    try {
      setSavingId(laptop._id || laptop.name);
  
      await axios.post(
        'http://localhost:5000/api/saved-laptops',
        {
          laptop: {
            name: laptop.name,
            specs: laptop.specs,
            price: laptop.price,
            image: laptop.image,
            storeLink: laptop.storeLink,
            reason: laptop.reason,
            originalData: laptop.originalData // Include original DB data
          },
          preferences: memoizedPreferences,
          preferencesSource: memoizedPreferences.inputText
            ? 'text'
            : memoizedPreferences.advanced
            ? 'advanced'
            : 'basic',
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      toast.success('Saved to your account');
      setJustSaved(laptop._id || laptop.name);
    } catch (err) {
      toast.error('❌ Failed to save laptop.');
      console.error(err.response?.data || err.message);
    } finally {
      setSavingId(null);
    }
  };
  

  // Pagination logic
  const lastIdx = currentPage * laptopsPerPage;
  const firstIdx = lastIdx - laptopsPerPage;
  const current = filteredLaptops.slice(firstIdx, lastIdx);

  return (
    <div className={styles.recommendedLaptopsContainer}>
      <div className={styles.headerSection}>
        <button
          onClick={() => navigate(-1)}
          className={styles.backButton}
          aria-label="Go back to previous page"
        >
          ⬅ Back
        </button>
        <h1 className={styles.pageTitle}>Recommended Laptops</h1>
        {user && (
          <div className={styles.loggedInMsg}>
            Logged in as <b>{user.name || user.email}</b>
          </div>
        )}
      </div>

      {/* Show filtering summary */}
      {filteredLaptops.length !== allLaptops.length && allLaptops.length > 0 && (
        <div className={styles.filterSummary}>
          <p>🎯 Found {filteredLaptops.length} laptops matching your preferences out of {allLaptops.length} total laptops.</p>
        </div>
      )}

      {/* --- User's Saved Laptops --- */}
      {user && (
        <section className={styles.savedSection}>
          <h2>Your Saved Laptops</h2>
          {loadingSaved ? (
            <div className={styles.loadingIndicator}>Loading your saved laptops…</div>
          ) : savedLaptops.length === 0 ? (
            <div className={styles.emptyMsg}>No laptops saved yet.</div>
          ) : (
            <div className={styles.savedGrid}>
              {savedLaptops.map((item, idx) => (
                <LaptopCard
                  key={item._id || idx}
                  data={item.laptop}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <PreferencesSummary preferences={memoizedPreferences} />
      <FilterBar />

      {/* ───── Laptop Grid ───── */}
      {loading ? (
        <div className={styles.loadingIndicator} aria-live="polite">
          Loading…
        </div>
      ) : (
        <div className={styles.gridWrapper}>
          <div className={styles.laptopGrid}>
            {current.length > 0 ? (
              current.map((lap, idx) => (
                <div
                  key={lap._id || lap.name || idx}
                  className={styles.cardCell}
                >
                  {/* Only pass expected fields to LaptopCard */}
                  <LaptopCard
                    data={{
                      name: lap.name,
                      specs: lap.specs,
                      price: lap.price,
                      image: lap.image,
                      storeLink: lap.storeLink,
                      reason: lap.reason,
                    }}
                  />

                  <button
                    onClick={() => handleSave(lap)}
                    className={styles.saveButton}
                    disabled={savingId === (lap._id || lap.name)}
                    aria-label={
                      justSaved === (lap._id || lap.name)
                        ? 'Laptop saved'
                        : savingId === (lap._id || lap.name)
                        ? 'Saving laptop…'
                        : 'Save this laptop'
                    }
                  >
                    {savingId === (lap._id || lap.name)
                      ? 'Saving…'
                      : justSaved === (lap._id || lap.name)
                      ? '✔️ Saved'
                      : '💾 Save'}
                  </button>
                  {justSaved === (lap._id || lap.name) && (
                    <span className={styles.saveFeedback} role="status">
                      Saved!
                    </span>
                  )}
                </div>
              ))
            ) : filteredLaptops.length === 0 && allLaptops.length > 0 ? (
              <div className={styles.noResults}>
                <p>😕 No laptops match your specific preferences.</p>
                <button 
                  onClick={() => setFilteredLaptops(allLaptops)}
                  className={styles.showAllButton}
                >
                  Show All Laptops
                </button>
              </div>
            ) : (
              <p>No laptops to display.</p>
            )}
          </div>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredLaptops.length / laptopsPerPage)}
        onPageChange={setCurrentPage}
      />
      <ReAskBox
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onSubmit={() =>
          navigate('/laptop-recommendation', { state: { inputText } })
        }
      />
    </div>
  );
};

export default RecommendedLaptops;