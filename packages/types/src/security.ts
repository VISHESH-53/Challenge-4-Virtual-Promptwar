export enum IncidentType {
  CROWD_SURGE = 'CROWD_SURGE',
  UNATTENDED_OBJECT = 'UNATTENDED_OBJECT',
  RESTRICTED_AREA = 'RESTRICTED_AREA',
  FIGHT = 'FIGHT',
  MEDICAL_EMERGENCY = 'MEDICAL_EMERGENCY',
  SUSPICIOUS_BEHAVIOR = 'SUSPICIOUS_BEHAVIOR',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
}

export enum SeverityLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface SecurityIncident {
  id: string;
  stadiumId: string;
  type: IncidentType;
  severity: SeverityLevel;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'FALSE_ALARM';
  description: string;
  cameraId?: string;
  timestamp: string;
  confidence: number;
  location: {
    lat: number;
    lng: number;
    zone: string;
  };
  recommendedActions: string[];
}

export interface CrowdDensity {
  stadiumId: string;
  zone: string;
  density: number; // 0 to 1
  timestamp: string;
}

export interface CameraFeed {
  id: string;
  stadiumId: string;
  name: string;
  location: string;
  url: string;
  status: 'ONLINE' | 'OFFLINE';
}
