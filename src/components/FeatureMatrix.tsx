import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { ServiceProvider } from '../types';
import { mockFeatures } from '../data/mockData';

interface FeatureMatrixProps {
  selectedProviders: ServiceProvider[];
  isDark: boolean;
}

const FeatureMatrix: React.FC<FeatureMatrixProps> = ({ selectedProviders, isDark }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(mockFeatures.map(f => f.category)))];

  const filteredFeatures = selectedCategory === 'all' 
    ? mockFeatures 
    : mockFeatures.filter(f => f.category === selectedCategory);

  const providerNames = {
    aws: 'AWS',
    gcp: 'Google Cloud',
    azure: 'Microsoft Azure'
  };

  const getAvailabilityIcon = (available: boolean, limitations?: string) => {
    if (available && !limitations) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (available && limitations) {
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    } else {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Feature Matrix</h2>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Compare feature availability across cloud providers
          </p>
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-100'}>
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Feature
                </th>
                {selectedProviders.map(provider => (
                  <th key={provider} className={`px-6 py-4 text-center text-sm font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {providerNames[provider]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredFeatures.map((feature, index) => (
                <tr key={index} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4">
                    <div>
                      <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {feature.name}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {feature.category}
                      </div>
                    </div>
                  </td>
                  {selectedProviders.map(provider => {
                    const providerFeature = feature.providers[provider];
                    
                    return (
                      <td key={provider} className="px-6 py-4 text-center">
                        {providerFeature ? (
                          <div className="flex flex-col items-center space-y-1">
                            {getAvailabilityIcon(providerFeature.available, providerFeature.limitations)}
                            {providerFeature.notes && (
                              <div className="group relative">
                                <Info className="h-3 w-3 text-gray-400 cursor-help" />
                                <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-700 text-white'}`}>
                                  {providerFeature.notes}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Limited</span>
        </div>
        <div className="flex items-center space-x-2">
          <XCircle className="h-4 w-4 text-red-500" />
          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Not Available</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureMatrix;
