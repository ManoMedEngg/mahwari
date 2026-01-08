'use client';

import { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import BottomNav from '../components/BottomNav';
import ExerciseGuide from '../components/ExerciseGuide';
import WaterTracker from '../components/WaterTracker';
import NotificationManager from '../components/NotificationManager';
import BloodTrail from '../components/BloodTrail';
import HuePicker from '../components/HuePicker';
import CycleBackground from '../components/CycleBackground';
import PeriodGradientChart from '../components/PeriodGradientChart'; // NEW
import PeriodTable from '../components/PeriodTable'; // NEW
import LoadingSequence from '../components/LoadingSequence'; // NEW
import SecurityPin from '../components/SecurityPin'; // NEW
import { formatDate } from '../lib/dateUtils';
import { usePeriodTracker } from '../hooks/usePeriodTracker';
import { translations } from '../lib/translations';

export default function Home() {
  const { data, addPeriod, addNote, toggleSetting, updateCycleHistory, prediction, setData } = usePeriodTracker();

  // States: 'loading' | 'auth' | 'app'
  const [appState, setAppState] = useState('loading');
  const [currentView, setCurrentView] = useState('home');
  const [cycleInputs, setCycleInputs] = useState(['', '', '']);
  const [showPCOSInput, setShowPCOSInput] = useState(false);
  const [pinMode, setPinMode] = useState('verify'); // 'create', 'verify', 'change'

  // Derived state for easy access
  const lang = data?.settings?.language || 'en';
  const t = translations[lang] || translations['en'];

  // Force dark theme on mount and hue change
  useEffect(() => {
    document.body.setAttribute('data-theme', 'dark');
    if (data?.settings?.hue !== undefined) {
      document.documentElement.style.setProperty('--hue', data.settings.hue);
    }
  }, [data?.settings?.hue]);

  // Initial loading and auth check
  useEffect(() => {
    if (data) { // Ensure data is loaded before proceeding
      setTimeout(() => {
        handleLoadingComplete();
      }, 800);
    }
  }, [data]); // Depend on data to ensure it's loaded

  const handleLoadingComplete = () => {
    // Check if PIN exists
    if (!data) return; // Wait for data load

    const sessionPinVerified = typeof window !== 'undefined' && sessionStorage.getItem('pin_verified');

    if (data.settings.pin) {
      if (sessionPinVerified === 'true') {
        setAppState('app');
      } else {
        setAppState('auth');
        setPinMode('verify');
      }
    } else {
      setAppState('auth');
      setPinMode('create');
    }
  };

  const handleAuthSuccess = (newPin) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pin_verified', 'true');
    }

    if (pinMode === 'create') {
      updateSetting('pin', newPin);
    } else if (pinMode === 'change') {
      updateSetting('pin', newPin);
    }
    setAppState('app');
  };

  const handleDateSelect = (startDate, endDate) => {
    // Calendar handles the confirmation UI
    addPeriod(startDate, endDate);
  };

  const updateSetting = (key, val) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: val }
    }));
  };

  if (appState === 'loading') return <LoadingSequence onComplete={handleLoadingComplete} />;

  if (appState === 'auth') {
    return (
      <SecurityPin
        mode={pinMode}
        initialPin={data?.settings?.pin}
        onSuccess={handleAuthSuccess}
        t={t}
      />
    );
  }

  return (
    <main className="container">
      <CycleBackground />
      <BloodTrail />

      {/* Header */}
      <div className="settings-icon-container">
        <button className="icon-btn" onClick={() => setCurrentView(currentView === 'settings' ? 'home' : 'settings')}>⚙️</button>
      </div>

      {currentView === 'home' && (
        <header className="app-header">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src="/icon-512x512.png" alt="Prodo" style={{ width: '50px', height: '50px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(255, 64, 129, 0.3)' }} />
              <h1>{t.app_name}</h1>
            </div>
            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{translations[lang]?.langName}</span>
          </div>
        </header>
      )}

      {/* VIEW: HOME */}
      {currentView === 'home' && (
        <div className="fade-in content-pad">
          <div className={`prediction-card glass ${prediction?.isPCOS ? 'pcos-mode' : ''}`}>
            <h2>{prediction ? formatDate(prediction.date) : t.track_more}</h2>
            <p>{t.next_period}</p>
            {prediction?.isPCOS && <span className="pcos-badge">{t.pcos_mode}</span>}

            {prediction && prediction.currentPhase && (
              <div style={{ marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>❤️ Phase: <b>{prediction.currentPhase}</b></span>
                  <span>👶 Fertility: <b>{prediction.fertility}</b></span>
                </div>
                <p style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.8, fontStyle: 'italic' }}>
                  "{prediction.explanation}"
                </p>
              </div>
            )}
          </div>

          {/* PERIOD ANALYTICS (Always visible) */}
          <div style={{ marginBottom: '20px' }}>
            <PeriodGradientChart periods={data.periods || []} t={t} />
            <PeriodTable periods={data.periods || []} t={t} />
          </div>

          <Calendar
            periodData={data}
            onDateSelect={handleDateSelect}
            prediction={prediction}
            onRefresh={() => {
              if (window.confirm(t?.confirm_refresh || 'Clear all data?')) {
                setData({
                  periods: [],
                  notes: {},
                  settings: { ...data.settings, cycleHistory: [], pin: null }
                });
                window.location.reload(); // Reload to reset PIN state if needed
              }
            }}
          />

          <button className="pcos-btn glass" onClick={() => setShowPCOSInput(!showPCOSInput)}>
            {showPCOSInput ? t.close_pcos : `⚙️ ${t.setup_pcos}`}
          </button>

          {showPCOSInput && (
            <div className="pcos-form glass">
              <p>{t.enter_cycles}</p>
              <div className="inputs">
                {cycleInputs.map((val, i) => (
                  <input key={i} type="number" value={val} placeholder="28" onChange={e => {
                    const newInputs = [...cycleInputs];
                    newInputs[i] = e.target.value;
                    setCycleInputs(newInputs);
                  }} />
                ))}
              </div>
              <button onClick={() => updateCycleHistory(cycleInputs)}>{t.calc_avg}</button>
            </div>
          )}
        </div>
      )}

      {/* VIEW: EXERCISE */}
      {currentView === 'exercise' && <div className="content-pad"><ExerciseGuide t={t} /></div>}

      {/* VIEW: WATER */}
      {currentView === 'water' && (
        <div className="content-pad">
          <WaterTracker t={t} />
        </div>
      )}

      {/* VIEW: SETTINGS */}
      {currentView === 'settings' && (
        <div className="content-pad fade-in">
          <h2>{t.settings}</h2>
          <div className="glass settings-box">
            {/* Language */}
            <div className="row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
              <span>{t.select_lang}</span>
              <select
                value={lang}
                onChange={(e) => updateSetting('language', e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'var(--bg-color)', color: 'var(--text-color)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              >
                {Object.keys(translations).map(k => (
                  <option key={k} value={k}>{translations[k]?.langName}</option>
                ))}
              </select>
            </div>

            {/* Hue */}
            <div className="row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
              <span>{t.hue_theme}</span>
              <HuePicker hue={data.settings.hue} onChange={(val) => updateSetting('hue', val)} />
            </div>

            {/* PIN Change */}
            <div className="row" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
              <span>Security PIN</span>
              <button className="btn-small" onClick={() => {
                setAppState('auth');
                setPinMode('change');
              }}>Change PIN</button>
            </div>
          </div>

          <NotificationManager settings={data.settings} onToggle={toggleSetting} t={t} />
        </div>
      )}

      <BottomNav currentView={currentView} setView={setCurrentView} t={t} />

      <style jsx global>{`
        /* Global override for dynamic hue */
        :root { --hue: ${data.settings.hue}; }
        .content-pad { padding-bottom: 100px; animation: fadeIn 0.3s ease; }
        .input { width: 100%; padding: 10px; }
        .splash { height: 100vh; display: flex; justify-content: center; align-items: center; background: black; color: hsl(var(--hue), 100%, 50%); font-size: 3rem; }
        .glow { text-shadow: 0 0 20px hsl(var(--hue), 100%, 50%); }
        .app-header { text-align: center; margin-bottom: 20px; }
        .app-header h1 { color: hsl(var(--hue), 100%, 50%); font-size: 2.5rem; }
        
        .settings-icon-container { position: absolute; top: 20px; right: 20px; z-index: 100; }
        .icon-btn { font-size: 1.5rem; background: transparent; }

        .pcos-mode { border-color: hsl(var(--hue), 100%, 50%); }
        .pcos-btn { margin-top: 10px; width: 100%; padding: 15px; text-align: left; color: white !important; }
        .pcos-form button { background: hsl(var(--hue), 100%, 50%); width: 100%; border-radius: 8px; padding: 10px; color: white; margin-top: 10px; font-weight: bold; }
        .settings-box { padding: 15px; border-radius: 15px; margin-bottom: 20px; }
        .row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .back-btn { width: 100%; padding: 15px; border-radius: 10px; margin-top: 10px; }
        .btn-small { background: rgba(255,255,255,0.1); padding: 5px 10px; border-radius: 5px; font-size: 0.8rem; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </main>
  );
}
