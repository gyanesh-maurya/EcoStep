import React from 'react';
import { ShieldCheck, Info, Award, Compass, HelpCircle, Activity, Globe, Compass as AlertCircle } from 'lucide-react';

export default function Insights({ logs = [] }) {
  // Aggregate category totals
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

  // Determine highest emission category
  let maxCategory = 'none';
  let maxVal = 0;
  Object.keys(categoryTotals).forEach((cat) => {
    if (categoryTotals[cat] > maxVal) {
      maxVal = categoryTotals[cat];
      maxCategory = cat;
    }
  });

  const averageCo2PerLog = logs.length > 0 ? totalEmissions / logs.length : 0;

  // Custom tips list based on the dominant category
  const getCategoryTips = () => {
    switch (maxCategory) {
      case 'transportation':
        return {
          title: 'Transportation Strategy',
          description: 'Transit emissions represent your largest environmental factor. Optimizing how you commute will yield massive carbon reductions.',
          tips: [
            'Try to bundle travel errands: combine multiple grocery and retail runs into a single circuit to limit cold starts.',
            'Consider public transit, light rail, or bus lines for standard hub-to-hub commutes.',
            'Incorporate low-impact solo travel: cycling or walking for short-distance trips under 2 miles saves gas and offsets stress.',
            'Maintain proper vehicle tire inflation to optimize fuel economy by up to 3%.'
          ],
          color: 'var(--accent-blue)'
        };
      case 'utilities':
        return {
          title: 'Home Utilities Audit',
          description: 'Your utility usage accounts for the majority of your current footprint. Focus on energy efficiency and thermal boundaries.',
          tips: [
            'Install smart thermostat programming: lower the climate temperature by 3-5 degrees at night or while away.',
            'Audit home stand-by power draw. Connect TVs, game consoles, and chargers to multi-outlet power strips and shut them off when idle.',
            'Optimize water heaters: setting your water boiler target to 120°F (49°C) cuts heat leakage loss.',
            'Swap standard incandescent bulbs with LED equivalents, saving up to 80% on lighting electricity.'
          ],
          color: 'var(--accent-purple)'
        };
      case 'diet':
        return {
          title: 'Dietary Adjustments',
          description: 'Your nutrition logs indicate higher food-production emissions. Minor plant-based substitutions can make a substantial impact.',
          tips: [
            'Introduce "Meatless Mondays" or dedicate two days a week to vegetarian or vegan meals.',
            'Replace high-impact red meats (beef, lamb) with low-impact poultry, seafood, or plant proteins like lentils and tofu.',
            'Manage food waste actively: plan weekly meal prep menus to prevent grocery spoilage and landfill organic trash.',
            'Support local farmer markets to reduce shipping, packaging, and refrigeration carbon overhead.'
          ],
          color: 'var(--emerald)'
        };
      case 'consumption':
        return {
          title: 'Consumption & Waste Management',
          description: 'General shopping purchases and items thrown to landfills are driving up your carbon scores.',
          tips: [
            'Practice the circular economy: prioritize high-quality, durable second-hand products over new retail buys.',
            'Eliminate single-use plastics from your routine, replacing them with reusable containers and bags.',
            'Establish an active recycling sorting station to earn clean-living offsets for metals, plastics, and paper.',
            'Repair or repurpose old apparel rather than purchasing fast-fashion items.'
          ],
          color: 'var(--accent-orange)'
        };
      default:
        return {
          title: 'Awaiting Metrics',
          description: 'No emission logs have been recorded yet. Once you add carbon activities, our dynamic advisory module will display customized optimization plans here!',
          tips: [
            'Begin logging transit commutes in the Ledger.',
            'Add meals or utility estimates to establish your carbon baseline.',
            'Explore ready-to-join eco challenges in the Guide tab.'
          ],
          color: 'var(--emerald)'
        };
    };
  };

  const currentPlan = getCategoryTips();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Dynamic Recommendations Panel */}
      <section className="glass-panel" style={{ padding: '24px', borderLeft: `6px solid ${currentPlan.color}` }} aria-labelledby="advisor-recommendations-title">
        <h2 id="advisor-recommendations-title" style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--text-main)' }}>
          {currentPlan.title}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.5' }}>
          {currentPlan.description}
        </p>
        
        <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '12px' }}>Personalized Advisory Checklist:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentPlan.tips.map((tip, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-glow)',
                borderRadius: '6px',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: currentPlan.color,
                fontSize: '0.8rem',
                fontWeight: 'bold',
                flexShrink: 0,
                marginTop: '2px'
              }} aria-hidden="true">
                {idx + 1}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KPI Cards & Comparison Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* KPI Panel */}
        <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }} aria-labelledby="kpis-title">
          <h3 id="kpis-title" style={{ color: 'var(--text-muted)' }}>Eco-Efficiency KPIs</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
              <Activity size={20} style={{ color: 'var(--teal)', marginBottom: '8px' }} aria-hidden="true" />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg. Log Intensity</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
                {averageCo2PerLog.toFixed(1)} <span style={{ fontSize: '0.75rem' }}>kg</span>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
              <Award size={20} style={{ color: 'var(--accent-purple)', marginBottom: '8px' }} aria-hidden="true" />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Entries</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
                {logs.length} <span style={{ fontSize: '0.75rem' }}>logs</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Info size={24} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} aria-hidden="true" />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Your carbon efficiency score represents the weight of greenhouse gas emitted per logged life activity. Goal: minimize average log intensity.
            </div>
          </div>
        </section>

        {/* Global Comparison Board */}
        <section className="glass-panel" style={{ padding: '24px' }} aria-labelledby="benchmarks-title">
          <h3 id="benchmarks-title" style={{ color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} style={{ color: 'var(--emerald)' }} aria-hidden="true" /> Comparison Benchmarks (CO2 / Year)
          </h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glow)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 0', fontWeight: '500' }} scope="col">Baseline Entity</th>
                <th style={{ padding: '10px 0', fontWeight: '500', textAlign: 'right' }} scope="col">Annual Target</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '12px 0' }}>🌱 Paris Agreement Target</td>
                <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '600', color: 'var(--emerald)' }}>2,000 kg</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '12px 0' }}>🌍 Global Individual Average</td>
                <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '600' }}>4,000 kg</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '12px 0' }}>🏢 US Average Carbon footprint</td>
                <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '600' }}>16,000 kg</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 0', color: 'var(--teal)', fontWeight: '500' }}>👤 Your Projected Footprint</td>
                <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '700', color: 'var(--teal)' }}>
                  {Math.round(totalEmissions * 12)} kg
                </td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px', fontStyle: 'italic' }}>
            *Your projected annual score scales current logged totals to a 12-month outlook.
          </p>
        </section>

      </div>

    </div>
  );
}
