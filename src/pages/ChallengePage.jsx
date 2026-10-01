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

export default ChallengePage;
