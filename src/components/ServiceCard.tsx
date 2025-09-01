import React from 'react';
import { ExternalLink, DollarSign } from 'lucide-react';
import { CloudService, ServiceProvider } from '../types';

interface ServiceCardProps {
  service: CloudService;
  selectedProviders: ServiceProvider[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, selectedProviders }) => {
  const providerColors = {
    aws: 'border-orange-500 bg-orange-900/20',
    gcp: 'border-green-500 bg-green-900/20',
    azure: 'border-blue-600 bg-blue-900/20'
  };

  const providerNames = {
    aws: 'AWS',
    gcp: 'Google Cloud',
    azure: 'Microsoft Azure'
  };

  const linkColors = {
    aws: 'text-orange-400 hover:text-orange-300',
    gcp: 'text-green-400 hover:text-green-300',
    azure: 'text-blue-400 hover:text-blue-300'
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-white">{service.name}</h4>
            <p className="text-sm text-gray-400 mt-1">{service.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {selectedProviders.map(provider => {
            const providerService = service.providers[provider];
            if (!providerService) return null;

            return (
              <div
                key={provider}
                className={`rounded-lg border-2 p-4 ${providerColors[provider]}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-white">{providerNames[provider]}</h5>
                  <a
                    href={providerService.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkColors[provider]}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <p className="text-sm text-gray-300 mb-3">{providerService.description}</p>

                <div className="flex items-center space-x-2 mb-3">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-white">
                    {providerService.pricing.startingPrice} {providerService.pricing.unit}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({providerService.pricing.model})
                  </span>
                </div>

                <div className="space-y-1">
                  <h6 className="text-xs font-medium text-gray-300 uppercase tracking-wide">
                    Key Features
                  </h6>
                  <ul className="text-xs text-gray-400 space-y-0.5">
                    {providerService.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                    {providerService.features.length > 3 && (
                      <li className={`${linkColors[provider]} font-medium`}>
                        +{providerService.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
