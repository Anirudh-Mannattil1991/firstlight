import { generateId } from "@/lib/utils";

export interface CommunityMother {
  id: string;
  name: string;
  age: number;
  pregnancyWeek: number;
  dueDate: Date;
  lastVisit: Date;
  nextVisit: Date;
  status: "stable" | "moderate-risk" | "high-risk";
  riskFactors: string[];
  missedAppointments: number;
  location: string;
  notes: string;
}

export interface CommunityCommunityChild {
  id: string;
  name: string;
  age: number;
  ageInMonths: number;
  motherName: string;
  vaccinationStatus: "complete" | "incomplete" | "overdue";
  missedVaccines: string[];
  status: "stable" | "moderate-risk" | "high-risk";
  riskFactors: string[];
  lastCheckup: Date;
}

export interface CommunityMetrics {
  totalMothers: number;
  totalChildren: number;
  prenatalCoverage: number; // percentage
  vaccinationCompletion: number; // percentage
  averageMissedVisits: number;
  highRiskCases: number;
  moderateRiskCases: number;
  stableCases: number;
  overdueAppointments: number;
  missedVaccinations: number;
}

export const communityMothers: CommunityMother[] = [
  {
    id: generateId(),
    name: "Amina Hassan",
    age: 28,
    pregnancyWeek: 32,
    dueDate: new Date(2026, 5, 23),
    lastVisit: new Date(2026, 3, 20),
    nextVisit: new Date(2026, 4, 4),
    status: "high-risk",
    riskFactors: ["Gestational hypertension", "Previous miscarriage"],
    missedAppointments: 1,
    location: "Urban - Clinic A",
    notes: "Started antihypertensive medication. Close monitoring required.",
  },
  {
    id: generateId(),
    name: "Fatima Okafor",
    age: 32,
    pregnancyWeek: 28,
    dueDate: new Date(2026, 6, 8),
    lastVisit: new Date(2026, 3, 15),
    nextVisit: new Date(2026, 4, 15),
    status: "stable",
    riskFactors: [],
    missedAppointments: 0,
    location: "Rural - Village Clinic",
    notes: "Progressing well. Regular checkups maintained.",
  },
  {
    id: generateId(),
    name: "Zainab Ahmed",
    age: 25,
    pregnancyWeek: 20,
    dueDate: new Date(2026, 7, 27),
    lastVisit: new Date(2026, 3, 5),
    nextVisit: new Date(2026, 4, 5),
    status: "moderate-risk",
    riskFactors: ["Anemia (Hb 10.2)", "Teenage mother"],
    missedAppointments: 1,
    location: "Urban - Clinic B",
    notes: "Anemia detected. Iron supplementation started. Counseling ongoing.",
  },
  {
    id: generateId(),
    name: "Mariam Diallo",
    age: 35,
    pregnancyWeek: 36,
    dueDate: new Date(2026, 4, 28),
    lastVisit: new Date(2026, 2, 20),
    nextVisit: new Date(2026, 3, 24),
    status: "high-risk",
    riskFactors: ["Advanced maternal age", "Gestational diabetes", "Overdue appointment"],
    missedAppointments: 2,
    location: "Rural - Mobile Clinic",
    notes: "URGENT: Severely overdue for appointment. Needs immediate follow-up.",
  },
  {
    id: generateId(),
    name: "Aisha Mohammed",
    age: 29,
    pregnancyWeek: 24,
    dueDate: new Date(2026, 7, 12),
    lastVisit: new Date(2026, 3, 18),
    nextVisit: new Date(2026, 4, 18),
    status: "stable",
    riskFactors: [],
    missedAppointments: 0,
    location: "Urban - Clinic A",
    notes: "Healthy pregnancy. Good compliance with appointments.",
  },
  {
    id: generateId(),
    name: "Leila Kofi",
    age: 27,
    pregnancyWeek: 16,
    dueDate: new Date(2026, 8, 23),
    lastVisit: new Date(2026, 3, 10),
    nextVisit: new Date(2026, 4, 10),
    status: "stable",
    riskFactors: [],
    missedAppointments: 0,
    location: "Urban - Clinic C",
    notes: "First pregnancy. Engaged and taking prenatal vitamins.",
  },
  {
    id: generateId(),
    name: "Nadia Patel",
    age: 31,
    pregnancyWeek: 30,
    dueDate: new Date(2026, 5, 15),
    lastVisit: new Date(2026, 3, 22),
    nextVisit: new Date(2026, 4, 5),
    status: "moderate-risk",
    riskFactors: ["Obesity (BMI 32)", "Previous gestational diabetes"],
    missedAppointments: 0,
    location: "Urban - Clinic A",
    notes: "Glucose monitoring ongoing. Weight management counseling provided.",
  },
  {
    id: generateId(),
    name: "Habiba Yusuf",
    age: 26,
    pregnancyWeek: 12,
    dueDate: new Date(2026, 9, 1),
    lastVisit: new Date(2026, 3, 8),
    nextVisit: new Date(2026, 4, 8),
    status: "stable",
    riskFactors: [],
    missedAppointments: 0,
    location: "Rural - Village Clinic",
    notes: "First trimester progressing normally. Nausea improving.",
  },
  {
    id: generateId(),
    name: "Sophia Mensah",
    age: 24,
    pregnancyWeek: 8,
    dueDate: new Date(2026, 10, 5),
    lastVisit: new Date(2026, 3, 1),
    nextVisit: new Date(2026, 4, 1),
    status: "stable",
    riskFactors: [],
    missedAppointments: 0,
    location: "Urban - Clinic B",
    notes: "Very early pregnancy. Baseline measurements taken.",
  },
  {
    id: generateId(),
    name: "Yasmin Khalil",
    age: 33,
    pregnancyWeek: 26,
    dueDate: new Date(2026, 6, 22),
    lastVisit: new Date(2026, 3, 12),
    nextVisit: new Date(2026, 4, 12),
    status: "moderate-risk",
    riskFactors: ["Thyroid condition (on medication)", "Previous preterm birth"],
    missedAppointments: 1,
    location: "Urban - Clinic C",
    notes: "Thyroid levels monitored. Previous preterm birth history noted.",
  },
  {
    id: generateId(),
    name: "Asha Kumari",
    age: 28,
    pregnancyWeek: 34,
    dueDate: new Date(2026, 5, 1),
    lastVisit: new Date(2026, 3, 25),
    nextVisit: new Date(2026, 4, 8),
    status: "stable",
    riskFactors: [],
    missedAppointments: 0,
    location: "Rural - Mobile Clinic",
    notes: "Third trimester. Baby in correct position. Labor plan discussed.",
  },
  {
    id: generateId(),
    name: "Zara Okafor",
    age: 30,
    pregnancyWeek: 22,
    dueDate: new Date(2026, 7, 30),
    lastVisit: new Date(2026, 3, 19),
    nextVisit: new Date(2026, 4, 19),
    status: "high-risk",
    riskFactors: ["Severe anemia (Hb 8.5)", "Malnutrition"],
    missedAppointments: 2,
    location: "Rural - Village Clinic",
    notes: "Severe anemia. Nutritional support and supplementation critical.",
  },
  {
    id: generateId(),
    name: "Hana Abdi",
    age: 23,
    pregnancyWeek: 14,
    dueDate: new Date(2026, 9, 15),
    lastVisit: new Date(2026, 3, 6),
    nextVisit: new Date(2026, 4, 6),
    status: "stable",
    riskFactors: [],
    missedAppointments: 0,
    location: "Urban - Clinic A",
    notes: "Young mother. First pregnancy. Engaged with care.",
  },
  {
    id: generateId(),
    name: "Priya Singh",
    age: 29,
    pregnancyWeek: 18,
    dueDate: new Date(2026, 8, 15),
    lastVisit: new Date(2026, 3, 14),
    nextVisit: new Date(2026, 4, 14),
    status: "moderate-risk",
    riskFactors: ["Irregular menstrual history", "Uncertain dates"],
    missedAppointments: 0,
    location: "Urban - Clinic B",
    notes: "Uncertain gestational age. Ultrasound dating recommended.",
  },
  {
    id: generateId(),
    name: "Mwangi Njoki",
    age: 31,
    pregnancyWeek: 28,
    dueDate: new Date(2026, 6, 8),
    lastVisit: new Date(2026, 3, 21),
    nextVisit: new Date(2026, 4, 21),
    status: "stable",
    riskFactors: [],
    missedAppointments: 0,
    location: "Rural - Mobile Clinic",
    notes: "Multiparous. Previous pregnancies uncomplicated.",
  },
];

export const communityChildren: CommunityCommunityChild[] = [
  {
    id: generateId(),
    name: "Kofi Mensah",
    age: 2,
    ageInMonths: 24,
    motherName: "Amina Hassan",
    vaccinationStatus: "complete",
    missedVaccines: [],
    status: "stable",
    riskFactors: [],
    lastCheckup: new Date(2026, 3, 15),
  },
  {
    id: generateId(),
    name: "Zara Okafor",
    age: 1,
    ageInMonths: 14,
    motherName: "Fatima Okafor",
    vaccinationStatus: "overdue",
    missedVaccines: ["DPT Booster", "Polio Booster"],
    status: "moderate-risk",
    riskFactors: ["Overdue vaccinations", "Malnutrition indicators"],
    lastCheckup: new Date(2026, 2, 20),
  },
  {
    id: generateId(),
    name: "Amara Ahmed",
    age: 0,
    ageInMonths: 3,
    motherName: "Zainab Ahmed",
    vaccinationStatus: "incomplete",
    missedVaccines: ["DPT 1", "Hepatitis B 1"],
    status: "moderate-risk",
    riskFactors: ["Missed vaccinations", "Low birth weight"],
    lastCheckup: new Date(2026, 3, 10),
  },
  {
    id: generateId(),
    name: "Jamal Diallo",
    age: 3,
    ageInMonths: 38,
    motherName: "Mariam Diallo",
    vaccinationStatus: "incomplete",
    missedVaccines: ["School vaccines", "Booster"],
    status: "high-risk",
    riskFactors: ["Severe malnutrition", "Respiratory infection", "No vaccination records"],
    lastCheckup: new Date(2026, 2, 15),
  },
  {
    id: generateId(),
    name: "Layla Mohammed",
    age: 1,
    ageInMonths: 10,
    motherName: "Aisha Mohammed",
    vaccinationStatus: "complete",
    missedVaccines: [],
    status: "stable",
    riskFactors: [],
    lastCheckup: new Date(2026, 3, 18),
  },
  {
    id: generateId(),
    name: "Nia Kofi",
    age: 2,
    ageInMonths: 28,
    motherName: "Leila Kofi",
    vaccinationStatus: "complete",
    missedVaccines: [],
    status: "stable",
    riskFactors: [],
    lastCheckup: new Date(2026, 3, 20),
  },
  {
    id: generateId(),
    name: "Arjun Patel",
    age: 1,
    ageInMonths: 12,
    motherName: "Nadia Patel",
    vaccinationStatus: "incomplete",
    missedVaccines: ["DPT 2"],
    status: "moderate-risk",
    riskFactors: ["Delayed vaccination"],
    lastCheckup: new Date(2026, 3, 22),
  },
  {
    id: generateId(),
    name: "Fatima Yusuf",
    age: 0,
    ageInMonths: 2,
    motherName: "Habiba Yusuf",
    vaccinationStatus: "incomplete",
    missedVaccines: ["DPT 1", "Polio 1"],
    status: "stable",
    riskFactors: [],
    lastCheckup: new Date(2026, 3, 8),
  },
  {
    id: generateId(),
    name: "Kwame Mensah",
    age: 3,
    ageInMonths: 36,
    motherName: "Sophia Mensah",
    vaccinationStatus: "complete",
    missedVaccines: [],
    status: "stable",
    riskFactors: [],
    lastCheckup: new Date(2026, 3, 25),
  },
  {
    id: generateId(),
    name: "Amir Khalil",
    age: 2,
    ageInMonths: 20,
    motherName: "Yasmin Khalil",
    vaccinationStatus: "incomplete",
    missedVaccines: ["DPT 3"],
    status: "moderate-risk",
    riskFactors: ["Delayed vaccination"],
    lastCheckup: new Date(2026, 3, 12),
  },
];

export const communityMetrics: CommunityMetrics = {
  totalMothers: communityMothers.length,
  totalChildren: communityChildren.length,
  prenatalCoverage: 87,
  vaccinationCompletion: 72,
  averageMissedVisits: 0.6,
  highRiskCases: 3,
  moderateRiskCases: 5,
  stableCases: 7,
  overdueAppointments: 2,
  missedVaccinations: 4,
};

export const getCommunityData = () => {
  return {
    mothers: communityMothers,
    children: communityChildren,
    metrics: communityMetrics,
  };
};
