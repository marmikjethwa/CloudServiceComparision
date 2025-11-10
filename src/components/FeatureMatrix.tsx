import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ServiceProvider } from '../types';
import { mockFeatures } from '../data/mockData';

interface FeatureMatrixProps {
  selectedProviders: ServiceProvider[];
}

const FeatureMatrix: React.FC<FeatureMatrixProps> = ({ selectedProviders }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(mockFeatures.map(f => f.category)))];

  const filteredFeatures =
    selectedCategory === 'all'
      ? mockFeatures
      : mockFeatures.filter(f => f.category === selectedCategory);

  const providerNames: Record<string, string> = {
    aws: 'AWS',
    gcp: 'Google Cloud',
    azure: 'Microsoft Azure',
  };

  const getAvailabilityIcon = (available: boolean, limitations?: string) => {
    if (available && !limitations) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    } else if (available && limitations) {
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    } else {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Feature Matrix</h2>
          <p className="text-gray-600 mt-1">
            Compare feature availability across cloud providers
          </p>
        </div>

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Feature
                </th>
                {selectedProviders.map((provider) => (
                  <th
                    key={provider}
                    className="px-6 py-4 text-center text-sm font-medium text-gray-600 uppercase tracking-wider"
                  >
                    {providerNames[provider]}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredFeatures.map((feature, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{feature.name}</div>
                      <div className="text-sm text-gray-500">{feature.category}</div>
                    </div>
                  </td>
                  {selectedProviders.map((provider) => (
                    <td key={provider} className="px-6 py-4 text-center">
                      {getAvailabilityIcon(
                        feature.availability[provider]?.available,
                        feature.availability[provider]?.limitations
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend Section */}
      <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <span>Limited</span>
        </div>
        <div className="flex items-center space-x-2">
          <XCircle className="h-4 w-4 text-red-500" />
          <span>Not Available</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureMatrix;
