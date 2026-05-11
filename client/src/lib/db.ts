// IndexedDB and localStorage utilities for offline-first data persistence

export interface PregnancyData {
  id: string;
  lastMenstrualPeriod: Date;
  dueDate: Date;
  currentWeek: number;
  appointments: PregnancyAppointment[];
  measurements: PregnancyMeasurement[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PregnancyAppointment {
  id: string;
  date: Date;
  type: string;
  notes: string;
  completed: boolean;
}

export interface PregnancyMeasurement {
  id: string;
  date: Date;
  weight?: number;
  bloodPressure?: string;
  notes?: string;
}

export interface ChildData {
  id: string;
  name: string;
  dateOfBirth: Date;
  gender: 'male' | 'female';
  vaccinations: VaccinationRecord[];
  nutritionLogs: NutritionLog[];
  createdAt: Date;
  updatedAt: Date;
}

export interface VaccinationRecord {
  id: string;
  vaccine: string;
  scheduledDate: Date;
  completedDate?: Date;
  location?: string;
  notes?: string;
  status: 'completed' | 'upcoming' | 'overdue';
}

export interface NutritionLog {
  id: string;
  date: Date;
  meals: Meal[];
  waterIntake: number;
  notes?: string;
}

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  description: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface TimelineEvent {
  id: string;
  type: 'pregnancy' | 'vaccination' | 'nutrition' | 'appointment' | 'milestone';
  date: Date;
  title: string;
  description: string;
  relatedId?: string;
}

// IndexedDB Database Manager
class DatabaseManager {
  private dbName = 'FirstLightDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('pregnancies')) {
          db.createObjectStore('pregnancies', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('children')) {
          db.createObjectStore('children', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('timeline')) {
          db.createObjectStore('timeline', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };
    });
  }

  async savePregnancy(data: PregnancyData): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['pregnancies'], 'readwrite');
      const store = transaction.objectStore('pregnancies');
      const request = store.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getPregnancy(id: string): Promise<PregnancyData | null> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['pregnancies'], 'readonly');
      const store = transaction.objectStore('pregnancies');
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAllPregnancies(): Promise<PregnancyData[]> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['pregnancies'], 'readonly');
      const store = transaction.objectStore('pregnancies');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async saveChild(data: ChildData): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['children'], 'readwrite');
      const store = transaction.objectStore('children');
      const request = store.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getChild(id: string): Promise<ChildData | null> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['children'], 'readonly');
      const store = transaction.objectStore('children');
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAllChildren(): Promise<ChildData[]> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['children'], 'readonly');
      const store = transaction.objectStore('children');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async deleteChild(id: string): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['children'], 'readwrite');
      const store = transaction.objectStore('children');
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async saveTimelineEvent(event: TimelineEvent): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['timeline'], 'readwrite');
      const store = transaction.objectStore('timeline');
      const request = store.put(event);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getTimelineEvents(): Promise<TimelineEvent[]> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['timeline'], 'readonly');
      const store = transaction.objectStore('timeline');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const events = request.result || [];
        // Sort by date descending
        events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        resolve(events);
      };
    });
  }

  async clearAllData(): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        ['pregnancies', 'children', 'timeline', 'settings'],
        'readwrite'
      );

      const stores = ['pregnancies', 'children', 'timeline'];
      let completed = 0;

      stores.forEach((storeName) => {
        const store = transaction.objectStore(storeName);
        const request = store.clear();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          completed++;
          if (completed === stores.length) resolve();
        };
      });
    });
  }

  async exportData(): Promise<{
    pregnancies: PregnancyData[];
    children: ChildData[];
    timeline: TimelineEvent[];
  }> {
    const pregnancies = await this.getAllPregnancies();
    const children = await this.getAllChildren();
    const timeline = await this.getTimelineEvents();

    return { pregnancies, children, timeline };
  }

  async importData(data: {
    pregnancies?: PregnancyData[];
    children?: ChildData[];
    timeline?: TimelineEvent[];
  }): Promise<void> {
    if (data.pregnancies) {
      for (const pregnancy of data.pregnancies) {
        await this.savePregnancy(pregnancy);
      }
    }

    if (data.children) {
      for (const child of data.children) {
        await this.saveChild(child);
      }
    }

    if (data.timeline) {
      for (const event of data.timeline) {
        await this.saveTimelineEvent(event);
      }
    }
  }
}

// LocalStorage utilities
export const LocalStorage = {
  setLanguage: (lang: string) => localStorage.setItem('language', lang),
  getLanguage: (): string => localStorage.getItem('language') || 'en',

  setTheme: (theme: string) => localStorage.setItem('theme', theme),
  getTheme: (): string => localStorage.getItem('theme') || 'light',

  setNotificationsEnabled: (enabled: boolean) =>
    localStorage.setItem('notificationsEnabled', String(enabled)),
  getNotificationsEnabled: (): boolean =>
    localStorage.getItem('notificationsEnabled') !== 'false',

  setSoundEnabled: (enabled: boolean) =>
    localStorage.setItem('soundEnabled', String(enabled)),
  getSoundEnabled: (): boolean => localStorage.getItem('soundEnabled') !== 'false',

  setVibrationEnabled: (enabled: boolean) =>
    localStorage.setItem('vibrationEnabled', String(enabled)),
  getVibrationEnabled: (): boolean =>
    localStorage.getItem('vibrationEnabled') !== 'false',

  setLastSyncTime: (time: Date) =>
    localStorage.setItem('lastSyncTime', time.toISOString()),
  getLastSyncTime: (): Date | null => {
    const time = localStorage.getItem('lastSyncTime');
    return time ? new Date(time) : null;
  },

  setOfflineMode: (enabled: boolean) =>
    localStorage.setItem('offlineMode', String(enabled)),
  getOfflineMode: (): boolean => localStorage.getItem('offlineMode') === 'true',

  clear: () => localStorage.clear(),
};

// Export singleton instance
export const db = new DatabaseManager();
