import React, { useState } from 'react';
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

  const tabs = [
    { id: 'services', label: 'Services', icon: Zap },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'features', label: 'Features', icon: Shield },
    { id: 'regions', label: 'Regions', icon: Globe }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'services':
        return <ServiceComparison searchTerm={searchTerm} selectedProviders={selectedProviders} />;
      case 'pricing':
        return <PricingComparison selectedProviders={selectedProviders} />;
      case 'features':
        return <FeatureMatrix selectedProviders={selectedProviders} />;
      case 'regions':
        return <RegionalAvailability selectedProviders={selectedProviders} />;
      default:
        return <ServiceComparison searchTerm={searchTerm} selectedProviders={selectedProviders} />;
    }
  };

  return (
    <div className="min-h-screen dark bg-gray-900 transition-colors duration-300">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedProviders={selectedProviders}
        setSelectedProviders={setSelectedProviders}
      />
      
      <Navigation 
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="container mx-auto px-4 py-8">
        {renderActiveTab()}
      </main>

      {/* ✅ Footer is always dark now */}
      <footer className="border-t border-gray-700 bg-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Cloud Service Comparison Dashboard - Compare AWS, GCP, and Azure services
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Data updated regularly from public APIs and documentation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
