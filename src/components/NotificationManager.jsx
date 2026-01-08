import { useState, useEffect } from 'react';

export default function NotificationManager({ settings, onToggle, t }) {
    const [permission, setPermission] = useState('default');
    const [times, setTimes] = useState({
        water: '09:00',
        exercise: '07:00'
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = () => {
        Notification.requestPermission().then((result) => {
            setPermission(result);
            if (result === 'granted') {
                new Notification('mahwari', { body: 'Notifications enabled!' });
            }
        });
    };

    const handleTimeChange = (type, val) => {
        setTimes(prev => ({ ...prev, [type]: val }));
    };

    return (
        <div className="notif-container">
            <h3>{t.notifications}</h3>

            {permission !== 'granted' && (
                <button onClick={requestPermission} className="perm-btn">
                    {t.enable_notif}
                </button>
            )}

            <div className="setting-row">
                <span>{t.water} Reminder</span>
                <div className="controls">
                    <input
                        type="time"
                        value={times.water}
                        onChange={(e) => handleTimeChange('water', e.target.value)}
                        disabled={!settings.waterReminder}
                    />
                    <input
                        type="checkbox"
                        checked={settings.waterReminder}
                        onChange={() => onToggle('waterReminder')}
                    />
                </div>
            </div>

            <div className="setting-row">
                <span>{t.exercise} Reminder</span>
                <div className="controls">
                    <input
                        type="time"
                        value={times.exercise}
                        onChange={(e) => handleTimeChange('exercise', e.target.value)}
                        disabled={!settings.exerciseReminder}
                    />
                    <input
                        type="checkbox"
                        checked={settings.exerciseReminder}
                        onChange={() => onToggle('exerciseReminder')}
                    />
                </div>
            </div>

            <style jsx>{`
        .notif-container { margin-top: 20px; }
        .perm-btn { width: 100%; padding: 10px; background: hsl(var(--hue), 100%, 50%); color: white; border-radius: 8px; margin-bottom: 15px; }
        .setting-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 10px; }
        .controls { display: flex; align-items: center; gap: 10px; }
        input[type="time"] { background: none; border: 1px solid var(--muted-text); color: var(--text-color); padding: 5px; border-radius: 5px; }
      `}</style>
        </div>
    );
}
