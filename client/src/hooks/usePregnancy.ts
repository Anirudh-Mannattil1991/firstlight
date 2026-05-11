import { useState, useEffect, useCallback } from 'react';
import { db, PregnancyData, PregnancyAppointment, PregnancyMeasurement } from '@/lib/db';
import { generateId } from '@/lib/utils';

export const usePregnancy = () => {
  const [pregnancy, setPregnancy] = useState<PregnancyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load pregnancy data
  useEffect(() => {
    const loadPregnancy = async () => {
      try {
        const pregnancies = await db.getAllPregnancies();
        if (pregnancies.length > 0) {
          setPregnancy(pregnancies[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pregnancy data');
      } finally {
        setLoading(false);
      }
    };

    loadPregnancy();
  }, []);

  // Create new pregnancy
  const createPregnancy = useCallback(
    async (lastMenstrualPeriod: Date) => {
      try {
        const dueDate = new Date(lastMenstrualPeriod);
        dueDate.setDate(dueDate.getDate() + 280);

        const newPregnancy: PregnancyData = {
          id: generateId(),
          lastMenstrualPeriod,
          dueDate,
          currentWeek: 1,
          appointments: [],
          measurements: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db.savePregnancy(newPregnancy);
        setPregnancy(newPregnancy);
        return newPregnancy;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create pregnancy';
        setError(message);
        throw err;
      }
    },
    []
  );

  // Add appointment
  const addAppointment = useCallback(
    async (appointment: Omit<PregnancyAppointment, 'id'>) => {
      if (!pregnancy) throw new Error('No pregnancy data');

      try {
        const newAppointment: PregnancyAppointment = {
          ...appointment,
          id: generateId(),
        };

        const updated = {
          ...pregnancy,
          appointments: [...pregnancy.appointments, newAppointment],
          updatedAt: new Date(),
        };

        await db.savePregnancy(updated);
        setPregnancy(updated);
        return newAppointment;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to add appointment';
        setError(message);
        throw err;
      }
    },
    [pregnancy]
  );

  // Update appointment
  const updateAppointment = useCallback(
    async (appointmentId: string, updates: Partial<PregnancyAppointment>) => {
      if (!pregnancy) throw new Error('No pregnancy data');

      try {
        const updated = {
          ...pregnancy,
          appointments: pregnancy.appointments.map((apt) =>
            apt.id === appointmentId ? { ...apt, ...updates } : apt
          ),
          updatedAt: new Date(),
        };

        await db.savePregnancy(updated);
        setPregnancy(updated);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update appointment';
        setError(message);
        throw err;
      }
    },
    [pregnancy]
  );

  // Delete appointment
  const deleteAppointment = useCallback(
    async (appointmentId: string) => {
      if (!pregnancy) throw new Error('No pregnancy data');

      try {
        const updated = {
          ...pregnancy,
          appointments: pregnancy.appointments.filter((apt) => apt.id !== appointmentId),
          updatedAt: new Date(),
        };

        await db.savePregnancy(updated);
        setPregnancy(updated);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete appointment';
        setError(message);
        throw err;
      }
    },
    [pregnancy]
  );

  // Add measurement
  const addMeasurement = useCallback(
    async (measurement: Omit<PregnancyMeasurement, 'id'>) => {
      if (!pregnancy) throw new Error('No pregnancy data');

      try {
        const newMeasurement: PregnancyMeasurement = {
          ...measurement,
          id: generateId(),
        };

        const updated = {
          ...pregnancy,
          measurements: [...pregnancy.measurements, newMeasurement],
          updatedAt: new Date(),
        };

        await db.savePregnancy(updated);
        setPregnancy(updated);
        return newMeasurement;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to add measurement';
        setError(message);
        throw err;
      }
    },
    [pregnancy]
  );

  return {
    pregnancy,
    loading,
    error,
    createPregnancy,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    addMeasurement,
  };
};
