import React from 'react';
import { Search, Filter, Download, Cloud, Sun, Moon } from 'lucide-react';
import { ServiceProvider } from '../types';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedProviders: ServiceProvider[];
  setSelectedProviders: (providers: ServiceProvider[]) => void;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  selectedProviders,
  setSelectedProviders,
  isDark,
  setIsDark
}) => {
  const providers = [
    { id: 'aws' as ServiceProvider, name: 'AWS', color: 'bg-orange-500' },
    // ✅ Custom GCP color here
    { id: 'gcp' as ServiceProvider, name: 'GCP', color: 'bg-green-500' },
    { id: 'azure' as ServiceProvider, name: 'Azure', color: 'bg-blue-600' }
  ];

  const toggleProvider = (provider: ServiceProvider) => {
    if (selectedProviders.includes(provider)) {
      setSelectedProviders(selectedProviders.filter(p => p !== provider));
    } else {
      setSelectedProviders([...selectedProviders, provider]);
    }
  };

  return (
    <header className={`sticky top-0 z-50 border-b shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-600">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Cloud Comparison
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Compare AWS, GCP & Azure Services
              </p>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
              />
            </div>

            {/* Provider Filter */}
            <div className="flex items-center space-x-2">
              <Filter className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <div className="flex space-x-1">
                {providers.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => toggleProvider(provider.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedProviders.includes(provider.id)
                        ? `${provider.color} text-white shadow-md`
                        : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {provider.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg font-medium transition-colors ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Export */}
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
