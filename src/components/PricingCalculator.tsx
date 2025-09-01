import React, { useState, useMemo } from 'react';
import { Calculator, Play } from 'lucide-react';
import { ServiceProvider } from '../types';

interface PricingCalculatorProps {
  selectedProviders: ServiceProvider[];
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ selectedProviders }) => {
  const [hours, setHours] = useState(744); // 1 month
  const [instances, setInstances] = useState(1);
  const [storageGB, setStorageGB] = useState(100);

  const basePrices = {
    aws: { compute: 0.096, storage: 0.023 },
    gcp: { compute: 0.089, storage: 0.020 },
    azure: { compute: 0.092, storage: 0.025 }
  };

  const calculations = useMemo(() => {
    return selectedProviders.map(provider => {
      const computeCost = basePrices[provider].compute * hours * instances;
      const storageCost = basePrices[provider].storage * storageGB;
      const totalCost = computeCost + storageCost;

      return {
        provider,
        computeCost,
        storageCost,
        totalCost
      };
    });
  }, [selectedProviders, hours, instances, storageGB]);

  const providerNames = {
    aws: 'AWS',
    gcp: 'Google Cloud',
    azure: 'Microsoft Azure'
  };

  const providerColors = {
    aws: 'border-orange-500 text-orange-500 bg-orange-500',
    gcp: 'border-green-500 text-green-500 bg-green-500',
    azure: 'border-blue-500 text-blue-500 bg-blue-500'
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Cost Calculator</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hours per Month
            </label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Instances
            </label>
            <input
              type="number"
              value={instances}
              onChange={(e) => setInstances(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Storage (GB)
            </label>
            <input
              type="number"
              value={storageGB}
              onChange={(e) => setStorageGB(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {calculations.map(calc => (
            <div
              key={calc.provider}
              className={`bg-gray-700 rounded-lg p-6 border-l-4 ${providerColors[calc.provider].split(' ')[0]}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-white">
                  {providerNames[calc.provider]}
                </h4>
                <div className={`w-3 h-3 rounded-full ${providerColors[calc.provider].split(' ')[2]}`}></div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Compute:</span>
                  <span className="font-medium text-white">
                    ${calc.computeCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Storage:</span>
                  <span className="font-medium text-white">
                    ${calc.storageCost.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-white">Total:</span>
                    <span className="font-bold text-lg text-white">
                      ${calc.totalCost.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {calculations.length > 1 && (
          <div className="mt-6 p-4 bg-blue-900/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Play className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-blue-100">Cost Savings</span>
            </div>
            {(() => {
              const sortedCalcs = [...calculations].sort((a, b) => a.totalCost - b.totalCost);
              const cheapest = sortedCalcs[0];
              const mostExpensive = sortedCalcs[sortedCalcs.length - 1];
              const savings = mostExpensive.totalCost - cheapest.totalCost;
              const savingsPercent = (savings / mostExpensive.totalCost) * 100;

              return (
                <p className="text-sm text-blue-200">
                  {providerNames[cheapest.provider]} is ${savings.toFixed(2)} ({savingsPercent.toFixed(1)}%) 
                  cheaper than {providerNames[mostExpensive.provider]}
                </p>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingCalculator;
