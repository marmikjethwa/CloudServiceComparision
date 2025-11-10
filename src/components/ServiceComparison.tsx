import React, { useMemo } from 'react';
import { Shield } from 'lucide-react';
import { ServiceProvider } from '../types';
import { mockServices } from '../data/mockData';
import ServiceCard from './ServiceCard';

interface ServiceComparisonProps {
  searchTerm: string;
  selectedProviders: ServiceProvider[];
  isDark: boolean;
}

const ServiceComparison: React.FC<ServiceComparisonProps> = ({ searchTerm, selectedProviders, isDark }) => {
  const filteredServices = useMemo(() => {
    return mockServices.filter(service => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());

      const hasSelectedProvider = selectedProviders.some(provider => service.providers[provider]);

      return matchesSearch && hasSelectedProvider;
    });
  }, [searchTerm, selectedProviders]);

  const categories = useMemo(() => {
    return Array.from(new Set(filteredServices.map(service => service.category)));
  }, [filteredServices]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Service Comparison</h2>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Compare {filteredServices.length} services across {selectedProviders.length} providers
          </p>
        </div>

        <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          {filteredServices.length} results found
        </div>
      </div>

      {categories.map(category => {
        const categoryServices = filteredServices.filter(service => service.category === category);

        return (
          <div key={category} className="space-y-4">
            <h3 className={`text-lg font-semibold pb-2 border-b ${isDark ? 'text-gray-200 border-gray-700' : 'text-gray-800 border-gray-200'}`}>
              {category}
            </h3>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryServices.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selectedProviders={selectedProviders}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        );
      })}

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className={`mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <Shield className="h-16 w-16 mx-auto opacity-50" />
          </div>
          <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No services found</h3>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Try adjusting your search term or selected providers
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceComparison;
