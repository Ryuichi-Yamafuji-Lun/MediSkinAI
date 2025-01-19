import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import WelcomePage from './components/pages/WelcomePage';
import AboutPage from './components/pages/AboutPage';
import ResultPage from './components/pages/ResultPage';
import DetectionPage from './components/pages/DetectionPage';
import PrivacyPolicyPage from './components/pages/PrivacyPolicy';
import TermsAndConditionsPage from './components/pages/Terms';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
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
