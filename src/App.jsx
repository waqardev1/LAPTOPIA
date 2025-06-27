// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from "./components/ForgotPassword";
import Home from './components/Home';
import About from './components/About';
import Header from './components/Header';
import Footer from './components/Footer';
import LaptopRecommendations from './components/LaptopRecommendations';
import CustomPc from './components/CustomPc';
import LatestModelsPage from './components/LatestModelsPage';
import LaptopDetails from './components/LaptopDetails';
import ComponentSelection from './components/ComponentSelection';
import BuiltPcSummary from './components/BuiltPcSummary';
import LoginPage from './components/LoginPage';
import RecommendedLaptops from './components/RecommendedLaptops';
import LaptopRecommendation from './components/LaptopRecommendation';
import SavedLaptops from './components/SavedLaptops';

import CreateAccount from './components/CreateAccount'; // <--- ADD THIS LINE

import { SelectedComponentsProvider } from './context/SelectedComponentsProvider';
import { AuthProvider } from './context/AuthContext.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './App.module.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SelectedComponentsProvider>
          <div className={styles.layout}>
            <Header />
            <main className={styles.mainContent}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/recommendations" element={<LaptopRecommendations />} />
                <Route path="/laptop-recommendation" element={<LaptopRecommendation />} />
                <Route path="/custom-pc" element={<CustomPc />} />
                <Route path="/latest" element={<LatestModelsPage />} />
                <Route path="/laptop-details" element={<LaptopDetails />} />
                <Route path="/custom-pc/select/:componentName" element={<ComponentSelection />} />
                <Route path="/built-pc-summary" element={<BuiltPcSummary />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/recommended-laptops" element={<RecommendedLaptops />} />
                <Route path="/saved" element={<SavedLaptops />} />
                <Route path="/create-account" element={<CreateAccount />} /> {/* <-- ADD THIS LINE */}
                <Route path="/forgot-password" element={<ForgotPassword />} />

              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
        </SelectedComponentsProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
