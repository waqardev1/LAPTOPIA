import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LaptopRecommendations.module.css';

const LaptopRecommendations = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = {};

    form.forEach((value, key) => {
      if (formData[key]) {
        if (Array.isArray(formData[key])) {
          formData[key].push(value);
        } else {
          formData[key] = [formData[key], value];
        }
      } else {
        formData[key] = value;
      }
    });

    // Flag the form as advanced
    formData.advanced = true;

    // Navigate to recommended laptops page with preferences
    navigate('/recommended-laptops', { state: { userPreferences: formData } });
  };

  return (
    <div className={styles.recommendationSection}>
      <h2 className={styles.sectionTitle}>Advanced Laptop Recommendation</h2>
     <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label>Budget Range *</label>
              <select className={styles.formControl} required>
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
                  <input type="radio" name="usagePurpose" value="Gaming" required />
                  Gaming
                </label>
                <label>
                  <input type="radio" name="usagePurpose" value="Work" required />
                  Work
                </label>
                <label>
                  <input type="radio" name="usagePurpose" value="School" required />
                  School
                </label>
                <label>
                  <input type="radio" name="usagePurpose" value="Multimedia" required />
                  Multimedia
                </label>
                <label>
                  <input type="radio" name="usagePurpose" value="General Use" required />
                  General Use
                </label>
              </div>
            </div>
          </div>
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label>Brand Preference</label>
              <div>
                <label>
                  <input type="checkbox" name="brandPreference" value="Dell" />
                  Dell
                </label>
                <label>
                  <input type="checkbox" name="brandPreference" value="HP" />
                  HP
                </label>
                <label>
                  <input type="checkbox" name="brandPreference" value="Lenovo" />
                  Lenovo
                </label>
                <label>
                  <input type="checkbox" name="brandPreference" value="Apple" />
                  Apple
                </label>
                <label>
                  <input type="checkbox" name="brandPreference" value="ASUS" />
                  ASUS
                </label>
                <label>
                  <input type="checkbox" name="brandPreference" value="Acer" />
                  Acer
                </label>
                <label>
                  <input type="checkbox" name="brandPreference" value="Others" />
                  Others
                </label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Battery Life</label>
              <select className={styles.formControl}>
                <option value="">Select Battery Life</option>
                <option value="Less than 5 hours">Less than 5 hours</option>
                <option value="5-8 hours">5-8 hours</option>
                <option value="8-12 hours">8-12 hours</option>
                <option value="More than 12 hours">More than 12 hours</option>
              </select>
            </div>
          </div>
        </div>
         <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label>Weight</label>
                      <select className={styles.formControl}>
                        <option value="">Select Weight</option>
                        <option value="Less than 2 kg">Less than 2 kg</option>
                        <option value="2-3 kg">2-3 kg</option>
                        <option value="3-4 kg">3-4 kg</option>
                        <option value="More than 4 kg">More than 4 kg</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Screen Size</label>
                      <div>
                        <label>
                          <input type="radio" name="screenSize" value="11-13 inches" />
                          11-13 inches
                        </label>
                        <label>
                          <input type="radio" name="screenSize" value="13-15 inches" />
                          13-15 inches
                        </label>
                        <label>
                          <input type="radio" name="screenSize" value="15-17 inches" />
                          15-17 inches
                        </label>
                        <label>
                          <input type="radio" name="screenSize" value="17 inches and above" />
                          17 inches and above
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label>Screen Resolution</label>
                      <select className={styles.formControl}>
                        <option value="">Select Screen Resolution</option>
                        <option value="HD (1280x720)">HD (1280x720)</option>
                        <option value="Full HD (1920x1080)">Full HD (1920x1080)</option>
                        <option value="2K (2560x1440)">2K (2560x1440)</option>
                        <option value="4K (3840x2160)">4K (3840x2160)</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Operating System</label>
                      <div>
                        <label>
                          <input type="radio" name="operatingSystem" value="Windows" />
                          Windows
                        </label>
                        <label>
                          <input type="radio" name="operatingSystem" value="macOS" />
                          macOS
                        </label>
                        <label>
                          <input type="radio" name="operatingSystem" value="Linux" />
                          Linux
                        </label>
                        <label>
                          <input type="radio" name="operatingSystem" value="Chrome OS" />
                          Chrome OS
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label>Processor Type</label>
                      <select className={styles.formControl}>
                        <option value="">Select Processor Type</option>
                        <option value="Intel Core i3">Intel Core i3</option>
                        <option value="Intel Core i5">Intel Core i5</option>
                        <option value="Intel Core i7">Intel Core i7</option>
                        <option value="Intel Core i9">Intel Core i9</option>
                        <option value="AMD Ryzen 3">AMD Ryzen 3</option>
                        <option value="AMD Ryzen 5">AMD Ryzen 5</option>
                        <option value="AMD Ryzen 7">AMD Ryzen 7</option>
                        <option value="AMD Ryzen 9">AMD Ryzen 9</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>RAM</label>
                      <select className={styles.formControl}>
                        <option value="">Select RAM</option>
                        <option value="4GB">4GB</option>
                        <option value="8GB">8GB</option>
                        <option value="16GB">16GB</option>
                        <option value="32GB">32GB</option>
                        <option value="64GB">64GB</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label>Storage Type</label>
                      <div>
                        <label>
                          <input type="radio" name="storageType" value="SSD" />
                          SSD
                        </label>
                        <label>
                          <input type="radio" name="storageType" value="HDD" />
                          HDD
                        </label>
                        <label>
                          <input type="radio" name="storageType" value="Hybrid (SSD + HDD)" />
                          Hybrid (SSD + HDD)
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Storage Capacity</label>
                      <select className={styles.formControl}>
                        <option value="">Select Storage Capacity</option>
                        <option value="128GB">128GB</option>
                        <option value="256GB">256GB</option>
                        <option value="512GB">512GB</option>
                        <option value="1TB">1TB</option>
                        <option value="2TB">2TB</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label>Graphics Card</label>
                      <div>
                        <label>
                          <input type="checkbox" name="graphicsCard" value="NVIDIA GeForce GTX series" />
                          NVIDIA GeForce GTX series
                        </label>
                        <label>
                          <input type="checkbox" name="graphicsCard" value="NVIDIA GeForce RTX series" />
                          NVIDIA GeForce RTX series
                        </label>
                        <label>
                          <input type="checkbox" name="graphicsCard" value="AMD Radeon RX series" />
                          AMD Radeon RX series
                        </label>
                        <label>
                          <input type="checkbox" name="graphicsCard" value="Intel Integrated Graphics" />
                          Intel Integrated Graphics
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Portability</label>
                      <div>
                        <label>
                          <input type="radio" name="portability" value="Not Important" />
                          Not Important
                        </label>
                        <label>
                          <input type="radio" name="portability" value="Somewhat Important" />
                          Somewhat Important
                        </label>
                        <label>
                          <input type="radio" name="portability" value="Very Important" />
                          Very Important
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label>Build Quality</label>
                      <div>
                        <label>
                          <input type="radio" name="buildQuality" value="Plastic" />
                          Plastic
                        </label>
                        <label>
                          <input type="radio" name="buildQuality" value="Aluminum" />
                          Aluminum
                        </label>
                        <label>
                          <input type="radio" name="buildQuality" value="Carbon Fiber" />
                          Carbon Fiber
                        </label>
                        <label>
                          <input type="radio" name="buildQuality" value="Other" />
                          Other
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Keyboard and Touchpad Quality</label>
                      <div>
                        <label>
                          <input type="radio" name="keyboardQuality" value="Not Important" />
                          Not Important
                        </label>
                        <label>
                          <input type="radio" name="keyboardQuality" value="Somewhat Important" />
                          Somewhat Important
                        </label>
                        <label>
                          <input type="radio" name="keyboardQuality" value="Very Important" />
                          Very Important
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label>Additional Features</label>
                      <div>
                        <label>
                          <input type="checkbox" name="additionalFeatures" value="Fingerprint Reader" />
                          Fingerprint Reader
                        </label>
                        <label>
                          <input type="checkbox" name="additionalFeatures" value="HD Webcam" />
                          HD Webcam
                        </label>
                        <label>
                          <input type="checkbox" name="additionalFeatures" value="Backlit Keyboard" />
                          Backlit Keyboard
                        </label>
                        <label>
                          <input type="checkbox" name="additionalFeatures" value="Touchscreen" />
                          Touchscreen
                        </label>
                        <label>
                          <input type="checkbox" name="additionalFeatures" value="USB-C Ports" />
                          USB-C Ports
                        </label>
                        <label>
                          <input type="checkbox" name="additionalFeatures" value="HDMI Ports" />
                          HDMI Ports
                        </label>
                        <label>
                          <input type="checkbox" name="additionalFeatures" value="Thunderbolt Ports" />
                          Thunderbolt Ports
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label>Warranty and Support</label>
                      <select className={styles.formControl}>
                        <option value="">Select Warranty and Support</option>
                        <option value="No warranty">No warranty</option>
                        <option value="1-year warranty">1-year warranty</option>
                        <option value="2-year warranty">2-year warranty</option>
                        <option value="3-year warranty">3-year warranty</option>
                        <option value="On-site service">On-site service</option>
                        <option value="Phone support">Phone support</option>
                        <option value="Email support">Email support</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Customization Options</label>
                      <div>
                        <label>
                          <input type="checkbox" name="customizationOptions" value="Upgradeable RAM" />
                          Upgradeable RAM
                        </label>
                        <label>
                          <input type="checkbox" name="customizationOptions" value="Upgradeable SSD" />
                          Upgradeable SSD
                        </label>
                        <label>
                          <input type="checkbox" name="customizationOptions" value="Upgradeable GPU" />
                          Upgradeable GPU
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label>Cooling System</label>
                      <div>
                        <label>
                          <input type="radio" name="coolingSystem" value="Basic Cooling" />
                          Basic Cooling
                        </label>
                        <label>
                          <input type="radio" name="coolingSystem" value="Dual Fans" />
                          Dual Fans
                        </label>
                        <label>
                          <input type="radio" name="coolingSystem" value="Liquid Cooling" />
                          Liquid Cooling
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Connectivity Options</label>
                      <div>
                        <label>
                          <input type="checkbox" name="connectivityOptions" value="USB-C" />
                          USB-C
                        </label>
                        <label>
                          <input type="checkbox" name="connectivityOptions" value="HDMI" />
                          HDMI
                        </label>
                        <label>
                          <input type="checkbox" name="connectivityOptions" value="Thunderbolt" />
                          Thunderbolt
                        </label>
                        <label>
                          <input type="checkbox" name="connectivityOptions" value="Ethernet" />
                          Ethernet
                        </label>
                        <label>
                          <input type="checkbox" name="connectivityOptions" value="SD Card Reader" />
                          SD Card Reader
                        </label>
                        <label>
                          <input type="checkbox" name="connectivityOptions" value="3.5mm Audio Jack" />
                          3.5mm Audio Jack
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formColumn}>
                    <div className={styles.formGroup}>
                      <label>Battery Type</label>
                      <div>
                        <label>
                          <input type="radio" name="batteryType" value="Lithium-ion" />
                          Lithium-ion
                        </label>
                        <label>
                          <input type="radio" name="batteryType" value="Lithium-polymer" />
                          Lithium-polymer
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Software and Pre-installed Apps</label>
                      <div>
                        <label>
                          <input type="radio" name="softwareApps" value="Minimal pre-installed apps" />
                          Minimal pre-installed apps
                        </label>
                        <label>
                          <input type="radio" name="softwareApps" value="Standard pre-installed apps" />
                          Standard pre-installed apps
                        </label>
                        <label>
                          <input type="radio" name="softwareApps" value="Custom software options" />
                          Custom software options
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
        <button type="submit" className={styles.ctaButton}>Get Recommendations</button>
      </form>
    </div>
  );
};

export default LaptopRecommendations;
