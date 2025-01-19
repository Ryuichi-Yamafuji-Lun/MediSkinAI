import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import MainLayout from './components/layout/MainLayout';
import WelcomePage from './components/pages/WelcomePage';
import AboutPage from './components/pages/AboutPage';
import ResultPage from './components/pages/ResultPage';
import DetectionPage from './components/pages/DetectionPage';
import PrivacyPolicyPage from './components/pages/PrivacyPolicy';
import TermsAndConditionsPage from './components/pages/Terms';
import ScrollToTop from './components/ScrollToTop';

const Tracking_ID = import.meta.env.VITE_GOOGLE_TRACKING_ID;
ReactGA.initialize(Tracking_ID);


function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;

    // Log pageview
    ReactGA.pageview(path);

    // Check for how many users for the main website
    if (path === "/") {
      ReactGA.event({
        category: "Page Visit",
        action: "Home Page Viewed",
      });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <AnalyticsTracker />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout><WelcomePage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/detection" element={<MainLayout><DetectionPage /></MainLayout>} />
        <Route path="/result" element={<MainLayout><ResultPage /></MainLayout>} />
        <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicyPage /></MainLayout>} />
        <Route path="/terms-and-conditions" element={<MainLayout><TermsAndConditionsPage /></MainLayout>} />
        {/* re-route nonexistent routes to welcome page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
