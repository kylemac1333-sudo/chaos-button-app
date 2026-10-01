import { useEffect, useRef, useState } from 'react';

const THEMES = ['theme-ocean', 'theme-sunset', 'theme-forest', 'theme-midnight', 'theme-candy'];

const JOKES = [
  'Why did the developer go broke? Because they lost their cache!',
  'A programmer walks into a bar. The bartender says, “We need to talk about your variables.”',
  'I would tell you a UDP joke, but you might not get it.',
  'A SQL query walks into a bar and says, “Can I join you?”',
  'There are 10 kinds of people in the world: those who understand binary and those who don’t.',
  'The best part of debugging is pretending to know what is going on.',
  'Why do Java developers wear glasses? Because they don’t C#!',
  'I tried to write a bot that tells jokes, but it keeps returning undefined.',
];

const CHALLENGES = [
  'Do 5 jumping jacks.',
  'Stretch your arms overhead for 10 seconds.',
  'Tell someone a terrible pun.',
  'Dance for 15 seconds like no one is watching.',
  'Drink a glass of water.',
  'Say “chaos is my middle name” out loud.',
  'Take a 30-second walk around the room.',
  'Close your eyes and breathe for 10 slow counts.',
  'Make the weirdest face you can.',
];

const EMOJIS = ['✨', '🎉', '🌟', '💥', '🚀', '🎊', '🎈', '🔥', '🌈', '🤖'];
const OBJECTS = ['🌙', '☄️', '🎁', '🪐', '💎', '🎯', '👑', '🌍'];

function HomePage() {
  const [clickCount, setClickCount] = useState(0);
  const [theme, setTheme] = useState('theme-ocean');
  const [statusText, setStatusText] = useState('Ready for some beautiful chaos?');
  const [challengeText, setChallengeText] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [emotion, setEmotion] = useState('');
  const [fleeing, setFleeing] = useState(false);
  const [shake, setShake] = useState(false);
  const [secretBurst, setSecretBurst] = useState(false);
  const [emojis, setEmojis] = useState([]);
  const [objects, setObjects] = useState([]);
  const [rainbowMode, setRainbowMode] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!fleeing) return;

    const handlePointerMove = (event) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);

      if (distance < 180) {
        const angle = Math.atan2(centerY - event.clientY, centerX - event.clientX);
        const offsetX = Math.cos(angle) * 220;
        const offsetY = Math.sin(angle) * 180;

        const nextLeft = Math.min(Math.max(32, window.innerWidth - rect.width - 32), centerX + offsetX - rect.width / 2);
        const nextTop = Math.min(Math.max(24, window.innerHeight - rect.height - 32), centerY + offsetY - rect.height / 2);

        button.style.left = `${nextLeft}px`;
        button.style.top = `${nextTop}px`;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [fleeing]);

  useEffect(() => {
    if (!shake) return;
    const timer = window.setTimeout(() => setShake(false), 450);
    return () => window.clearTimeout(timer);
  }, [shake]);

  const playTone = (tone = 'chaos') => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const audioCtx = new AudioCtx();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    const frequencies = {
      chaos: [260, 420, 620],
      success: [390, 520, 680],
      alert: [220, 180, 140],
      secret: [440, 660, 880],
    };

    const chosen = frequencies[tone] || frequencies.chaos;
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(chosen[0], audioCtx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(chosen[1], audioCtx.currentTime + 0.08);
    oscillator.frequency.linearRampToValueAtTime(chosen[2], audioCtx.currentTime + 0.22);

    gainNode.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.35);

    setTimeout(() => audioCtx.close(), 500);
  };

  const showNotification = (text) => {
    setStatusText(text);
    const timer = window.setTimeout(() => {
      setStatusText('Ready for some beautiful chaos?');
    }, 1800);
    return () => window.clearTimeout(timer);
  };

  const triggerEvent = (eventName) => {
    const eventMap = {
      theme: () => {
        const nextTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
        setTheme(nextTheme);
        setEmotion('Theme shift!');
        playTone('chaos');
      },
      animation: () => {
        setEmotion('Wave motion!');
        setShake(true);
        playTone('alert');
      },
      emoji: () => {
        const nextEmojis = Array.from({ length: 6 }, (_, index) => ({
          id: `${Date.now()}-${index}`,
          symbol: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 75 + 10}%`,
        }));
        setEmojis(nextEmojis);
        setTimeout(() => setEmojis([]), 1300);
        playTone('success');
      },
      joke: () => {
        const randomJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
        setStatusText(randomJoke);
        playTone('chaos');
      },
      countdown: () => {
        const values = ['5', '4', '3', '2', '1'];
        values.forEach((value, index) => {
          setTimeout(() => setCountdown(value), index * 700);
        });
        setTimeout(() => setCountdown(null), 4200);
        playTone('alert');
      },
      flee: () => {
        setFleeing(true);
        setStatusText('The button is running away!');
        setTimeout(() => {
          setFleeing(false);
          if (buttonRef.current) {
            buttonRef.current.style.left = 'auto';
            buttonRef.current.style.top = 'auto';
          }
        }, 3000);
        playTone('alert');
      },
      shake: () => {
        setShake(true);
        setEmotion('Screen shake!');
        playTone('alert');
      },
      challenge: () => {
        const randomChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
        setChallengeText(randomChallenge);
        setStatusText(`Challenge unlocked: ${randomChallenge}`);
        playTone('success');
      },
      object: () => {
        const nextObjects = Array.from({ length: 4 }, (_, index) => ({
          id: `${Date.now()}-${index}`,
          symbol: OBJECTS[Math.floor(Math.random() * OBJECTS.length)],
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 60 + 20}%`,
        }));
        setObjects(nextObjects);
        setTimeout(() => setObjects([]), 1800);
        playTone('chaos');
      },
      colorShift: () => {
        setEmotion('Double rainbow energy!');
        setRainbowMode(true);
        setTimeout(() => setRainbowMode(false), 1000);
        playTone('success');
      },
      secret: () => {
        setSecretBurst(true);
        setStatusText('✨ JACKPOT CHAOS! ✨');
        setEmotion('Secret event activated!');
        setTimeout(() => setSecretBurst(false), 1400);
        playTone('secret');
      },
    };

    eventMap[eventName]?.();
  };

  const handleChaosClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    const secretRoll = Math.random() < 0.08;
    const eventNames = [
      'theme',
      'animation',
      'emoji',
      'joke',
      'countdown',
      'flee',
      'shake',
      'challenge',
      'object',
      'colorShift',
    ];

    const randomEvent = eventNames[Math.floor(Math.random() * eventNames.length)];
    triggerEvent(secretRoll ? 'secret' : randomEvent);
  };

  const handleReset = () => {
    setClickCount(0);
    setTheme('theme-ocean');
    setStatusText('Chaos reset. Ready for round two?');
    setChallengeText('');
    setCountdown(null);
    setEmotion('');
    setFleeing(false);
    setShake(false);
    setRainbowMode(false);
    setSecretBurst(false);
    setEmojis([]);
    setObjects([]);
    if (buttonRef.current) {
      buttonRef.current.style.left = 'auto';
      buttonRef.current.style.top = 'auto';
    }
    playTone('success');
  };

  return (
    <div className={`home-page ${theme} ${shake ? 'shake' : ''} ${rainbowMode ? 'rainbow' : ''}`}>
      <div className="hero-panel">
        <p className="eyebrow">Randomizer</p>
        <h2>Make the day less boring.</h2>
        <p className="hero-copy">Press the button and let the universe choose a silly little disaster for you.</p>

        <div className="stats-row">
          <div className="stat-card">
            <span>Clicks</span>
            <strong>{clickCount}</strong>
          </div>
          <div className="stat-card">
            <span>Streak</span>
            <strong>{Math.max(1, Math.floor(clickCount / 5) + 1)}x</strong>
          </div>
        </div>

        <div className="chaos-controls">
          <button
            ref={buttonRef}
            type="button"
            className={`chaos-button ${fleeing ? 'fleeing' : ''}`}
            onClick={handleChaosClick}
          >
            DO SOMETHING RANDOM
          </button>

          <button type="button" className="secondary-button" onClick={handleReset}>
            Reset Chaos
          </button>
        </div>

        <div className="message-panel">
          <p>{statusText}</p>
          {emotion && <small>{emotion}</small>}
          {challengeText && <strong>{challengeText}</strong>}
        </div>
      </div>

      {countdown && <div className="countdown-burst">{countdown}</div>}

      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="float-emoji"
          style={{ left: emoji.left, top: emoji.top }}
        >
          {emoji.symbol}
        </div>
      ))}

      {objects.map((item) => (
        <div
          key={item.id}
          className="orbit-object"
          style={{ left: item.left, top: item.top }}
        >
          {item.symbol}
        </div>
      ))}

      {secretBurst && (
        <>
          <div className="secret-flash" />
          <div className="secret-message">JACKPOT</div>
        </>
      )}
    </div>
  );
}

function ChallengePage() {
  const challengeList = [
    'Say a ridiculous compliment to a stranger.',
    'Make the best fake announcement voice you can.',
    'Take three deep breaths while staring at the ceiling.',
    'Find a tiny object and turn it into a trophy.',
    'Close your eyes and count to 20 in a dramatic voice.',
    'Create a two-word mission statement for your day.',
    'Do a tiny victory dance before lunch.',
    'Change your background color for the next 10 minutes.',
  ];

  return (
    <div className="challenge-page">
      <div className="card glass-card">
        <p className="eyebrow">Daily challenge deck</p>
        <h2>Pick your chaos-level challenge</h2>

        <div className="challenge-list">
          {challengeList.map((item, index) => (
            <div key={item} className="challenge-item">
              <span>{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
export { ChallengePage };
