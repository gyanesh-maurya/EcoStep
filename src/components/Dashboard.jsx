import { Leaf, Flame, ShieldAlert, Award, TrendingDown } from 'lucide-react';

export default function Dashboard({ logs = [], offsets = 0, target = 4000 }) {
  // Calculate category breakdowns
  const categoryTotals = logs.reduce(
    (acc, log) => {
      if (acc[log.category] !== undefined) {
        acc[log.category] += log.co2;
      }
      return acc;
    },
    { transportation: 0, utilities: 0, diet: 0, consumption: 0 }
  );

  const totalEmissions = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
  const netFootprint = Math.max(0, totalEmissions - offsets);
  const percentageOfTarget = Math.min(100, (netFootprint / target) * 100);

  // Determine Grade based on footprint
  let grade = 'A+';
  let gradeColor = 'var(--teal)';
  if (netFootprint > target * 1.5) {
    grade = 'F';
    gradeColor = 'var(--accent-red)';
  } else if (netFootprint > target * 1.2) {
    grade = 'D';
    gradeColor = 'var(--accent-orange)';
  } else if (netFootprint > target) {
    grade = 'C';
    gradeColor = 'var(--accent-orange)';
  } else if (netFootprint > target * 0.7) {
    grade = 'B';
    gradeColor = 'var(--accent-blue)';
  } else if (netFootprint > target * 0.4) {
    grade = 'A';
    gradeColor = 'var(--emerald)';
  }

  // Radial Gauge Calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentageOfTarget / 100) * circumference;

  // Determine Gauge Color dynamic
  const getGaugeColor = () => {
    if (percentageOfTarget > 85) return 'var(--accent-red)';
    if (percentageOfTarget > 60) return 'var(--accent-orange)';
    return 'var(--emerald)';
  };

  // Mock historical data for the custom SVG chart based on logs
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  // Distribute emissions for visualization
  const historicalData = [340, 290, 410, 230, totalEmissions * 0.4, totalEmissions * 0.6];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Welcome Panel */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '4px' }}>Eco-Balance</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time overview of your carbon profile and offsets.</p>
        </div>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px', borderRadius: '12px' }} aria-label={`Current Climate Rank: Grade ${grade}`}>
          <div style={{ background: 'var(--emerald-glow)', padding: '8px', borderRadius: '50%', color: 'var(--emerald)', display: 'flex' }}>
            <Award size={20} aria-hidden="true" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Climate Rank</div>
            <div style={{ fontWeight: 'bold', color: gradeColor }}>Grade {grade}</div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Radial Budget Gauge */}
        <section className="glass-panel glow-emerald" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '340px' }} aria-labelledby="radial-gauge-title">
          <h3 id="radial-gauge-title" style={{ alignSelf: 'flex-start', color: 'var(--text-muted)' }}>Yearly Budget Projections</h3>
          <div style={{ position: 'relative', width: '200px', height: '200px', margin: '20px 0' }}>
            <svg
              width="200"
              height="200"
              style={{ transform: 'rotate(-90deg)' }}
              role="img"
              aria-label={`Radial progress ring indicating ${Math.round(percentageOfTarget)}% of carbon budget has been used`}
            >
              {/* Background Circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="14"
              />
              {/* Foreground Budget Circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke={getGaugeColor()}
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.8s ease-in-out, stroke 0.8s' }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }} aria-hidden="true">
              <span style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
                {Math.round(percentageOfTarget)}%
              </span>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Budget Used
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Net Footprint: <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{netFootprint.toFixed(1)} kg</span> / {target} kg CO2e limit
          </div>
        </section>

        {/* Balance Sheet Ledger */}
        <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} aria-labelledby="balance-sheet-title">
          <h3 id="balance-sheet-title" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Carbon Balance Sheet</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-glow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Flame size={18} style={{ color: 'var(--accent-orange)' }} aria-hidden="true" />
                <span>Gross Emissions</span>
              </div>
              <span style={{ fontWeight: '600' }}>+{totalEmissions.toFixed(1)} kg</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-glow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Leaf size={18} style={{ color: 'var(--teal)' }} aria-hidden="true" />
                <span>Virtual Offsets</span>
              </div>
              <span style={{ fontWeight: '600', color: 'var(--teal)' }}>-{offsets.toFixed(1)} kg</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-glow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingDown size={18} style={{ color: 'var(--accent-blue)' }} aria-hidden="true" />
                <span>Net Footprint</span>
              </div>
              <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--text-main)' }}>{netFootprint.toFixed(1)} kg</span>
            </div>
          </div>

          <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <ShieldAlert size={28} style={{ color: 'var(--accent-orange)', flexShrink: 0 }} aria-hidden="true" />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {netFootprint > target ? 
                "You have exceeded your recommended emissions target. Try swapping travel plans for virtual actions in the challenges tab!" : 
                "Great work! You are currently within your carbon budget threshold. Keep utilizing eco-actions to lower it further."
              }
            </span>
          </div>
        </section>
      </div>

      {/* Breakdown and Custom Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Category breakdown visual bars */}
        <section className="glass-panel" style={{ padding: '24px' }} aria-labelledby="breakdown-title">
          <h3 id="breakdown-title" style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Emissions by Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: 'Transportation', value: categoryTotals.transportation, color: 'var(--accent-blue)', icon: '🚗' },
              { label: 'Home Utilities', value: categoryTotals.utilities, color: 'var(--accent-purple)', icon: '⚡' },
              { label: 'Diet & Meals', value: categoryTotals.diet, color: 'var(--emerald)', icon: '🥗' },
              { label: 'Shopping & Consumption', value: categoryTotals.consumption, color: 'var(--accent-orange)', icon: '🛍️' }
            ].map((cat) => {
              const share = totalEmissions > 0 ? (cat.value / totalEmissions) * 100 : 0;
              return (
                <div key={cat.label} aria-label={`${cat.label} emissions: ${cat.value.toFixed(1)} kg, representing ${Math.round(share)}% of total footprint`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
                    <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span aria-hidden="true">{cat.icon}</span> {cat.label}
                    </span>
                    <span style={{ fontWeight: '500' }}>
                      {cat.value.toFixed(1)} kg <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({Math.round(share)}%)</span>
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${share}%`,
                      height: '100%',
                      background: cat.color,
                      borderRadius: '4px',
                      transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* History Custom SVG Bar Chart */}
        <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} aria-labelledby="history-chart-title">
          <h3 id="history-chart-title" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Historical Emissions (6-Month Trend)</h3>
          
          <div
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '160px', padding: '10px 0', borderBottom: '1px solid var(--border-glow)' }}
            role="img"
            aria-label="Historical bar chart showing carbon emissions over the last six months."
          >
            {historicalData.map((val, idx) => {
              // Scale graph
              const maxVal = Math.max(...historicalData, 200);
              const heightPct = Math.max(10, Math.min(100, (val / maxVal) * 100));
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: '1' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{Math.round(val)}</div>
                  <div style={{
                    width: '28px',
                    height: `${heightPct}px`,
                    background: idx === 5 ? 'linear-gradient(to top, var(--emerald), var(--teal))' : 'rgba(255,255,255,0.08)',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative'
                  }}>
                    {/* Glow effect on hover */}
                    <div className="pulse-glow" style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '6px 6px 0 0',
                      opacity: 0
                    }} />
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>{months[idx]}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.8rem', marginTop: '12px', color: 'var(--text-muted)' }} aria-hidden="true">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }} />
              Past Months
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', background: 'linear-gradient(var(--emerald), var(--teal))', borderRadius: '2px' }} />
              Current Projection
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
