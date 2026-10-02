import { Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ChallengePage from './pages/ChallengePage';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [history, setHistory] = useState([]);

  const addToHistory = (event) => {
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    setHistory((prev) => [{ event, timestamp, id: Date.now() }, ...prev].slice(0, 20));
  };

  if (!hasStarted) {
    return <LandingPage onStart={() => setHasStarted(true)} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">🎲</div>
          <div>
            <p className="eyebrow">Chaos Lab</p>
            <h1>Chaos Button</h1>
          </div>
        </div>

        <nav className="main-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/challenge" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Challenge Deck
          </NavLink>
          <button
            type="button"
            className="nav-link history-toggle"
            onClick={() => {
              const panel = document.querySelector('.history-panel');
              panel?.classList.toggle('open');
            }}
          >
            History ({history.length})
          </button>
        </nav>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage onChaos={addToHistory} />} />
          <Route path="/challenge" element={<ChallengePage />} />
        </Routes>
      </main>

      <aside className="history-panel">
        <div className="history-header">
          <h3>Chaos Timeline</h3>
          <button type="button" className="close-btn" onClick={() => document.querySelector('.history-panel')?.classList.remove('open')}>
            ✕
          </button>
        </div>
        <div className="history-list">
          {history.length === 0 ? (
            <p className="empty-state">No chaos yet. Click the button!</p>
          ) : (
            history.map((item) => (
              <div key={item.id} className="history-item">
                <span className="time">{item.timestamp}</span>
                <span className="event">{item.event}</span>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}

export default App;
