import { Award, Leaf, ShieldCheck, Trees, Sun, Wind } from 'lucide-react';

export default function Guide({
  points = 0,
  activeChallenges = [],
  completedChallenges = [],
  onJoinChallenge,
  onCompleteChallenge,
  onBuyOffset
}) {
  const challenges = [
    { id: 'c1', title: 'Meatless Day', points: 100, reduction: 2.5, desc: 'Avoid red meat consumption for an entire day.', difficulty: 'Easy', icon: '🥗' },
    { id: 'c2', title: 'Pedal Power Commute', points: 150, reduction: 6.0, desc: 'Bike or walk to work/study instead of using a combustion car.', difficulty: 'Medium', icon: '🚲' },
    { id: 'c3', title: 'Unplug Standby Devices', points: 80, reduction: 1.5, desc: 'Disconnect appliances and vampire power draws overnight.', difficulty: 'Easy', icon: '🔌' },
    { id: 'c4', title: 'Cold Water Wash', points: 90, reduction: 1.8, desc: 'Wash all laundry loads using cold water settings.', difficulty: 'Easy', icon: '💧' },
    { id: 'c5', title: 'Public Transit Week', points: 400, reduction: 25.0, desc: 'Commute entirely using buses or subway systems for 5 days.', difficulty: 'Hard', icon: '🚇' },
    { id: 'c6', title: 'Zero Waste Shopping', points: 200, reduction: 8.0, desc: 'Shop groceries using only zero-packaging / reusable bags.', difficulty: 'Medium', icon: '🛍️' }
  ];

  const offsetProjects = [
    { id: 'p1', title: 'Amazon Reforestation', cost: 300, offset: 30, desc: 'Planting native trees to restore degraded rainforest land.', icon: <Trees size={24} style={{ color: 'var(--emerald)' }} aria-hidden="true" /> },
    { id: 'p2', title: 'Sahara Solar Initiative', cost: 500, offset: 60, desc: 'Installing grid-connected solar power arrays to replace coal.', icon: <Sun size={24} style={{ color: 'var(--accent-orange)' }} aria-hidden="true" /> },
    { id: 'p3', title: 'Patagonia Wind Farms', cost: 800, offset: 110, desc: 'Generating clean electricity in high-wind southern regions.', icon: <Wind size={24} style={{ color: 'var(--teal)' }} aria-hidden="true" /> }
  ];

  const badges = [
    { id: 'b1', name: 'Veggie Voyage', desc: 'Complete 1 Meatless Day', unlocked: completedChallenges.includes('c1'), icon: '🥗' },
    { id: 'b2', name: 'Pedal Pioneer', desc: 'Complete Pedal Power', unlocked: completedChallenges.includes('c2'), icon: '🚲' },
    { id: 'b3', name: 'Grid Guardian', desc: 'Unplug Standby Devices', unlocked: completedChallenges.includes('c3'), icon: '⚡' },
    { id: 'b4', name: 'Carbon Veteran', desc: 'Accumulate 500 total points', unlocked: points >= 200, icon: '🏆' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Overview Points Card */}
      <header className="glass-panel glow-emerald" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>Green Guild Action Center</h2>
          <p style={{ color: 'var(--text-muted)' }}>Complete challenges to earn points, then spend them to fund carbon offset projects.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }} aria-label={`Current Balance: ${points} Green Points`}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Balance</span>
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--emerald)', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Leaf size={24} fill="var(--emerald)" aria-hidden="true" /> {points} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>GP</span>
          </span>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Active Challenges */}
        <section className="glass-panel" style={{ padding: '24px' }} aria-labelledby="active-challenges-heading">
          <h3 id="active-challenges-heading" style={{ fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass style={{ color: 'var(--accent-blue)' }} aria-hidden="true" /> Active Eco-Challenges
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {challenges.map((ch) => {
              const isJoined = activeChallenges.includes(ch.id);
              const isCompleted = completedChallenges.includes(ch.id);

              return (
                <div
                  key={ch.id}
                  className="glass-panel"
                  style={{
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    background: isCompleted ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255,255,255,0.01)',
                    borderColor: isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-glow)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.4rem' }} aria-hidden="true">{ch.icon}</span>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{ch.title}</h4>
                        <span style={{
                          fontSize: '0.65rem',
                          background: ch.difficulty === 'Easy' ? 'var(--emerald-glow)' : ch.difficulty === 'Medium' ? 'rgba(38, 92, 50, 0.2)' : 'rgba(239, 68, 68, 0.1)',
                          color: ch.difficulty === 'Easy' ? 'var(--emerald)' : ch.difficulty === 'Medium' ? 'var(--accent-orange)' : 'var(--accent-red)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 'bold',
                          display: 'inline-block',
                          marginTop: '4px'
                        }}>
                          {ch.difficulty}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                      <div style={{ color: 'var(--emerald)', fontWeight: 'bold' }}>+{ch.points} GP</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Saves {ch.reduction} kg</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ch.desc}</p>
                  
                  {isCompleted ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald)', fontSize: '0.8rem', fontWeight: '600', marginTop: '4px' }}>
                      <ShieldCheck size={16} aria-hidden="true" /> Completed
                    </div>
                  ) : isJoined ? (
                    <button
                      onClick={() => onCompleteChallenge(ch.id, ch.points, ch.reduction)}
                      className="btn-primary"
                      aria-label={`Complete and submit task: ${ch.title}`}
                      style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '8px', alignSelf: 'flex-end' }}
                    >
                      Complete Action
                    </button>
                  ) : (
                    <button
                      onClick={() => onJoinChallenge(ch.id)}
                      className="btn-secondary"
                      aria-label={`Accept eco challenge: ${ch.title}`}
                      style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '8px', alignSelf: 'flex-end' }}
                    >
                      Accept Challenge
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Offsetting & Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Points Store / Offset Simulator */}
          <section className="glass-panel" style={{ padding: '24px' }} aria-labelledby="offset-store-heading">
            <h3 id="offset-store-heading" style={{ fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Leaf style={{ color: 'var(--emerald)' }} aria-hidden="true" /> Spend GP (Offset Carbon)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {offsetProjects.map((p) => (
                <div
                  key={p.id}
                  className="glass-panel"
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    background: 'rgba(255,255,255,0.01)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', maxWidth: '65%' }}>
                    {p.icon}
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>{p.title}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.desc}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <div style={{ fontSize: '0.8rem', textAlign: 'right' }}>
                      <div style={{ fontWeight: 'bold' }}>{p.offset} kg CO2</div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--emerald)' }}>Costs {p.cost} GP</span>
                    </div>
                    <button
                      onClick={() => onBuyOffset(p.cost, p.offset)}
                      disabled={points < p.cost}
                      className="btn-primary"
                      aria-label={`Fund ${p.title} project using ${p.cost} Green Points`}
                      style={{
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        borderRadius: '6px',
                        opacity: points < p.cost ? 0.4 : 1,
                        cursor: points < p.cost ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Fund
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Badges Accomplished */}
          <section className="glass-panel" style={{ padding: '24px' }} aria-labelledby="achievements-heading">
            <h3 id="achievements-heading" style={{ fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award style={{ color: 'var(--accent-purple)' }} aria-hidden="true" /> Achievements Unlocked
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {badges.map((b) => (
                <div
                  key={b.id}
                  className="glass-panel badge-card"
                  tabIndex={0}
                  aria-label={`${b.name} badge. Status: ${b.unlocked ? 'Unlocked' : 'Locked'}. Requirement: ${b.desc}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 6px',
                    textAlign: 'center',
                    borderRadius: '12px',
                    background: b.unlocked ? 'var(--emerald-glow)' : 'rgba(255, 255, 255, 0.02)',
                    borderColor: b.unlocked ? 'var(--emerald)' : 'var(--border-glow)',
                    opacity: b.unlocked ? 1 : 0.4,
                    transition: 'all 0.3s ease'
                  }}
                  title={b.desc}
                >
                  <span style={{ fontSize: '1.8rem', filter: b.unlocked ? 'none' : 'grayscale(100%)' }} aria-hidden="true">{b.icon}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: '600', marginTop: '6px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>
                    {b.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
