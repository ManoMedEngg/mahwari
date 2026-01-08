export const STORAGE_KEY = 'prodo_data';

export const getStoredData = () => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {
        periods: [], // { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD' }
        notes: {},   // 'YYYY-MM-DD': 'Note content'
        settings: {
            cycleLength: 28,
            periodLength: 5,
            waterReminder: false,
            exerciseReminder: false,
            theme: 'dark',
            hue: 0, // Default Red
            language: 'en',
            cycleHistory: [],
            pin: null
        }
    };
};

export const saveStoredData = (data) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
