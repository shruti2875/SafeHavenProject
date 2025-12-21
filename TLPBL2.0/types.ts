
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface SafetyPlan {
  safePeople: string[];
  safePlaces: string[];
  thingsToTake: string[];
  safetyAtHome: string;
  safetyOutside: string;
  emotionalWellbeing: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface IncidentReport {
  id: string;
  date: string;
  time: string;
  location: string;
  description: string;
  witnesses: string;
}
