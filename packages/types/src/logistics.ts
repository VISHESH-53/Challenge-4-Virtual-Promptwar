export interface TransitMetric {
  id: string;
  city: string;
  transportType: 'BUS' | 'TRAIN' | 'SUBWAY' | 'TAXI';
  congestionLevel: number; // 0 to 1
  estimatedWaitTimeMinutes: number;
  timestamp: string;
}

export interface ParkingStatus {
  id: string;
  stadiumId: string;
  lotName: string;
  totalSpots: number;
  availableSpots: number;
  timestamp: string;
}

export interface PedestrianFlow {
  stadiumId: string;
  gateId: string;
  flowRate: number; // people per minute
  timestamp: string;
}

export interface TrafficForecast {
  city: string;
  route: string;
  predictedCongestion: number[]; // Next 12 hours
  timestamp: string;
}

export interface EvacuationPlan {
  stadiumId: string;
  estimatedTimeMinutes: number;
  bottlenecks: string[];
  safeZones: string[];
}

export interface IngressEgressData {
  stadiumId: string;
  type: 'INGRESS' | 'EGRESS';
  totalExpected: number;
  currentCount: number;
  timestamp: string;
}

export interface HostCityComparison {
  cityId: string;
  cityName: string;
  overallScore: number;
  metrics: {
    transit: number;
    accommodation: number;
    security: number;
  };
}
