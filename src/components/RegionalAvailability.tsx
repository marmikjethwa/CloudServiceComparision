import React, { useState } from 'react';
import { MapPin, Globe, Server } from 'lucide-react';
import { ServiceProvider } from '../types';
import { mockRegions } from '../data/mockData';

interface RegionalAvailabilityProps {
  selectedProviders: ServiceProvider[];
}

const RegionalAvailability: React.FC<RegionalAvailabilityProps> = ({ selectedProviders }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const filteredRegions = mockRegions.filter(region =>
    selectedProviders.includes(region.provider)
  );

  const regionsByProvider = selectedProviders.reduce((acc, provider) => {
    acc[provider] = filteredRegions.filter(region => region.provider === provider);
    return acc;
  }, {} as Record<ServiceProvider, typeof filteredRegions>);

  const providerNames = {
    aws: 'AWS',
    gcp: 'Google Cloud',
    azure: 'Microsoft Azure'
  };

  const providerColors = {
    aws: 'border-orange-500 bg-orange-900/20',
    gcp: 'border-green-500 bg-green-900/20',
    azure: 'border-blue-600 bg-blue-900/20'
  };

  const regionBadgeColors = {
    aws: 'bg-orange-900/30 text-orange-300',
    gcp: 'bg-green-900/30 text-green-300',
    azure: 'bg-blue-900/30 text-blue-300'
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Regional Availability</h2>
          <p className="text-gray-400 mt-1">
            Explore data centers and service availability by region
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedProviders.map(provider => (
          <div
            key={provider}
            className={`bg-gray-800 rounded-xl border-2 p-6 ${providerColors[provider]}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">{providerNames[provider]}</h3>
              <Globe className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Regions:</span>
                <span className="font-medium text-white">
                  {regionsByProvider[provider]?.length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Services:</span>
                <span className="font-medium text-white">
                  {regionsByProvider[provider]?.reduce(
                    (total, region) => total + region.services.length,
                    0
                  ) || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Regions List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRegions.map(region => (
          <div
            key={region.id}
            className={`bg-gray-800 rounded-xl border border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer ${
              selectedRegion === region.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() =>
              setSelectedRegion(selectedRegion === region.id ? null : region.id)
            }
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-white">{region.name}</h4>
                <div className="flex items-center space-x-1 mt-1">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-sm text-gray-400">{region.location}</span>
                </div>
              </div>

              <div
                className={`px-2 py-1 rounded text-xs font-medium ${
                  regionBadgeColors[region.provider]
                }`}
              >
                {providerNames[region.provider]}
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <Server className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">
                {region.services.length} Services Available
              </span>
            </div>

            {selectedRegion === region.id && (
              <div className="border-t border-gray-600 pt-4 mt-4">
                <h5 className="text-sm font-medium text-gray-300 mb-2">
                  Available Services:
                </h5>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {region.services.map((service, index) => (
                    <span
                      key={index}
                      className="text-gray-400 bg-gray-700 px-2 py-1 rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRegions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Globe className="h-16 w-16 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No regions found</h3>
          <p className="text-gray-400">
            Select at least one provider to view regional availability
          </p>
        </div>
      )}
    </div>
  );
};

export default RegionalAvailability;
