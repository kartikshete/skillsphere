import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Profile from './pages/Profile';
import ProgressReport from './pages/ProgressReport';
import Certificate from './pages/Certificate';
import AIChatbot from './pages/AIChatbot';
import SkillPrint from './pages/SkillPrint';
import QuizGenerator from './pages/QuizGenerator';
import Analysis from './pages/Analysis';
import Sidebar from './components/Sidebar';

const LevelBackground = () => (
  <div className="level-bg">
    <div className="level-layer level-1"></div>
    <div className="level-layer level-2"></div>
    <div className="level-layer level-3"></div>
  </div>
);

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
  }, [theme, language]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <Router>
      <div className="app-container">
        <LevelBackground />
        <Sidebar theme={theme} toggleTheme={toggleTheme} language={language} setLanguage={setLanguage} />
        <div className="w-full min-h-screen p-4 pt-20 md:p-8 md:pl-72 transition-all duration-300">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/assessment" element={<Assessment language={language} />} />
            <Route path="/dashboard" element={<Dashboard language={language} />} />
            <Route path="/chatbot" element={<AIChatbot language={language} />} />
            <Route path="/quiz" element={<QuizGenerator language={language} />} />
            <Route path="/skillprint" element={<SkillPrint language={language} />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/progress" element={<ProgressReport />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/certificate" element={<Certificate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
