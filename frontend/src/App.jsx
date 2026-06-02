import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component Imports
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import GreenHero from './components/GreenHero';
import ImpactStats from './components/ImpactStats';
import Testimonials from './components/Testimonials';
import RegistrationForm from './components/RegistrationForm';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

export default function App() {
  const [registrations, setRegistrations] = useState([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all registrations from Express backend
  const fetchRegistrations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/registrations');
      if (response.data && response.data.success) {
        setRegistrations(response.data.data);
      }
    } catch (error) {
      console.error("Error communicating with backend registrations API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleAdminToggle = () => {
    setIsAdminOpen(!isAdminOpen);
  };

  return (
    <div className="app-wrapper">
      {/* Sticky Navigation */}
      <Header onAdminToggle={handleAdminToggle} isAdminView={isAdminOpen} />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Problem Section */}
        <Problem />

        {/* Benefits Section */}
        <Benefits />

        {/* Process Timeline */}
        <HowItWorks />

        {/* Gamified Badges */}
        <GreenHero />

        {/* Real-time Counters */}
        <ImpactStats />

        {/* Testimonials */}
        <Testimonials />

        {/* Booking Form */}
        <RegistrationForm onRegistrationSuccess={fetchRegistrations} />
      </main>

      {/* Admin Panel Modal (GET integrations) */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        registrations={registrations} 
        onRefresh={fetchRegistrations}
      />

      {/* Footer Details */}
      <Footer />
    </div>
  );
}
