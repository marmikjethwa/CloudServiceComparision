export type ServiceProvider = 'aws' | 'gcp' | 'azure';

export interface CloudService {
  id: string;
  name: string;
  category: string;
  description: string;
  providers: {
    [key in ServiceProvider]?: {
      name: string;
      description: string;
      pricing: {
        model: string;
        startingPrice: string;
        unit: string;
      };
      features: string[];
      regions: string[];
      url: string;
    };
  };
}

export interface PricingData {
  provider: ServiceProvider;
  service: string;
  region: string;
  instanceType: string;
  price: number;
  unit: string;
  currency: string;
}

export interface Region {
  id: string;
  name: string;
  location: string;
  provider: ServiceProvider;
  services: string[];
}

export interface Feature {
  name: string;
  category: string;
  providers: {
    [key in ServiceProvider]?: {
      available: boolean;
      notes?: string;
      limitations?: string;
    };
  };
}