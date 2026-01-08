export default function BottomNav({ currentView, setView, t }) {
  const navItems = [
    { id: 'home', label: t.home, icon: '🏠' },
    { id: 'exercise', label: t.exercise, icon: '🧘‍♀️' },
    { id: 'water', label: t.water, icon: '💧' },
  ];

  return (
    <nav className="bottom-nav glass">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-item ${currentView === item.id ? 'active' : ''}`}
          onClick={() => setView(item.id)}
        >
          <span className="icon">{item.icon}</span>
          <span className="label">{item.label}</span>
        </button>
      ))}
      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-around;
          padding: 15px 10px;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(15px);
          z-index: 100;
          border-top: 1px solid var(--border-color);
        }
        .nav-item {
          background: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--muted-text);
          transition: 0.3s;
        }
        .nav-item.active {
          color: hsl(var(--hue), 100%, 50%);
          transform: translateY(-5px);
        }
        .icon {
          font-size: 1.5rem;
          margin-bottom: 4px;
        }
        .label {
          font-size: 0.75rem;
          font-weight: 600;
        }
      `}</style>
    </nav>
  );
}
