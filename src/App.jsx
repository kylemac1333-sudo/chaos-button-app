import { useEffect, useState } from 'react';

function LandingPage({ onStart }) {
  const [ready, setReady] = useState(false);
  const [stars, setStars] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const starArray = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
    setStars(starArray);
    setReady(true);
    playIntroSound();
  }, []);

  const playIntroSound = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const audioCtx = new AudioCtx();
    const notes = [440, 550, 660, 550, 440];
    let delay = 0;

    notes.forEach((freq) => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime + delay);
      gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + delay + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + 0.25);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start(audioCtx.currentTime + delay);
      oscillator.stop(audioCtx.currentTime + delay + 0.25);
      delay += 0.18;
    });

    setTimeout(() => audioCtx.close(), 1500);
  };

  const playStartSound = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const audioCtx = new AudioCtx();
    const oscillator1 = audioCtx.createOscillator();
    const oscillator2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator1.type = 'sine';
    oscillator2.type = 'triangle';
    oscillator1.frequency.setValueAtTime(320, audioCtx.currentTime);
    oscillator2.frequency.setValueAtTime(480, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator1.start();
    oscillator2.start();
    oscillator1.stop(audioCtx.currentTime + 0.6);
    oscillator2.stop(audioCtx.currentTime + 0.6);

    setTimeout(() => audioCtx.close(), 800);
  };

  const handleStartClick = () => {
    if (clicked) return;
    setClicked(true);
    playStartSound();
    setTimeout(() => onStart(), 600);
  };

  return (
    <div className="landing-wrapper">
      <div className="landing-bg">
        {stars.map((star) => (
          <div
            key={star.id}
            className="landing-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <div className={`landing-content ${clicked ? 'launching' : ''} ${ready ? 'ready' : ''}`}>
        <div className="landing-logo-container">
          <div className="landing-logo">🎲</div>
          <div className="logo-ring" />
          <div className="logo-ring" style={{ animationDelay: '0.2s' }} />
          <div className="logo-ring" style={{ animationDelay: '0.4s' }} />
        </div>

        <h1 className="landing-title">Chaos Button</h1>
        <p className="landing-subtitle">Randomize your reality</p>

        <div className="landing-features">
          <div className="feature-item"><span>✨</span><p>12 Chaos Events</p></div>
          <div className="feature-item"><span>🎵</span><p>Sound Effects</p></div>
          <div className="feature-item"><span>📱</span><p>Mobile Ready</p></div>
          <div className="feature-item"><span>🎯</span><p>Challenges</p></div>
        </div>

        <button type="button" className={`landing-btn ${clicked ? 'clicked' : ''}`} onClick={handleStartClick} disabled={clicked}>
          <span className="btn-text">Enter Chaos</span>
          <span className="btn-icon">→</span>
        </button>

        <p className="landing-footer">Warning: May cause uncontrollable fun</p>
      </div>

      {clicked && (
        <>
          <div className="launch-particles">
            {Array.from({ length: 50 }).map((_, i) => {
              const angle = (i / 50) * Math.PI * 2;
              const distance = Math.random() * 400 + 100;
              return (
                <div
                  key={i}
                  className="launch-particle"
                  style={{
                    '--tx': `${Math.cos(angle) * distance}px`,
                    '--ty': `${Math.sin(angle) * distance}px`,
                    '--delay': `${Math.random() * 0.2}s`,
                  }}
                />
              );
            })}
          </div>
          <div className="launch-flash" />
        </>
      )}
    </div>
  );
}

export default LandingPage;
