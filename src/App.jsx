import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChallengePage from './pages/ChallengePage';

function App() {
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
        </nav>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/challenge" element={<ChallengePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
