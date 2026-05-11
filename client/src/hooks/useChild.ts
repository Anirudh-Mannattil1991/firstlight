import { useState, useEffect, useCallback } from 'react';
import { db, ChildData, VaccinationRecord, NutritionLog } from '@/lib/db';
import { generateId } from '@/lib/utils';

export const useChild = () => {
  const [children, setChildren] = useState<ChildData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load children data
  useEffect(() => {
    const loadChildren = async () => {
      try {
        const data = await db.getAllChildren();
        setChildren(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load children data');
      } finally {
        setLoading(false);
      }
    };

    loadChildren();
  }, []);

  // Create new child
  const createChild = useCallback(
    async (name: string, dateOfBirth: Date, gender: 'male' | 'female') => {
      try {
        const newChild: ChildData = {
          id: generateId(),
          name,
          dateOfBirth,
          gender,
          vaccinations: [],
          nutritionLogs: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db.saveChild(newChild);
        setChildren((prev) => [...prev, newChild]);
        return newChild;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create child';
        setError(message);
        throw err;
      }
    },
    []
  );

  // Update child
  const updateChild = useCallback(
    async (childId: string, updates: Partial<ChildData>) => {
      try {
        const child = children.find((c) => c.id === childId);
        if (!child) throw new Error('Child not found');

        const updated = {
          ...child,
          ...updates,
          updatedAt: new Date(),
        };

        await db.saveChild(updated);
        setChildren((prev) =>
          prev.map((c) => (c.id === childId ? updated : c))
        );
        return updated;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update child';
        setError(message);
        throw err;
      }
    },
    [children]
  );

  // Delete child
  const deleteChild = useCallback(
    async (childId: string) => {
      try {
        await db.deleteChild(childId);
        setChildren((prev) => prev.filter((c) => c.id !== childId));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete child';
        setError(message);
        throw err;
      }
    },
    []
  );

  // Add vaccination
  const addVaccination = useCallback(
    async (childId: string, vaccination: Omit<VaccinationRecord, 'id'>) => {
      try {
        const child = children.find((c) => c.id === childId);
        if (!child) throw new Error('Child not found');

        const newVaccination: VaccinationRecord = {
          ...vaccination,
          id: generateId(),
        };

        const updated = {
          ...child,
          vaccinations: [...child.vaccinations, newVaccination],
          updatedAt: new Date(),
        };

        await db.saveChild(updated);
        setChildren((prev) =>
          prev.map((c) => (c.id === childId ? updated : c))
        );
        return newVaccination;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to add vaccination';
        setError(message);
        throw err;
      }
    },
    [children]
  );

  // Update vaccination
  const updateVaccination = useCallback(
    async (childId: string, vaccinationId: string, updates: Partial<VaccinationRecord>) => {
      try {
        const child = children.find((c) => c.id === childId);
        if (!child) throw new Error('Child not found');

        const updated = {
          ...child,
          vaccinations: child.vaccinations.map((v) =>
            v.id === vaccinationId ? { ...v, ...updates } : v
          ),
          updatedAt: new Date(),
        };

        await db.saveChild(updated);
        setChildren((prev) =>
          prev.map((c) => (c.id === childId ? updated : c))
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update vaccination';
        setError(message);
        throw err;
      }
    },
    [children]
  );

  // Add nutrition log
  const addNutritionLog = useCallback(
    async (childId: string, log: Omit<NutritionLog, 'id'>) => {
      try {
        const child = children.find((c) => c.id === childId);
        if (!child) throw new Error('Child not found');

        const newLog: NutritionLog = {
          ...log,
          id: generateId(),
        };

        const updated = {
          ...child,
          nutritionLogs: [...child.nutritionLogs, newLog],
          updatedAt: new Date(),
        };

        await db.saveChild(updated);
        setChildren((prev) =>
          prev.map((c) => (c.id === childId ? updated : c))
        );
        return newLog;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to add nutrition log';
        setError(message);
        throw err;
      }
    },
    [children]
  );

  // Get child by ID
  const getChild = useCallback(
    (childId: string) => {
      return children.find((c) => c.id === childId);
    },
    [children]
  );

  return {
    children,
    loading,
    error,
    createChild,
    updateChild,
    deleteChild,
    addVaccination,
    updateVaccination,
    addNutritionLog,
    getChild,
  };
};
