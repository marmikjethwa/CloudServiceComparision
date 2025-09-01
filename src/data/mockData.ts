import { CloudService, PricingData, Region, Feature } from '../types';

export const mockServices: CloudService[] = [
  {
    id: 'compute',
    name: 'Virtual Machines',
    category: 'Compute',
    description: 'Scalable virtual machine instances for various workloads',
    providers: {
      aws: {
        name: 'EC2',
        description: 'Elastic Compute Cloud - Secure and resizable compute capacity',
        pricing: { model: 'Pay per hour', startingPrice: '$0.096', unit: 'per hour' },
        features: ['Auto Scaling', 'Spot Instances', 'Dedicated Hosts', 'Hibernation'],
        regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
        url: 'https://aws.amazon.com/ec2/'
      },
      gcp: {
        name: 'Compute Engine',
        description: 'High performance virtual machines on Google infrastructure',
        pricing: { model: 'Pay per minute', startingPrice: '$0.089', unit: 'per hour' },
        features: ['Live Migration', 'Preemptible VMs', 'Custom Machine Types', 'Sustained Use Discounts'],
        regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
        url: 'https://cloud.google.com/compute'
      },
      azure: {
        name: 'Virtual Machines',
        description: 'On-demand scalable computing resources',
        pricing: { model: 'Pay per minute', startingPrice: '$0.092', unit: 'per hour' },
        features: ['Availability Sets', 'Low Priority VMs', 'Hybrid Benefit', 'Reserved Instances'],
        regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
        url: 'https://azure.microsoft.com/en-us/services/virtual-machines/'
      }
    }
  },
  {
    id: 'storage',
    name: 'Object Storage',
    category: 'Storage',
    description: 'Highly scalable object storage for data archiving and backup',
    providers: {
      aws: {
        name: 'S3',
        description: 'Simple Storage Service - Industry-leading scalability and durability',
        pricing: { model: 'Pay per GB', startingPrice: '$0.023', unit: 'per GB/month' },
        features: ['99.999999999% Durability', 'Versioning', 'Cross-Region Replication', 'Lifecycle Management'],
        regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
        url: 'https://aws.amazon.com/s3/'
      },
      gcp: {
        name: 'Cloud Storage',
        description: 'Unified object storage for developers and enterprises',
        pricing: { model: 'Pay per GB', startingPrice: '$0.020', unit: 'per GB/month' },
        features: ['Edge Caching', 'Object Lifecycle Management', 'Customer-Managed Encryption', 'Autoclass'],
        regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
        url: 'https://cloud.google.com/storage'
      },
      azure: {
        name: 'Blob Storage',
        description: 'Massively scalable object storage for unstructured data',
        pricing: { model: 'Pay per GB', startingPrice: '$0.025', unit: 'per GB/month' },
        features: ['Hot/Cool/Archive Tiers', 'Immutable Storage', 'Change Feed', 'Static Website Hosting'],
        regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
        url: 'https://azure.microsoft.com/en-us/services/storage/blobs/'
      }
    }
  },
  {
    id: 'database',
    name: 'Managed Database',
    category: 'Database',
    description: 'Fully managed relational database service',
    providers: {
      aws: {
        name: 'RDS',
        description: 'Relational Database Service - Easy to set up, operate, and scale',
        pricing: { model: 'Pay per hour', startingPrice: '$0.017', unit: 'per hour' },
        features: ['Multi-AZ Deployments', 'Read Replicas', 'Automated Backups', 'Performance Insights'],
        regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
        url: 'https://aws.amazon.com/rds/'
      },
      gcp: {
        name: 'Cloud SQL',
        description: 'Fully managed relational database service',
        pricing: { model: 'Pay per hour', startingPrice: '$0.015', unit: 'per hour' },
        features: ['High Availability', 'Point-in-time Recovery', 'Automatic Storage Increase', 'Data Cache'],
        regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
        url: 'https://cloud.google.com/sql'
      },
      azure: {
        name: 'SQL Database',
        description: 'Intelligent, scalable cloud database service',
        pricing: { model: 'Pay per DTU', startingPrice: '$0.019', unit: 'per hour' },
        features: ['Intelligent Performance', 'Advanced Threat Protection', 'Elastic Pools', 'Hyperscale'],
        regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
        url: 'https://azure.microsoft.com/en-us/services/sql-database/'
      }
    }
  },
  {
    id: 'serverless',
    name: 'Serverless Functions',
    category: 'Compute',
    description: 'Run code without thinking about servers',
    providers: {
      aws: {
        name: 'Lambda',
        description: 'Run code without provisioning or managing servers',
        pricing: { model: 'Pay per request', startingPrice: '$0.0000002', unit: 'per request' },
        features: ['Event-driven', 'Auto Scaling', 'Built-in Fault Tolerance', 'Supports Multiple Languages'],
        regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
        url: 'https://aws.amazon.com/lambda/'
      },
      gcp: {
        name: 'Cloud Functions',
        description: 'Serverless execution environment for building and connecting cloud services',
        pricing: { model: 'Pay per invocation', startingPrice: '$0.0000004', unit: 'per invocation' },
        features: ['Event-driven', 'HTTP Functions', 'Background Functions', 'Source-based Deployment'],
        regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
        url: 'https://cloud.google.com/functions'
      },
      azure: {
        name: 'Functions',
        description: 'Event-driven serverless compute platform',
        pricing: { model: 'Pay per execution', startingPrice: '$0.0000002', unit: 'per execution' },
        features: ['Consumption Plan', 'Premium Plan', 'Durable Functions', 'KEDA Support'],
        regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
        url: 'https://azure.microsoft.com/en-us/services/functions/'
      }
    }
  },
  {
    id: 'cdn',
    name: 'Content Delivery Network',
    category: 'Networking',
    description: 'Global content delivery network for fast, secure content delivery',
    providers: {
      aws: {
        name: 'CloudFront',
        description: 'Fast content delivery network with global edge locations',
        pricing: { model: 'Pay per GB', startingPrice: '$0.085', unit: 'per GB' },
        features: ['Global Edge Network', 'DDoS Protection', 'Real-time Metrics', 'Lambda@Edge'],
        regions: ['Global'],
        url: 'https://aws.amazon.com/cloudfront/'
      },
      gcp: {
        name: 'Cloud CDN',
        description: 'Content delivery network with global reach',
        pricing: { model: 'Pay per GB', startingPrice: '$0.080', unit: 'per GB' },
        features: ['Global Anycast IP', 'HTTP/2 and QUIC', 'Cache Invalidation', 'Signed URLs'],
        regions: ['Global'],
        url: 'https://cloud.google.com/cdn'
      },
      azure: {
        name: 'CDN',
        description: 'Global content delivery network with intelligent routing',
        pricing: { model: 'Pay per GB', startingPrice: '$0.081', unit: 'per GB' },
        features: ['Dynamic Site Acceleration', 'Rules Engine', 'Real-time Analytics', 'Custom Domains'],
        regions: ['Global'],
        url: 'https://azure.microsoft.com/en-us/services/cdn/'
      }
    }
  },
  {
    id: 'kubernetes',
    name: 'Managed Kubernetes',
    category: 'Containers',
    description: 'Fully managed Kubernetes service for container orchestration',
    providers: {
      aws: {
        name: 'EKS',
        description: 'Elastic Kubernetes Service - Managed Kubernetes control plane',
        pricing: { model: 'Pay per cluster', startingPrice: '$0.10', unit: 'per cluster/hour' },
        features: ['Managed Control Plane', 'Fargate Support', 'IAM Integration', 'VPC Native Networking'],
        regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
        url: 'https://aws.amazon.com/eks/'
      },
      gcp: {
        name: 'GKE',
        description: 'Google Kubernetes Engine - Enterprise-grade Kubernetes',
        pricing: { model: 'Pay per cluster', startingPrice: '$0.10', unit: 'per cluster/hour' },
        features: ['Autopilot Mode', 'Workload Identity', 'Binary Authorization', 'Multi-cluster Management'],
        regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
        url: 'https://cloud.google.com/kubernetes-engine'
      },
      azure: {
        name: 'AKS',
        description: 'Azure Kubernetes Service - Simplified Kubernetes management',
        pricing: { model: 'Free control plane', startingPrice: '$0.00', unit: 'per cluster/hour' },
        features: ['Azure Active Directory Integration', 'Virtual Kubelet', 'Dev Spaces', 'Policy Management'],
        regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
        url: 'https://azure.microsoft.com/en-us/services/kubernetes-service/'
      }
    }
  }
];

export const mockPricingData: PricingData[] = [
  // Compute pricing
  { provider: 'aws', service: 'compute', region: 'us-east-1', instanceType: 't3.medium', price: 0.096, unit: 'hour', currency: 'USD' },
  { provider: 'gcp', service: 'compute', region: 'us-east-1', instanceType: 'n2-standard-2', price: 0.089, unit: 'hour', currency: 'USD' },
  { provider: 'azure', service: 'compute', region: 'us-east-1', instanceType: 'Standard_D2s_v3', price: 0.092, unit: 'hour', currency: 'USD' },
  
  // Storage pricing
  { provider: 'aws', service: 'storage', region: 'us-east-1', instanceType: 'Standard', price: 0.023, unit: 'GB/month', currency: 'USD' },
  { provider: 'gcp', service: 'storage', region: 'us-east-1', instanceType: 'Standard', price: 0.020, unit: 'GB/month', currency: 'USD' },
  { provider: 'azure', service: 'storage', region: 'us-east-1', instanceType: 'Hot', price: 0.025, unit: 'GB/month', currency: 'USD' },
  
  // Database pricing
  { provider: 'aws', service: 'database', region: 'us-east-1', instanceType: 'db.t3.micro', price: 0.017, unit: 'hour', currency: 'USD' },
  { provider: 'gcp', service: 'database', region: 'us-east-1', instanceType: 'db-f1-micro', price: 0.015, unit: 'hour', currency: 'USD' },
  { provider: 'azure', service: 'database', region: 'us-east-1', instanceType: 'Basic', price: 0.019, unit: 'hour', currency: 'USD' },
  
  // Networking pricing
  { provider: 'aws', service: 'networking', region: 'us-east-1', instanceType: 'Data Transfer', price: 0.09, unit: 'GB', currency: 'USD' },
  { provider: 'gcp', service: 'networking', region: 'us-east-1', instanceType: 'Premium Network', price: 0.08, unit: 'GB', currency: 'USD' },
  { provider: 'azure', service: 'networking', region: 'us-east-1', instanceType: 'Zone 1', price: 0.087, unit: 'GB', currency: 'USD' }
];

export const mockRegions: Region[] = [
  // AWS Regions
  { id: 'us-east-1', name: 'US East (N. Virginia)', location: 'Virginia, USA', provider: 'aws', services: ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFront'] },
  { id: 'us-west-2', name: 'US West (Oregon)', location: 'Oregon, USA', provider: 'aws', services: ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFront'] },
  { id: 'eu-west-1', name: 'Europe (Ireland)', location: 'Dublin, Ireland', provider: 'aws', services: ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFront'] },
  { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', location: 'Singapore', provider: 'aws', services: ['EC2', 'S3', 'RDS', 'Lambda'] },
  
  // GCP Regions
  { id: 'us-central1', name: 'us-central1', location: 'Iowa, USA', provider: 'gcp', services: ['Compute Engine', 'Cloud Storage', 'Cloud SQL', 'Cloud Functions'] },
  { id: 'us-west1', name: 'us-west1', location: 'Oregon, USA', provider: 'gcp', services: ['Compute Engine', 'Cloud Storage', 'Cloud SQL', 'Cloud Functions'] },
  { id: 'europe-west1', name: 'europe-west1', location: 'Belgium', provider: 'gcp', services: ['Compute Engine', 'Cloud Storage', 'Cloud SQL', 'Cloud Functions'] },
  { id: 'asia-southeast1', name: 'asia-southeast1', location: 'Singapore', provider: 'gcp', services: ['Compute Engine', 'Cloud Storage', 'Cloud SQL'] },
  
  // Azure Regions
  { id: 'eastus', name: 'East US', location: 'Virginia, USA', provider: 'azure', services: ['Virtual Machines', 'Blob Storage', 'SQL Database', 'Functions'] },
  { id: 'westus2', name: 'West US 2', location: 'Washington, USA', provider: 'azure', services: ['Virtual Machines', 'Blob Storage', 'SQL Database', 'Functions'] },
  { id: 'westeurope', name: 'West Europe', location: 'Netherlands', provider: 'azure', services: ['Virtual Machines', 'Blob Storage', 'SQL Database', 'Functions'] },
  { id: 'southeastasia', name: 'Southeast Asia', location: 'Singapore', provider: 'azure', services: ['Virtual Machines', 'Blob Storage', 'SQL Database'] }
];

export const mockFeatures: Feature[] = [
  {
    name: 'Auto Scaling',
    category: 'Compute',
    providers: {
      aws: { available: true, notes: 'EC2 Auto Scaling with predictive scaling' },
      gcp: { available: true, notes: 'Managed Instance Groups with autoscaling' },
      azure: { available: true, notes: 'Virtual Machine Scale Sets' }
    }
  },
  {
    name: 'Spot/Preemptible Instances',
    category: 'Compute',
    providers: {
      aws: { available: true, notes: 'EC2 Spot Instances up to 90% savings' },
      gcp: { available: true, notes: 'Preemptible VMs up to 80% savings' },
      azure: { available: true, notes: 'Spot VMs up to 90% savings' }
    }
  },
  {
    name: 'Live Migration',
    category: 'Compute',
    providers: {
      aws: { available: false },
      gcp: { available: true, notes: 'Transparent live migration for maintenance' },
      azure: { available: true, notes: 'Live migration for planned maintenance', limitations: 'Limited to certain VM sizes' }
    }
  },
  {
    name: 'Object Versioning',
    category: 'Storage',
    providers: {
      aws: { available: true, notes: 'S3 Object Versioning' },
      gcp: { available: true, notes: 'Object Versioning with lifecycle management' },
      azure: { available: true, notes: 'Blob versioning and soft delete' }
    }
  },
  {
    name: 'Cross-Region Replication',
    category: 'Storage',
    providers: {
      aws: { available: true, notes: 'S3 Cross-Region Replication' },
      gcp: { available: true, notes: 'Multi-region and dual-region buckets' },
      azure: { available: true, notes: 'Geo-redundant storage options' }
    }
  },
  {
    name: 'Read Replicas',
    category: 'Database',
    providers: {
      aws: { available: true, notes: 'Cross-region read replicas supported' },
      gcp: { available: true, notes: 'Read replicas with automatic failover' },
      azure: { available: true, notes: 'Geo-replication and read scale-out', limitations: 'Premium tiers only' }
    }
  },
  {
    name: 'Point-in-time Recovery',
    category: 'Database',
    providers: {
      aws: { available: true, notes: 'Automated backups with PITR' },
      gcp: { available: true, notes: 'Point-in-time recovery up to 7 days' },
      azure: { available: true, notes: 'Automated backups with PITR up to 35 days' }
    }
  },
  {
    name: 'Edge Computing',
    category: 'Networking',
    providers: {
      aws: { available: true, notes: 'Lambda@Edge and CloudFront' },
      gcp: { available: true, notes: 'Cloud CDN with edge caching', limitations: 'Limited edge locations' },
      azure: { available: true, notes: 'Azure CDN and Front Door' }
    }
  },
  {
    name: 'DDoS Protection',
    category: 'Security',
    providers: {
      aws: { available: true, notes: 'AWS Shield Standard (free) and Advanced' },
      gcp: { available: true, notes: 'Google Cloud Armor' },
      azure: { available: true, notes: 'Azure DDoS Protection Basic and Standard' }
    }
  },
  {
    name: 'Identity & Access Management',
    category: 'Security',
    providers: {
      aws: { available: true, notes: 'AWS IAM with fine-grained permissions' },
      gcp: { available: true, notes: 'Cloud IAM with hierarchical organization' },
      azure: { available: true, notes: 'Azure Active Directory integration' }
    }
  }
];