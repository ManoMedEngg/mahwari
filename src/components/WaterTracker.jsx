import { useState } from 'react';

export default function WaterTracker({ t }) {
    // Map t values to schedule
    const schedule = [
        { time: t.morning, amount: '400-500 ml', benefit: 'Detox' },
        { time: t.pre_break, amount: '250 ml', benefit: 'Digestion' },
        { time: t.pre_lunch, amount: '250 ml', benefit: 'Control Hunger' },
        { time: t.evening, amount: '250-500 ml', benefit: 'Energy' },
        { time: t.pre_dinner, amount: '250 ml', benefit: 'Digestion' },
        { time: t.pre_sleep, amount: '200 ml', benefit: 'Hydration' },
    ];

    const [checked, setChecked] = useState({});

    const toggleCheck = (index) => {
        setChecked(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const progress = Math.round((Object.values(checked).filter(Boolean).length / schedule.length) * 100);

    return (
        <div className="water-container fade-in">
            <h2 style={{ color: '#2196F3', marginBottom: '20px' }}>{t.water_sched} 💧</h2>

            <div className="progress-bar-container glass">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <span className="progress-text">{progress}% {t.goal_reached}</span>
            </div>

            <div className="schedule-list">
                {schedule.map((item, idx) => (
                    <div key={idx} className={`schedule-item glass ${checked[idx] ? 'completed' : ''}`} onClick={() => toggleCheck(idx)}>
                        <div className={`checkbox ${checked[idx] ? 'checked' : ''}`}>
                            {checked[idx] && '✓'}
                        </div>
                        <div className="schedule-info">
                            <div className="schedule-header">
                                <span className="time">{item.time}</span>
                                <span className="amount">{item.amount}</span>
                            </div>
                            <p className="benefit">{item.benefit}</p>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .water-container { padding-bottom: 80px; }
        .progress-bar-container { height: 25px; background: rgba(255,255,255,0.1); border-radius: 12px; position: relative; overflow: hidden; margin-bottom: 25px; }
        .progress-bar { height: 100%; background: #2196F3; transition: width 0.5s ease; }
        .progress-text { position: absolute; top: 0; width: 100%; text-align: center; font-size: 0.8rem; line-height: 25px; font-weight: bold; text-shadow: 0 1px 2px black; }
        
        .schedule-list { display: flex; flex-direction: column; gap: 15px; }
        .schedule-item { display: flex; align-items: start; gap: 15px; padding: 15px; border-radius: 12px; cursor: pointer; transition: 0.2s; border: 1px solid transparent; }
        .schedule-item.completed { border-color: #2196F3; background: rgba(33, 150, 243, 0.1); }
        
        .checkbox { width: 24px; height: 24px; border: 2px solid var(--muted-text); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: 0.2s; }
        .checkbox.checked { background: #2196F3; border-color: #2196F3; color: white; font-size: 0.8rem; }
        
        .schedule-header { display: flex; justify-content: space-between; margin-bottom: 5px; font-weight: 600; font-size: 0.9rem; }
        .amount { color: #64B5F6; }
        .benefit { font-size: 0.8rem; color: var(--muted-text); line-height: 1.3; }
        .fade-in { animation: fadeIn 0.5s ease; }
      `}</style>
        </div>
    );
}
