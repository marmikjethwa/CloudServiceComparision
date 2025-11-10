import React, { useState, useEffect } from 'react';
import { Globe, DollarSign, Zap, Shield } from 'lucide-react';
import ServiceComparison from './components/ServiceComparison';
import PricingComparison from './components/PricingComparison';
import RegionalAvailability from './components/RegionalAvailability';
import FeatureMatrix from './components/FeatureMatrix';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { ServiceProvider } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('services');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProviders, setSelectedProviders] = useState<ServiceProvider[]>(['aws', 'gcp', 'azure']);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const tabs = [
    { id: 'services', label: 'Services', icon: Zap },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'features', label: 'Features', icon: Shield },
    { id: 'regions', label: 'Regions', icon: Globe }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'services':
        return <ServiceComparison searchTerm={searchTerm} selectedProviders={selectedProviders} isDark={isDark} />;
      case 'pricing':
        return <PricingComparison selectedProviders={selectedProviders} isDark={isDark} />;
      case 'features':
        return <FeatureMatrix selectedProviders={selectedProviders} isDark={isDark} />;
      case 'regions':
        return <RegionalAvailability selectedProviders={selectedProviders} isDark={isDark} />;
      default:
        return <ServiceComparison searchTerm={searchTerm} selectedProviders={selectedProviders} isDark={isDark} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedProviders={selectedProviders}
        setSelectedProviders={setSelectedProviders}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      
      <Navigation
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
      />

      <main className="container mx-auto px-4 py-8">
        {renderActiveTab()}
      </main>

      <footer className={`border-t mt-16 ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Cloud Service Comparison Dashboard - Compare AWS, GCP, and Azure services
            </p>
            <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Data updated regularly from public APIs and documentation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
