import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date utilities
export const DateUtils = {
  calculateDueDate: (lastMenstrualPeriod: Date): Date => {
    const dueDate = new Date(lastMenstrualPeriod);
    dueDate.setDate(dueDate.getDate() + 280); // 40 weeks
    return dueDate;
  },

  calculateCurrentWeek: (lastMenstrualPeriod: Date): number => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastMenstrualPeriod.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7) + 1;
  },

  calculateTrimester: (week: number): 1 | 2 | 3 => {
    if (week <= 13) return 1;
    if (week <= 27) return 2;
    return 3;
  },

  calculateAge: (dateOfBirth: Date): number => {
    const now = new Date();
    let age = now.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = now.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    return age;
  },

  calculateAgeInMonths: (dateOfBirth: Date): number => {
    const now = new Date();
    let months = (now.getFullYear() - dateOfBirth.getFullYear()) * 12;
    months += now.getMonth() - dateOfBirth.getMonth();
    return months;
  },

  calculateDaysUntil: (targetDate: Date): number => {
    const now = new Date();
    const diffTime = targetDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  isOverdue: (dueDate: Date): boolean => {
    return new Date() > dueDate;
  },

  isUpcoming: (dueDate: Date, daysAhead: number = 30): boolean => {
    const now = new Date();
    const daysUntil = DateUtils.calculateDaysUntil(dueDate);
    return daysUntil > 0 && daysUntil <= daysAhead;
  },

  formatDate: (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  formatDateShort: (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  },

  formatDateTime: (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  getMonthName: (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'long' });
  },

  getWeekNumber: (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  },
};

// Vaccination schedule (WHO standard)
export const VACCINATION_SCHEDULE = [
  { age: 0, vaccine: 'BCG', ageInMonths: 0 },
  { age: 0, vaccine: 'Polio (OPV/IPV)', ageInMonths: 0 },
  { age: 0, vaccine: 'Hepatitis B', ageInMonths: 0 },
  { age: 6, vaccine: 'DPT 1', ageInMonths: 6 },
  { age: 6, vaccine: 'Polio 1', ageInMonths: 6 },
  { age: 6, vaccine: 'Hepatitis B 1', ageInMonths: 6 },
  { age: 10, vaccine: 'DPT 2', ageInMonths: 10 },
  { age: 10, vaccine: 'Polio 2', ageInMonths: 10 },
  { age: 10, vaccine: 'Hepatitis B 2', ageInMonths: 10 },
  { age: 14, vaccine: 'DPT 3', ageInMonths: 14 },
  { age: 14, vaccine: 'Polio 3', ageInMonths: 14 },
  { age: 14, vaccine: 'Hepatitis B 3', ageInMonths: 14 },
  { age: 18, vaccine: 'DPT Booster', ageInMonths: 18 },
  { age: 24, vaccine: 'Polio Booster', ageInMonths: 24 },
  { age: 60, vaccine: 'DPT Booster 2', ageInMonths: 60 },
];

// Pregnancy milestones
export const PREGNANCY_MILESTONES = [
  { week: 4, title: 'Conception', description: 'Baby is the size of a poppy seed' },
  { week: 8, title: 'Heartbeat Visible', description: 'Baby\'s heartbeat can be detected' },
  { week: 12, title: 'First Trimester Complete', description: 'Risk of miscarriage decreases' },
  { week: 16, title: 'Baby Movements', description: 'Mother may feel first movements' },
  { week: 20, title: 'Halfway There', description: 'Mid-pregnancy ultrasound' },
  { week: 24, title: 'Viability', description: 'Baby can survive outside the womb' },
  { week: 28, title: 'Third Trimester Begins', description: 'Baby gains weight rapidly' },
  { week: 32, title: 'Baby Drops', description: 'Baby moves lower in the pelvis' },
  { week: 36, title: 'Full Term', description: 'Baby is considered full-term' },
  { week: 40, title: 'Due Date', description: 'Expected delivery date' },
];

// Nutrition recommendations
export const NUTRITION_RECOMMENDATIONS = {
  pregnancy: {
    calories: 2500,
    protein: 71,
    iron: 27,
    calcium: 1000,
    folic_acid: 600,
  },
  breastfeeding: {
    calories: 2700,
    protein: 71,
    iron: 9,
    calcium: 1000,
    folic_acid: 500,
  },
};

// Utility functions for vaccination status
export const getVaccinationStatus = (
  scheduledDate: Date,
  completedDate?: Date
): 'completed' | 'upcoming' | 'overdue' => {
  if (completedDate) return 'completed';
  if (DateUtils.isOverdue(scheduledDate)) return 'overdue';
  return 'upcoming';
};

// Generate unique IDs
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Format numbers
export const formatNumber = (num: number, decimals: number = 0): string => {
  return num.toFixed(decimals);
};

// Calculate BMI
export const calculateBMI = (weight: number, height: number): number => {
  return weight / (height * height);
};

// Get BMI category
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

// Pregnancy nutrition advice
export const getPregnancyAdvice = (week: number): string => {
  if (week < 4) return 'Take prenatal vitamins with folic acid';
  if (week < 12)
    return 'Eat small, frequent meals. Folic acid is crucial for baby development';
  if (week < 20)
    return 'Increase protein intake. Baby is growing rapidly';
  if (week < 28)
    return 'Focus on iron-rich foods to prevent anemia';
  if (week < 36)
    return 'Eat calcium-rich foods for baby\'s bone development';
  return 'Eat light meals frequently. Stay hydrated';
};

// Vaccination advice
export const getVaccinationAdvice = (ageInMonths: number): string => {
  if (ageInMonths < 1) return 'BCG and Hepatitis B vaccines are given at birth';
  if (ageInMonths < 6) return 'DPT and Polio vaccines protect against serious diseases';
  if (ageInMonths < 12) return 'Booster doses strengthen immunity';
  if (ageInMonths < 24) return 'Continue with scheduled boosters for complete protection';
  return 'Follow up with school vaccines as recommended';
};

// Check if online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Debounce function
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number
export const validatePhone = (phone: string): boolean => {
  const re = /^[\d\s\-\+\(\)]{10,}$/;
  return re.test(phone);
};
