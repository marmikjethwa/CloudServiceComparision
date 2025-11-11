import React from 'react';
import { PricingData } from '../types';

interface PricingChartProps {
  data: PricingData[];
  providerColors: { [key: string]: string };
  isDark?: boolean;
}

const PricingChart: React.FC<PricingChartProps> = ({ data, providerColors, isDark = true }) => {
  if (data.length === 0) {
    return (
      <div className={`h-64 flex items-center justify-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        No pricing data available for the selected filters
      </div>
    );
  }

  const maxPrice = Math.max(...data.map(item => item.price));
  const minPrice = Math.min(...data.map(item => item.price));
  const priceRange = maxPrice - minPrice;

  return (
    <div className="h-64 flex items-end justify-center space-x-8">
      {data.map((item, index) => {
        const height = priceRange > 0 ? ((item.price - minPrice) / priceRange) * 200 + 40 : 100;
        
        return (
          <div key={index} className="flex flex-col items-center">
            <div className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-black'}`}>
              ${item.price.toFixed(3)}
            </div>
            <div
              className="w-16 rounded-t-lg transition-all duration-500 hover:opacity-80"
              style={{
                height: `${height}px`,
                backgroundColor: providerColors[item.provider]
              }}
            ></div>
            <div className="mt-3 text-center">
              <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                {item.provider.toUpperCase()}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-black'}`}>
                {item.instanceType}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingChart;
