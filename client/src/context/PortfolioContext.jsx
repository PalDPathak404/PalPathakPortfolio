import { createContext, useContext, useState, useEffect } from 'react';
import { projectsData, skillsData, certificatesData, hackathonsData, achievementsData, educationData } from '../data/data.js';

const PortfolioContext = createContext(undefined);

export const PortfolioProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeSection, setActiveSection] = useState('hero');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [activeCertId, setActiveCertId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [projects] = useState(projectsData);
  const [skills] = useState(skillsData);
  const [certificates] = useState(certificatesData);
  const [hackathons] = useState(hackathonsData);
  const [achievements] = useState(achievementsData);
  const [education] = useState(educationData);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <PortfolioContext.Provider value={{
      theme, toggleTheme,
      activeSection, setActiveSection,
      isResumeModalOpen, setIsResumeModalOpen,
      isProjectModalOpen, setIsProjectModalOpen,
      activeProjectId, setActiveProjectId,
      isCertificateModalOpen, setIsCertificateModalOpen,
      activeCertId, setActiveCertId,
      projects, skills, certificates, hackathons, achievements, education,
      isLoading
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
};
