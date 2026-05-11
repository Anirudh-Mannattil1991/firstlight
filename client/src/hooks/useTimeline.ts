import { useState, useEffect, useCallback } from 'react';
import { db, TimelineEvent } from '@/lib/db';
import { generateId } from '@/lib/utils';

export const useTimeline = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load timeline events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await db.getTimelineEvents();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load timeline');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Add event
  const addEvent = useCallback(
    async (event: Omit<TimelineEvent, 'id'>) => {
      try {
        const newEvent: TimelineEvent = {
          ...event,
          id: generateId(),
        };

        await db.saveTimelineEvent(newEvent);
        setEvents((prev) => {
          const updated = [...prev, newEvent];
          updated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          return updated;
        });
        return newEvent;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to add event';
        setError(message);
        throw err;
      }
    },
    []
  );

  // Get events by type
  const getEventsByType = useCallback(
    (type: TimelineEvent['type']) => {
      return events.filter((e) => e.type === type);
    },
    [events]
  );

  // Get events by date range
  const getEventsByDateRange = useCallback(
    (startDate: Date, endDate: Date) => {
      return events.filter((e) => {
        const eventDate = new Date(e.date);
        return eventDate >= startDate && eventDate <= endDate;
      });
    },
    [events]
  );

  // Get recent events
  const getRecentEvents = useCallback(
    (limit: number = 10) => {
      return events.slice(0, limit);
    },
    [events]
  );

  return {
    events,
    loading,
    error,
    addEvent,
    getEventsByType,
    getEventsByDateRange,
    getRecentEvents,
  };
};
