import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { generateId } from "@/lib/utils";
import {
  userJourneyA,
  userJourneyB,
  userJourneyC,
  childUserA,
  timelineEventsUserA,
  timelineEventsUserB,
  timelineEventsUserC,
  timelineEventsChildA,
} from "@/data/seedData";
import { nutritionLogsUserA, nutritionLogsUserB, nutritionLogsUserC } from "@/data/nutritionSeedData";

export interface PregnancyData {
  id: string;
  lastMenstrualPeriod: Date;
  dueDate: Date;
  currentWeek: number;
  appointments: Array<{
    id: string;
    date: Date;
    type: string;
    notes: string;
    completed: boolean;
  }>;
  measurements: Array<{
    id: string;
    date: Date;
    weight?: number;
    bloodPressure?: string;
    notes?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChildData {
  id: string;
  name: string;
  dateOfBirth: Date;
  gender: "male" | "female";
  vaccinations: Array<{
    id: string;
    vaccine: string;
    scheduledDate: Date;
    completedDate?: Date;
    location?: string;
    notes?: string;
    status: "completed" | "pending" | "overdue" | "upcoming";
  }>;
  nutritionLogs: Array<{
    id: string;
    date: Date;
    meals: Array<{
      id: string;
      type: "breakfast" | "lunch" | "dinner" | "snack";
      description: string;
      calories?: number;
    }>;
    waterIntake: number;
    notes?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineEvent {
  id: string;
  type: "pregnancy" | "vaccination" | "nutrition" | "appointment" | "milestone" | "other";
  date: Date;
  title: string;
  description: string;
  relatedId?: string;
}

export interface AppDataState {
  pregnancies: PregnancyData[];
  children: ChildData[];
  timelineEvents: TimelineEvent[];
}

export type AppDataAction =
  | { type: "ADD_PREGNANCY"; payload: PregnancyData }
  | { type: "UPDATE_PREGNANCY"; payload: PregnancyData }
  | { type: "ADD_APPOINTMENT"; payload: { pregnancyId: string; appointment: any } }
  | { type: "ADD_MEASUREMENT"; payload: { pregnancyId: string; measurement: any } }
  | { type: "ADD_CHILD"; payload: ChildData }
  | { type: "UPDATE_CHILD"; payload: ChildData }
  | { type: "ADD_VACCINATION"; payload: { childId: string; vaccination: any } }
  | { type: "ADD_NUTRITION_LOG"; payload: { childId: string; log: any } }
  | { type: "ADD_TIMELINE_EVENT"; payload: TimelineEvent }
  | { type: "LOAD_INITIAL_DATA" };

const initialState: AppDataState = {
  pregnancies: [],
  children: [],
  timelineEvents: [],
};

function appDataReducer(state: AppDataState, action: AppDataAction): AppDataState {
  switch (action.type) {
    case "LOAD_INITIAL_DATA":
      return {
        pregnancies: [userJourneyA, userJourneyB, userJourneyC],
        children: [childUserA],
        timelineEvents: [
          ...timelineEventsUserA,
          ...timelineEventsUserB,
          ...timelineEventsUserC,
          ...timelineEventsChildA,
        ],
      };

    case "ADD_PREGNANCY":
      return {
        ...state,
        pregnancies: [...state.pregnancies, action.payload],
      };

    case "UPDATE_PREGNANCY":
      return {
        ...state,
        pregnancies: state.pregnancies.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    case "ADD_APPOINTMENT":
      return {
        ...state,
        pregnancies: state.pregnancies.map((p) =>
          p.id === action.payload.pregnancyId
            ? {
                ...p,
                appointments: [...p.appointments, action.payload.appointment],
                updatedAt: new Date(),
              }
            : p
        ),
      };

    case "ADD_MEASUREMENT":
      return {
        ...state,
        pregnancies: state.pregnancies.map((p) =>
          p.id === action.payload.pregnancyId
            ? {
                ...p,
                measurements: [...p.measurements, action.payload.measurement],
                updatedAt: new Date(),
              }
            : p
        ),
      };

    case "ADD_CHILD":
      return {
        ...state,
        children: [...state.children, action.payload],
      };

    case "UPDATE_CHILD":
      return {
        ...state,
        children: state.children.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case "ADD_VACCINATION":
      return {
        ...state,
        children: state.children.map((c) =>
          c.id === action.payload.childId
            ? {
                ...c,
                vaccinations: [...c.vaccinations, action.payload.vaccination],
                updatedAt: new Date(),
              }
            : c
        ),
      };

    case "ADD_NUTRITION_LOG":
      return {
        ...state,
        children: state.children.map((c) =>
          c.id === action.payload.childId
            ? {
                ...c,
                nutritionLogs: [...c.nutritionLogs, action.payload.log],
                updatedAt: new Date(),
              }
            : c
        ),
      };

    case "ADD_TIMELINE_EVENT":
      return {
        ...state,
        timelineEvents: [action.payload, ...state.timelineEvents],
      };

    default:
      return state;
  }
}

interface AppDataContextType {
  state: AppDataState;
  dispatch: React.Dispatch<AppDataAction>;
  addPregnancy: (lmp: Date) => void;
  addAppointment: (pregnancyId: string, appointment: any) => void;
  addMeasurement: (pregnancyId: string, measurement: any) => void;
  addChild: (name: string, dob: Date, gender: "male" | "female") => void;
  addVaccination: (childId: string, vaccination: any) => void;
  addNutritionLog: (childId: string, log: any) => void;
  addTimelineEvent: (event: TimelineEvent) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appDataReducer, initialState);

  React.useEffect(() => {
    dispatch({ type: "LOAD_INITIAL_DATA" });
  }, []);

  const addPregnancy = (lmp: Date) => {
    const currentWeek = Math.floor(
      (new Date().getTime() - lmp.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );
    const dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);

    const pregnancy: PregnancyData = {
      id: generateId(),
      lastMenstrualPeriod: lmp,
      dueDate,
      currentWeek: Math.max(0, currentWeek),
      appointments: [],
      measurements: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: "ADD_PREGNANCY", payload: pregnancy });

    // Add timeline event
    const event: TimelineEvent = {
      id: generateId(),
      type: "pregnancy",
      date: new Date(),
      title: "Pregnancy Confirmed",
      description: `Pregnancy started on ${lmp.toLocaleDateString()}. Due date: ${dueDate.toLocaleDateString()}`,
      relatedId: pregnancy.id,
    };
    dispatch({ type: "ADD_TIMELINE_EVENT", payload: event });
  };

  const addAppointment = (pregnancyId: string, appointment: any) => {
    dispatch({
      type: "ADD_APPOINTMENT",
      payload: { pregnancyId, appointment: { ...appointment, id: generateId() } },
    });

    // Add timeline event
    const event: TimelineEvent = {
      id: generateId(),
      type: "pregnancy",
      date: appointment.date,
      title: `Appointment: ${appointment.type}`,
      description: appointment.notes || "Prenatal appointment",
      relatedId: pregnancyId,
    };
    dispatch({ type: "ADD_TIMELINE_EVENT", payload: event });
  };

  const addMeasurement = (pregnancyId: string, measurement: any) => {
    dispatch({
      type: "ADD_MEASUREMENT",
      payload: { pregnancyId, measurement: { ...measurement, id: generateId() } },
    });
  };

  const addChild = (name: string, dob: Date, gender: "male" | "female") => {
    const child: ChildData = {
      id: generateId(),
      name,
      dateOfBirth: dob,
      gender,
      vaccinations: [],
      nutritionLogs: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: "ADD_CHILD", payload: child });

    // Add timeline event
    const event: TimelineEvent = {
      id: generateId(),
      type: "other",
      date: new Date(),
      title: `Child Profile Created: ${name}`,
      description: `${gender === "male" ? "Boy" : "Girl"} born on ${dob.toLocaleDateString()}`,
      relatedId: child.id,
    };
    dispatch({ type: "ADD_TIMELINE_EVENT", payload: event });
  };

  const addVaccination = (childId: string, vaccination: any) => {
    dispatch({
      type: "ADD_VACCINATION",
      payload: { childId, vaccination: { ...vaccination, id: generateId() } },
    });

    // Add timeline event
    const event: TimelineEvent = {
      id: generateId(),
      type: "vaccination",
      date: vaccination.completedDate || vaccination.scheduledDate,
      title: `Vaccination: ${vaccination.vaccine}`,
      description: vaccination.notes || `${vaccination.vaccine} administered`,
      relatedId: childId,
    };
    dispatch({ type: "ADD_TIMELINE_EVENT", payload: event });
  };

  const addNutritionLog = (childId: string, log: any) => {
    dispatch({
      type: "ADD_NUTRITION_LOG",
      payload: { childId, log: { ...log, id: generateId() } },
    });

    // Add timeline event
    const event: TimelineEvent = {
      id: generateId(),
      type: "nutrition",
      date: log.date,
      title: "Nutrition Log",
      description: log.meals.map((m: any) => m.description).join(", "),
      relatedId: childId,
    };
    dispatch({ type: "ADD_TIMELINE_EVENT", payload: event });
  };

  const addTimelineEvent = (event: TimelineEvent) => {
    dispatch({ type: "ADD_TIMELINE_EVENT", payload: event });
  };

  return (
    <AppDataContext.Provider
      value={{
        state,
        dispatch,
        addPregnancy,
        addAppointment,
        addMeasurement,
        addChild,
        addVaccination,
        addNutritionLog,
        addTimelineEvent,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return context;
}
