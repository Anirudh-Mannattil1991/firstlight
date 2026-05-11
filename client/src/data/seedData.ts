import { PregnancyData, ChildData, TimelineEvent } from "@/lib/db";
import { generateId } from "@/lib/utils";

// User Journey A: High-risk pregnancy (urban, 32 weeks)
export const userJourneyA: PregnancyData = {
  id: generateId(),
  lastMenstrualPeriod: new Date(2025, 8, 15), // Sept 15, 2025
  dueDate: new Date(2026, 5, 23), // June 23, 2026
  currentWeek: 32,
  appointments: [
    {
      id: generateId(),
      date: new Date(2025, 9, 20),
      type: "initial_checkup",
      notes: "Initial prenatal visit. BP slightly elevated (138/88). Recommended rest and monitoring.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2025, 10, 3),
      type: "ultrasound",
      notes: "First trimester ultrasound. Baby measuring 12 weeks 3 days. Heartbeat strong at 162 bpm.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2025, 10, 24),
      type: "checkup",
      notes: "Second trimester visit. Glucose screening normal. Weight gain on track.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2025, 11, 15),
      type: "missed",
      notes: "Missed appointment - work conflict. Rescheduled for next week.",
      completed: false,
    },
    {
      id: generateId(),
      date: new Date(2025, 11, 22),
      type: "checkup",
      notes: "Follow-up after missed visit. Baby position normal. Discussed gestational hypertension risk.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2026, 0, 19),
      type: "ultrasound",
      notes: "Anatomy scan at 20 weeks. All organs developing normally. Baby is a girl!",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2026, 1, 16),
      type: "checkup",
      notes: "Third trimester begins. BP elevated again (140/90). Started on medication. Advised reduced activity.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2026, 2, 16),
      type: "checkup",
      notes: "28-week visit. Glucose tolerance test done. Monitoring for gestational diabetes.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2026, 3, 20),
      type: "checkup",
      notes: "32-week visit. Baby head-down. Swelling in legs. Discussed labor signs and hospital plan.",
      completed: true,
    },
  ],
  measurements: [
    {
      id: generateId(),
      date: new Date(2025, 10, 3),
      weight: 62.5,
      bloodPressure: "120/78",
      notes: "Baseline measurements",
    },
    {
      id: generateId(),
      date: new Date(2025, 11, 22),
      weight: 67.2,
      bloodPressure: "138/88",
      notes: "BP elevated, started monitoring",
    },
    {
      id: generateId(),
      date: new Date(2026, 1, 16),
      weight: 72.8,
      bloodPressure: "140/90",
      notes: "Started antihypertensive medication",
    },
    {
      id: generateId(),
      date: new Date(2026, 3, 20),
      weight: 78.5,
      bloodPressure: "135/85",
      notes: "Swelling in extremities noted",
    },
  ],
  createdAt: new Date(2025, 9, 20),
  updatedAt: new Date(2026, 3, 20),
};

// User Journey B: Normal pregnancy (rural, 28 weeks)
export const userJourneyB: PregnancyData = {
  id: generateId(),
  lastMenstrualPeriod: new Date(2025, 9, 1), // Oct 1, 2025
  dueDate: new Date(2026, 6, 8), // July 8, 2026
  currentWeek: 28,
  appointments: [
    {
      id: generateId(),
      date: new Date(2025, 10, 15),
      type: "initial_checkup",
      notes: "First visit at village clinic. All vitals normal. Prescribed iron supplements.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2025, 11, 10),
      type: "checkup",
      notes: "12-week visit. Baby developing well. Morning sickness improving.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2026, 0, 14),
      type: "checkup",
      notes: "16-week visit. Feeling baby movements. Very happy.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2026, 1, 18),
      type: "ultrasound",
      notes: "Anatomy scan. Baby boy! All measurements normal.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2026, 2, 18),
      type: "checkup",
      notes: "24-week visit. Weight gain normal. Appetite good.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2026, 3, 15),
      type: "checkup",
      notes: "28-week visit. Glucose screening normal. Baby very active.",
      completed: true,
    },
  ],
  measurements: [
    {
      id: generateId(),
      date: new Date(2025, 10, 15),
      weight: 58.0,
      bloodPressure: "118/76",
      notes: "Baseline",
    },
    {
      id: generateId(),
      date: new Date(2026, 1, 18),
      weight: 65.5,
      bloodPressure: "120/78",
      notes: "Progressing well",
    },
    {
      id: generateId(),
      date: new Date(2026, 3, 15),
      weight: 71.2,
      bloodPressure: "122/80",
      notes: "All normal",
    },
  ],
  createdAt: new Date(2025, 10, 15),
  updatedAt: new Date(2026, 3, 15),
};

// User Journey C: Teenage pregnancy (irregular care, 20 weeks)
export const userJourneyC: PregnancyData = {
  id: generateId(),
  lastMenstrualPeriod: new Date(2025, 10, 20), // Nov 20, 2025
  dueDate: new Date(2026, 7, 27), // Aug 27, 2026
  currentWeek: 20,
  appointments: [
    {
      id: generateId(),
      date: new Date(2025, 11, 28),
      type: "initial_checkup",
      notes: "First prenatal visit. Teenage mother, nervous but engaged. Counseled on nutrition and rest.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2026, 0, 11),
      type: "missed",
      notes: "Missed appointment - school exams",
      completed: false,
    },
    {
      id: generateId(),
      date: new Date(2026, 0, 25),
      type: "checkup",
      notes: "Follow-up after missed visit. Baby measuring on track. Discussed school continuation.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2026, 2, 1),
      type: "ultrasound",
      notes: "Anatomy scan at 16 weeks. Baby girl! Mother very emotional.",
      completed: true,
    },
    {
      id: generateId(),
      date: new Date(2026, 3, 5),
      type: "checkup",
      notes: "20-week visit. Anemia detected (Hb 10.2). Started iron supplementation.",
      completed: true,
    },
  ],
  measurements: [
    {
      id: generateId(),
      date: new Date(2025, 11, 28),
      weight: 54.5,
      bloodPressure: "116/74",
      notes: "Baseline - young mother",
    },
    {
      id: generateId(),
      date: new Date(2026, 0, 25),
      weight: 56.8,
      bloodPressure: "118/76",
      notes: "Slow weight gain",
    },
    {
      id: generateId(),
      date: new Date(2026, 3, 5),
      weight: 60.2,
      bloodPressure: "120/78",
      notes: "Anemia detected",
    },
  ],
  createdAt: new Date(2025, 11, 28),
  updatedAt: new Date(2026, 3, 5),
};

// Child data for User A (post-birth scenario)
export const childUserA: ChildData = {
  id: generateId(),
  name: "Zara Patel",
  dateOfBirth: new Date(2025, 6, 15),
  gender: "female",
  vaccinations: [
    {
      id: generateId(),
      vaccine: "BCG",
      scheduledDate: new Date(2025, 6, 15),
      completedDate: new Date(2025, 6, 15),
      location: "City Hospital",
      notes: "At birth",
      status: "completed",
    },
    {
      id: generateId(),
      vaccine: "Polio (OPV)",
      scheduledDate: new Date(2025, 6, 15),
      completedDate: new Date(2025, 6, 15),
      location: "City Hospital",
      status: "completed",
    },
    {
      id: generateId(),
      vaccine: "Hepatitis B",
      scheduledDate: new Date(2025, 6, 15),
      completedDate: new Date(2025, 6, 16),
      location: "City Hospital",
      status: "completed",
    },
    {
      id: generateId(),
      vaccine: "DPT 1",
      scheduledDate: new Date(2025, 7, 20),
      completedDate: new Date(2025, 7, 22),
      location: "Primary Health Center",
      notes: "Slight fever after vaccination, resolved",
      status: "completed",
    },
    {
      id: generateId(),
      vaccine: "Polio 1",
      scheduledDate: new Date(2025, 7, 20),
      completedDate: new Date(2025, 7, 22),
      location: "Primary Health Center",
      status: "completed",
    },
    {
      id: generateId(),
      vaccine: "DPT 2",
      scheduledDate: new Date(2025, 8, 24),
      completedDate: new Date(2025, 8, 26),
      location: "Primary Health Center",
      status: "completed",
    },
    {
      id: generateId(),
      vaccine: "Polio 2",
      scheduledDate: new Date(2025, 8, 24),
      completedDate: new Date(2025, 8, 26),
      location: "Primary Health Center",
      status: "completed",
    },
    {
      id: generateId(),
      vaccine: "DPT 3",
      scheduledDate: new Date(2025, 9, 28),
      completedDate: new Date(2025, 10, 1),
      location: "Primary Health Center",
      notes: "Delayed by 4 days due to mother's work",
      status: "completed",
    },
    {
      id: generateId(),
      vaccine: "Polio 3",
      scheduledDate: new Date(2025, 9, 28),
      completedDate: new Date(2025, 10, 1),
      location: "Primary Health Center",
      status: "completed",
    },
  ],
  nutritionLogs: [
    {
      id: generateId(),
      date: new Date(2025, 7, 15),
      meals: [
        {
          id: generateId(),
          type: "breakfast",
          description: "Breast milk only",
        },
      ],
      waterIntake: 0,
      notes: "Exclusive breastfeeding started",
    },
    {
      id: generateId(),
      date: new Date(2025, 9, 1),
      meals: [
        {
          id: generateId(),
          type: "breakfast",
          description: "Breast milk + rice cereal",
        },
        {
          id: generateId(),
          type: "lunch",
          description: "Mashed banana",
        },
      ],
      waterIntake: 2,
      notes: "Started solids at 6 weeks",
    },
  ],
  createdAt: new Date(2025, 6, 15),
  updatedAt: new Date(2025, 10, 1),
};

// Timeline events for comprehensive history
export const timelineEventsUserA: TimelineEvent[] = [
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2025, 9, 20),
    title: "Pregnancy Confirmed",
    description: "Initial prenatal visit. Blood pressure slightly elevated (138/88). Started prenatal vitamins.",
    relatedId: userJourneyA.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2025, 10, 3),
    title: "First Ultrasound",
    description: "12-week ultrasound. Baby measuring 12w3d. Strong heartbeat at 162 bpm.",
    relatedId: userJourneyA.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2025, 10, 24),
    title: "Second Trimester Checkup",
    description: "Glucose screening normal. Weight gain on track. Feeling baby movements starting.",
    relatedId: userJourneyA.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2026, 0, 19),
    title: "Anatomy Scan",
    description: "20-week anatomy scan. All organs developing normally. Baby is a girl!",
    relatedId: userJourneyA.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2026, 1, 16),
    title: "Gestational Hypertension Diagnosed",
    description: "Blood pressure elevated (140/90). Started on antihypertensive medication. Advised rest.",
    relatedId: userJourneyA.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2026, 2, 16),
    title: "Glucose Tolerance Test",
    description: "28-week visit. Glucose tolerance test completed. Monitoring for gestational diabetes.",
    relatedId: userJourneyA.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2026, 3, 20),
    title: "Third Trimester Milestone",
    description: "32-week visit. Baby in head-down position. Discussed labor signs and hospital plan.",
    relatedId: userJourneyA.id,
  },
];

export const timelineEventsUserB: TimelineEvent[] = [
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2025, 10, 15),
    title: "First Prenatal Visit",
    description: "Initial visit at village clinic. All vitals normal. Prescribed iron supplements.",
    relatedId: userJourneyB.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2025, 11, 10),
    title: "First Trimester Complete",
    description: "12-week checkup. Baby developing well. Morning sickness improving significantly.",
    relatedId: userJourneyB.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2026, 0, 14),
    title: "Baby Movements Felt",
    description: "16-week visit. Mother feeling baby movements for the first time. Very happy!",
    relatedId: userJourneyB.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2026, 1, 18),
    title: "Baby Gender Revealed",
    description: "Anatomy scan at 20 weeks. Baby boy! All measurements normal and healthy.",
    relatedId: userJourneyB.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2026, 3, 15),
    title: "Glucose Screening Passed",
    description: "28-week visit. Glucose screening normal. Baby very active. Mother feeling great.",
    relatedId: userJourneyB.id,
  },
];

export const timelineEventsUserC: TimelineEvent[] = [
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2025, 11, 28),
    title: "Teenage Pregnancy Confirmed",
    description: "First prenatal visit. Teenage mother, nervous but engaged. Counseled on nutrition.",
    relatedId: userJourneyC.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2026, 0, 25),
    title: "Catch-up Visit",
    description: "Follow-up after missed appointment due to school exams. Baby measuring on track.",
    relatedId: userJourneyC.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2026, 2, 1),
    title: "Baby Girl Confirmed",
    description: "16-week anatomy scan. Baby girl! Mother very emotional and excited.",
    relatedId: userJourneyC.id,
  },
  {
    id: generateId(),
    type: "pregnancy",
    date: new Date(2026, 3, 5),
    title: "Anemia Detected",
    description: "20-week visit. Anemia detected (Hb 10.2). Started iron supplementation.",
    relatedId: userJourneyC.id,
  },
];

export const timelineEventsChildA: TimelineEvent[] = [
  {
    id: generateId(),
    type: "vaccination",
    date: new Date(2025, 6, 15),
    title: "Birth Vaccinations",
    description: "BCG, Polio, and Hepatitis B given at birth. All vaccines administered successfully.",
    relatedId: childUserA.id,
  },
  {
    id: generateId(),
    type: "vaccination",
    date: new Date(2025, 7, 22),
    title: "First Vaccination Series",
    description: "DPT 1, Polio 1 completed. Slight fever after vaccination, resolved within 24 hours.",
    relatedId: childUserA.id,
  },
  {
    id: generateId(),
    type: "vaccination",
    date: new Date(2025, 8, 26),
    title: "Second Vaccination Series",
    description: "DPT 2, Polio 2 completed. No adverse effects. Baby doing well.",
    relatedId: childUserA.id,
  },
  {
    id: generateId(),
    type: "vaccination",
    date: new Date(2025, 10, 1),
    title: "Third Vaccination Series",
    description: "DPT 3, Polio 3 completed. Delayed by 4 days due to mother's work schedule.",
    relatedId: childUserA.id,
  },
];
