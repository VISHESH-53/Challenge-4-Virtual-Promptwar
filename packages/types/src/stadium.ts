export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  lat: number;
  lng: number;
  timezone: string;
  imageUrl?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
}

export interface Match {
  id: string;
  stadiumId: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
  score?: {
    home: number;
    away: number;
  };
  attendance?: number;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  stadiumId: string;
  startTime: string;
  endTime: string;
  type: 'MATCH' | 'CEREMONY' | 'CONCERT' | 'OTHER';
}
