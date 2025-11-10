import React from 'react';
import { ExternalLink, DollarSign } from 'lucide-react';
import { CloudService, ServiceProvider } from '../types';

interface ServiceCardProps {
  service: CloudService;
  selectedProviders: ServiceProvider[];
  isDark: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, selectedProviders, isDark }) => {
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
    <div className={`rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{service.name}</h4>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
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
                  <h5 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{providerNames[provider]}</h5>
                  <a
                    href={providerService.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkColors[provider]}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{providerService.description}</p>

                <div className="flex items-center space-x-2 mb-3">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {providerService.pricing.startingPrice} {providerService.pricing.unit}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    ({providerService.pricing.model})
                  </span>
                </div>

                <div className="space-y-1">
                  <h6 className={`text-xs font-medium uppercase tracking-wide ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Key Features
                  </h6>
                  <ul className={`text-xs space-y-0.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {providerService.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className={`w-1 h-1 rounded-full mr-2 ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`}></span>
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
