export interface EnergyUsage {
  stadiumId: string;
  source: 'GRID' | 'SOLAR' | 'WIND' | 'GENERATOR';
  consumptionKwh: number;
  timestamp: string;
}

export interface HvacStatus {
  stadiumId: string;
  zone: string;
  temperature: number;
  targetTemperature: number;
  powerConsumptionKw: number;
  status: 'ON' | 'OFF' | 'MAINTENANCE';
  timestamp: string;
}

export interface SolarProduction {
  stadiumId: string;
  productionKwh: number;
  efficiency: number; // 0 to 1
  timestamp: string;
}

export interface BatteryStorage {
  stadiumId: string;
  capacityKwh: number;
  currentChargeKwh: number;
  status: 'CHARGING' | 'DISCHARGING' | 'IDLE';
  timestamp: string;
}

export interface CarbonEmission {
  stadiumId: string;
  scope1Kg: number;
  scope2Kg: number;
  scope3Kg: number;
  timestamp: string;
}

export interface WasteMetric {
  stadiumId: string;
  category: 'RECYCLABLE' | 'COMPOSTABLE' | 'LANDFILL';
  weightKg: number;
  timestamp: string;
}

export interface WaterUsage {
  stadiumId: string;
  category: 'POTABLE' | 'IRRIGATION' | 'GREYWATER';
  volumeLiters: number;
  timestamp: string;
}

export interface SustainabilityScore {
  stadiumId: string;
  overall: number; // 0 to 100
  energyScore: number;
  wasteScore: number;
  waterScore: number;
  timestamp: string;
}

export interface OptimizationPlan {
  id: string;
  stadiumId: string;
  title: string;
  description: string;
  estimatedSavings: {
    carbonKg: number;
    costUsd: number;
  };
  actions: string[];
  status: 'PROPOSED' | 'APPROVED' | 'IMPLEMENTED' | 'REJECTED';
}
