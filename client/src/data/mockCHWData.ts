// Mock data for Community Health Worker Dashboard

export interface MockMother {
  id: string;
  name: string;
  age: number;
  pregnancyWeek: number;
  dueDate: Date;
  lastVisit: Date;
  nextVisit: Date;
  status: 'healthy' | 'at-risk' | 'critical';
  riskFlags: string[];
}

export interface MockChild {
  id: string;
  name: string;
  age: number;
  ageInMonths: number;
  motherName: string;
  vaccinationStatus: 'complete' | 'incomplete' | 'overdue';
  missedVaccines: string[];
  status: 'healthy' | 'at-risk' | 'critical';
  riskFlags: string[];
}

export interface MockCHWMetrics {
  totalMothers: number;
  totalChildren: number;
  overdueAppointments: number;
  missedVaccinations: number;
  healthyMothers: number;
  healthyChildren: number;
  atRiskMothers: number;
  atRiskChildren: number;
  criticalCases: number;
}

export const mockMothers: MockMother[] = [
  {
    id: 'mother-1',
    name: 'Amina Hassan',
    age: 28,
    pregnancyWeek: 32,
    dueDate: new Date(Date.now() + 56 * 24 * 60 * 60 * 1000),
    lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    nextVisit: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    status: 'healthy',
    riskFlags: [],
  },
  {
    id: 'mother-2',
    name: 'Fatima Okafor',
    age: 32,
    pregnancyWeek: 28,
    dueDate: new Date(Date.now() + 84 * 24 * 60 * 60 * 1000),
    lastVisit: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    nextVisit: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'at-risk',
    riskFlags: ['High blood pressure', 'Overdue appointment'],
  },
  {
    id: 'mother-3',
    name: 'Zainab Ahmed',
    age: 25,
    pregnancyWeek: 20,
    dueDate: new Date(Date.now() + 140 * 24 * 60 * 60 * 1000),
    lastVisit: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    nextVisit: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    status: 'healthy',
    riskFlags: [],
  },
  {
    id: 'mother-4',
    name: 'Mariam Diallo',
    age: 35,
    pregnancyWeek: 36,
    dueDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    lastVisit: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    nextVisit: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'critical',
    riskFlags: ['Severely overdue appointment', 'Gestational diabetes', 'No recent checkup'],
  },
  {
    id: 'mother-5',
    name: 'Aisha Mohammed',
    age: 29,
    pregnancyWeek: 24,
    dueDate: new Date(Date.now() + 112 * 24 * 60 * 60 * 1000),
    lastVisit: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    nextVisit: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    status: 'healthy',
    riskFlags: [],
  },
];

export const mockChildren: MockChild[] = [
  {
    id: 'child-1',
    name: 'Kofi Mensah',
    age: 2,
    ageInMonths: 24,
    motherName: 'Amina Hassan',
    vaccinationStatus: 'complete',
    missedVaccines: [],
    status: 'healthy',
    riskFlags: [],
  },
  {
    id: 'child-2',
    name: 'Zara Okafor',
    age: 1,
    ageInMonths: 14,
    motherName: 'Fatima Okafor',
    vaccinationStatus: 'overdue',
    missedVaccines: ['DPT Booster', 'Polio Booster'],
    status: 'at-risk',
    riskFlags: ['Overdue vaccinations', 'Malnutrition indicators'],
  },
  {
    id: 'child-3',
    name: 'Amara Ahmed',
    age: 0,
    ageInMonths: 3,
    motherName: 'Zainab Ahmed',
    vaccinationStatus: 'incomplete',
    missedVaccines: ['DPT 1', 'Hepatitis B 1'],
    status: 'at-risk',
    riskFlags: ['Missed vaccinations', 'Low birth weight'],
  },
  {
    id: 'child-4',
    name: 'Jamal Diallo',
    age: 3,
    ageInMonths: 38,
    motherName: 'Mariam Diallo',
    vaccinationStatus: 'incomplete',
    missedVaccines: ['School vaccines'],
    status: 'critical',
    riskFlags: ['Severe malnutrition', 'Respiratory infection', 'No vaccination records'],
  },
  {
    id: 'child-5',
    name: 'Layla Mohammed',
    age: 1,
    ageInMonths: 10,
    motherName: 'Aisha Mohammed',
    vaccinationStatus: 'complete',
    missedVaccines: [],
    status: 'healthy',
    riskFlags: [],
  },
];

export const mockMetrics: MockCHWMetrics = {
  totalMothers: 5,
  totalChildren: 5,
  overdueAppointments: 2,
  missedVaccinations: 3,
  healthyMothers: 3,
  healthyChildren: 2,
  atRiskMothers: 1,
  atRiskChildren: 2,
  criticalCases: 1,
};

export const getCHWDashboardData = () => {
  return {
    mothers: mockMothers,
    children: mockChildren,
    metrics: mockMetrics,
  };
};
