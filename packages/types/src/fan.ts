export interface FanProfile {
  id: string;
  name: string;
  preferredLanguage: string;
  accessibilityNeeds: string[];
}

export interface AccessibilityRequest {
  id: string;
  fanId: string;
  stadiumId: string;
  type: 'WHEELCHAIR' | 'VISUAL_AID' | 'HEARING_AID' | 'OTHER';
  status: 'PENDING' | 'APPROVED' | 'FULFILLED' | 'REJECTED';
  details: string;
  createdAt: string;
}

export interface MedicalAlert {
  id: string;
  stadiumId: string;
  fanId?: string;
  location: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  status: 'REPORTED' | 'RESPONDING' | 'RESOLVED';
  timestamp: string;
}

export interface QueuePrediction {
  stadiumId: string;
  location: string; // e.g., 'Gate A', 'Concession Stand 3'
  estimatedWaitTimeMinutes: number;
  timestamp: string;
}

export interface SeatNavigation {
  stadiumId: string;
  startLocation: string;
  endLocation: string; // Seat number
  routeSteps: string[];
  estimatedTimeMinutes: number;
}

export interface HeatAlert {
  stadiumId: string;
  temperatureCelsius: number;
  humidityPercentage: number;
  heatIndexCelsius: number;
  alertLevel: 'NORMAL' | 'CAUTION' | 'DANGER' | 'EXTREME_DANGER';
  timestamp: string;
}

export interface FoodVenue {
  id: string;
  stadiumId: string;
  name: string;
  type: string;
  currentWaitTimeMinutes: number;
  isOpen: boolean;
}

export interface MultilingualMessage {
  id: string;
  stadiumId: string;
  originalText: string;
  translations: Record<string, string>; // languageCode -> translatedText
  timestamp: string;
}
