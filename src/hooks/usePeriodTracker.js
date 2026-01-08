import { useState, useEffect } from 'react';
import { getStoredData, saveStoredData } from '../lib/storage';

const STORAGE_KEY = 'periodTrackerData';

export const usePeriodTracker = () => {
    const [data, setData] = useState({
        periods: [], // { start: 'DD-MM-YYYY', end: 'DD-MM-YYYY', days: N }
        notes: {},
        settings: {
            theme: 'dark',
            hue: 0,
            language: 'en',
            cycleHistory: [],
            waterReminder: false,
            exerciseReminder: false
        }
    });

    // Initial Load
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setData(JSON.parse(stored));
            }
        }
    }, []);

    // Save on Change
    useEffect(() => {
        if (typeof window !== 'undefined' && data) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    }, [data]);

    const addPeriod = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate || startDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        const newPeriod = { start: startDate, end: endDate || startDate, days: diffDays };

        // Append and Sort Descending (Newest first)
        const newPeriods = [...(data.periods || []), newPeriod].sort((a, b) => new Date(b.start) - new Date(a.start));

        setData(prev => ({
            ...prev,
            periods: newPeriods,
            // Also update cycle history for PCOS prediction
            settings: {
                ...prev.settings,
                cycleHistory: newPeriods.slice(0, 3).map(p => p.days)
            }
        }));
    };

    const addNote = (date, note) => {
        setData(prev => ({
            ...prev,
            notes: { ...prev.notes, [date]: note }
        }));
    };

    const toggleSetting = (key) => {
        setData(prev => ({
            ...prev,
            settings: { ...prev.settings, [key]: !prev.settings[key] }
        }));
    };

    const updateCycleHistory = (inputs) => {
        setData(prev => ({
            ...prev,
            settings: { ...prev.settings, cycleHistory: inputs }
        }));
    };

    const calculatePrediction = () => {
        if (!data.periods.length && !data.settings.cycleHistory.length) return null;

        let avgLength = 28;
        let isPCOS = false;

        // Use manual history if available
        // Use manual history if available and valid
        if (data.settings.cycleHistory.length === 3) {
            const history = data.settings.cycleHistory.map(Number);
            // Ensure values are positive numbers
            if (history.every(val => val > 0)) {
                const sum = history.reduce((a, b) => a + b, 0);
                avgLength = Math.round(sum / 3);

                // Check irregularity (simple varience check)
                const variance = Math.max(...history) - Math.min(...history);
                if (variance > 7 || avgLength > 35) isPCOS = true;
            }
        }

        // If manual history wasn't used (or was invalid), try auto-calculation
        if (avgLength === 28 && data.periods.length >= 2) {
            // Auto calculate average from periods
            const lengths = [];
            for (let i = 0; i < data.periods.length - 1; i++) {
                const current = new Date(data.periods[i].start);
                const prev = new Date(data.periods[i + 1].start);
                const diffTime = Math.abs(current - prev);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                lengths.push(diffDays);
            }
            const sum = lengths.reduce((a, b) => a + b, 0);
            avgLength = Math.round(sum / lengths.length) || 28;
        }

        // Calculate Average Period Length (Bleeding days)
        let avgPeriodLength = 5; // Default fallback
        if (data.periods.length > 0) {
            const totalDays = data.periods.reduce((acc, p) => acc + (p.days || 5), 0);
            avgPeriodLength = Math.round(totalDays / data.periods.length) || 5;
        }

        const lastPeriod = data.periods[0]; // Newest
        if (!lastPeriod) return null;

        const lastPeriodDate = new Date(lastPeriod.start);
        const nextDate = new Date(lastPeriod.start);
        nextDate.setDate(nextDate.getDate() + avgLength);

        // Next Period End Date
        const nextEndDate = new Date(nextDate);
        nextEndDate.setDate(nextEndDate.getDate() + (avgPeriodLength - 1));

        // --- NEW FEATURES: Ovulation, Phases, Fertility ---
        const today = new Date();
        const diffTime = Math.abs(today - lastPeriodDate);
        const currentCycleDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Days since start

        // Ovulation is typically 14 days before the next period
        const ovulationDate = new Date(nextDate);
        ovulationDate.setDate(ovulationDate.getDate() - 14);

        // Determine Phase & Fertility
        let currentPhase = 'Follicular';
        let fertility = 'Low';
        let explanation = 'Energy levels are rising. Good time for active exercises.';

        // Menstrual Phase (Days 1-5, approx)
        if (currentCycleDay <= 5) {
            currentPhase = 'Menstrual';
            fertility = 'Low';
            explanation = 'Shedding of the uterine lining. Rest and hydrate.';
        }
        // Follicular Phase (Days 6-13)
        else if (currentCycleDay < (avgLength - 14)) {
            currentPhase = 'Follicular';
            fertility = 'Medium';
            explanation = 'Estrogen rising. You might feel more energetic and creative.';
        }
        // Ovulation Phase (Day 14 +/- 2 days)
        else if (currentCycleDay >= (avgLength - 16) && currentCycleDay <= (avgLength - 12)) {
            currentPhase = 'Ovulation';
            fertility = 'High';
            explanation = 'Peak fertility. Ovary releases an egg. Hightened senses.';
        }
        // Luteal Phase (After Ovulation)
        else {
            currentPhase = 'Luteal';
            fertility = 'Low';
            explanation = 'Progesterone rises. You might feel PMS symptoms broadly.';
        }

        return {
            date: nextDate.toISOString(),
            nextEndDate: nextEndDate.toISOString(),
            avgLength,
            avgPeriodLength,
            isPCOS,
            ovulationDate: ovulationDate.toISOString(),
            currentPhase,
            fertility,
            currentCycleDay,
            explanation
        };
    };

    return {
        data,
        addPeriod,
        addNote,
        toggleSetting,
        updateCycleHistory,
        setData, // Expose for direct updates
        prediction: calculatePrediction()
    };
};
