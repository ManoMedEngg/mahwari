import { useState } from 'react';
import { formatDate, toISO } from '../lib/dateUtils';

export default function Calendar({ periodData, onDateSelect, prediction, onRefresh }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null); // The date currently clicked (dd/mm/yyyy context)

    // Staging selection before confirming
    const [draftStart, setDraftStart] = useState(null);
    const [draftEnd, setDraftEnd] = useState(null);

    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const handleDayClick = (day) => {
        const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(dateObj); // Open controls for this date
    };

    const handleSetStart = () => {
        if (!selectedDate) return;
        const iso = toISO(selectedDate);
        setDraftStart(iso);
        setDraftEnd(null); // Reset end if start changes
        setSelectedDate(null); // Close controls
    };

    const handleSetEnd = () => {
        if (!selectedDate || !draftStart) {
            alert("Please set a Start Date first!");
            return;
        }
        const iso = toISO(selectedDate);

        if (new Date(iso) < new Date(draftStart)) {
            alert("End Date must be after Start Date");
            return;
        }

        setDraftEnd(iso);
        setSelectedDate(null); // Close controls

        // Trigger parent directly? Or wait for a "Confirm" button?
        // User request: "ask for periods starting or ending button... after selection... highlight"
        // implies we visualize it first. But generally "Set End" completes the range.

        // Let's trigger confirm logic immediately upon setting End, as typical flow.
        const confirm = window.confirm(`Log Period: ${formatDate(draftStart)} to ${formatDate(iso)}?`);
        if (confirm) {
            onDateSelect(draftStart, iso);
            setDraftStart(null);
            setDraftEnd(null);
        }
    };

    // Helper to check status of a day
    const getDayStatus = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const target = new Date(dateStr);

        // 1. Check Draft Selection
        if (draftStart && dateStr === draftStart) return 'period-start';
        if (draftEnd && dateStr === draftEnd) return 'period-end';
        if (draftStart && draftEnd && target > new Date(draftStart) && target < new Date(draftEnd)) return 'period-mid';

        // 2. Check History
        const inHistory = (periodData.periods || []).find(p => {
            const start = new Date(p.start);
            const end = new Date(p.end || p.start);
            return target >= start && target <= end;
        });

        if (inHistory) {
            if (dateStr === inHistory.start) return 'period-start';
            if (dateStr === inHistory.end) return 'period-end';
            return 'period-mid';
        }

        if (prediction && prediction.date && prediction.nextEndDate) {
            const predStart = prediction.date.split('T')[0];
            const predEnd = prediction.nextEndDate.split('T')[0];

            if (dateStr === predStart) return 'prediction-circle';
            // if (dateStr >= predStart && dateStr <= predEnd) return 'prediction-range'; // Keeping range faint/removed as requested
        } else if (prediction && prediction.date && prediction.date.split('T')[0] === dateStr) {
            return 'prediction-circle';
        }

        return null;
    };

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty-day"></div>);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const status = getDayStatus(i);
            const isSelected = selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === currentDate.getMonth();

            days.push(
                <div
                    key={i}
                    className={`day ${status || ''} ${isSelected ? 'selected-ring' : ''}`}
                    onClick={() => handleDayClick(i)}
                >
                    {i}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="calendar-container glass">
            <div className="header">
                <button onClick={prevMonth}>&lt;</button>
                <h3>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h3>
                <button onClick={nextMonth}>&gt;</button>
            </div>

            <div className="grid">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={`${d}-${i}`} className="day-name">{d}</div>)}
                {renderDays()}
            </div>

            {/* Control Panel */}
            {selectedDate && (
                <div className="controls fade-in">
                    <p className="selected-label">{formatDate(selectedDate)}</p>
                    <div className="btn-group">
                        <button className="btn-start" onClick={handleSetStart}>Set Start</button>
                        <button className="btn-end" onClick={handleSetEnd}>Set End</button>
                    </div>
                </div>
            )}

            {!selectedDate && draftStart && !draftEnd && (
                <div className="hint fade-in">
                    Started: <span style={{ color: '#2196F3' }}>{formatDate(draftStart)}</span><br />
                    Select End Date...
                </div>
            )}

            {onRefresh && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button className="btn-refresh" onClick={onRefresh}>Refresh Dataset</button>
                </div>
            )}

            <style jsx>{`
        .calendar-container { padding: 20px; border-radius: 20px; margin-bottom: 20px; position: relative; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center; }
        .day, .empty-day { width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 0.9rem; margin: 0 auto; cursor: pointer; transition: 0.2s; }
        .day:active { transform: scale(0.9); }
        .day-name { font-weight: bold; color: var(--muted-text); margin-bottom: 5px; font-size: 0.8rem; }
        
        /* Indicators - Using Theme Hue */
        .period-start { 
            background: hsl(var(--hue), 100%, 30%); /* Darker Shade */
            color: white; 
            box-shadow: 0 0 8px hsl(var(--hue), 100%, 30%, 0.5); 
        }
        .period-mid { 
            background: hsl(var(--hue), 100%, 50%); /* Normal Shade */
            color: white; 
        }
        .period-end { 
            background: hsl(var(--hue), 100%, 70%); /* Lighter Shade */
            color: white; 
        }
        
        .selected-ring { border: 2px solid white; box-shadow: 0 0 0 2px rgba(255,255,255,0.2); }

        /* Controls */
        .controls { margin-top: 15px; background: rgba(0,0,0,0.4); padding: 15px; border-radius: 12px; text-align: center; }
        .selected-label { font-size: 1.2rem; font-weight: bold; margin-bottom: 10px; color: white; }
        .btn-group { display: flex; gap: 10px; justify-content: center; }
        .btn-start { background: hsl(var(--hue), 100%, 30%); color: white; padding: 8px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; }
        .btn-end { background: hsl(var(--hue), 100%, 70%); color: white; padding: 8px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; }
        
        .hint { margin-top: 15px; text-align: center; font-size: 0.9rem; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; }
        .btn-refresh { background: transparent; border: 1px solid var(--muted-text); color: var(--muted-text); padding: 5px 15px; border-radius: 15px; font-size: 0.8rem; cursor: pointer; transition: 0.2s; }
        .btn-refresh:hover { border-color: #ff5252; color: #ff5252; }

        /* Prediction: Just a Circle */
        .prediction-circle { 
            background: transparent;
            border: 2px solid white; 
            color: white;
            box-shadow: 0 0 5px rgba(255,255,255,0.3);
        }
        
        /* Optional: Keep range faint if desired, or remove based on "just a circle" */
        .prediction-range { 
            background: rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.7);
            border: 1px dashed rgba(255, 255, 255, 0.2);
        }

        .fade-in { animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
        </div>
    );
}
