import React, { useState, useMemo } from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { ServiceProvider } from '../types';
import { mockPricingData } from '../data/mockData';
import PricingChart from './PricingChart';
import PricingCalculator from './PricingCalculator';

interface PricingComparisonProps {
  selectedProviders: ServiceProvider[];
  isDark: boolean;
}

const PricingComparison: React.FC<PricingComparisonProps> = ({ selectedProviders, isDark }) => {
  const [selectedService, setSelectedService] = useState('compute');
  const [selectedRegion, setSelectedRegion] = useState('us-east-1');

  const services = ['compute', 'storage', 'database', 'networking'];
  const regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'];

  const filteredPricingData = useMemo(() => {
    return mockPricingData.filter(item => 
      selectedProviders.includes(item.provider) &&
      item.service === selectedService &&
      item.region === selectedRegion
    );
  }, [selectedProviders, selectedService, selectedRegion]);

  const providerColors = {
    aws: '#FF9900',
    gcp: '#34A853', // updated to green
    azure: '#0078D4'
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Pricing Comparison</h2>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Compare costs across different services and regions
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className={`rounded-xl border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Service Type
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              {services.map(service => (
                <option key={service} value={service}>
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pricing Chart */}
      <div className={`rounded-xl border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Price Comparison</h3>
        </div>
        
        <PricingChart data={filteredPricingData} providerColors={providerColors} />
      </div>

      {/* Pricing Table */}
      <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Detailed Pricing</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-100'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Provider
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Instance Type
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Price/Hour
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Monthly Cost
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredPricingData.map((item, index) => (
                <tr key={index} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: providerColors[item.provider] }}
                      ></div>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.provider.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.instanceType}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${item.price.toFixed(3)}/{item.unit}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${(item.price * 24 * 30).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost Calculator */}
      <PricingCalculator selectedProviders={selectedProviders} isDark={isDark} />
    </div>
  );
};

export default PricingComparison;
