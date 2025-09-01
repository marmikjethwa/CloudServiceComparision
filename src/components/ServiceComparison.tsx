import React, { useMemo } from 'react';
import { Shield } from 'lucide-react';
import { ServiceProvider } from '../types';
import { mockServices } from '../data/mockData';
import ServiceCard from './ServiceCard';

interface ServiceComparisonProps {
  searchTerm: string;
  selectedProviders: ServiceProvider[];
}

const ServiceComparison: React.FC<ServiceComparisonProps> = ({ searchTerm, selectedProviders }) => {
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
          <h2 className="text-2xl font-bold text-white">Service Comparison</h2>
          <p className="text-gray-400 mt-1">
            Compare {filteredServices.length} services across {selectedProviders.length} providers
          </p>
        </div>

        <div className="text-sm text-gray-500">
          {filteredServices.length} results found
        </div>
      </div>

      {categories.map(category => {
        const categoryServices = filteredServices.filter(service => service.category === category);

        return (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">
              {category}
            </h3>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryServices.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selectedProviders={selectedProviders}
                />
              ))}
            </div>
          </div>
        );
      })}

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Shield className="h-16 w-16 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No services found</h3>
          <p className="text-gray-400">
            Try adjusting your search term or selected providers
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceComparison;
