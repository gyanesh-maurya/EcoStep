import React, { useState } from 'react';
import { Truck, Zap, Utensils, ShoppingBag, Trash2, Calendar, ClipboardList, PlusCircle } from 'lucide-react';
import { calculateTransportation, calculateUtilities, calculateDiet, calculateConsumption } from '../utils/carbonCalculator';

export default function Ledger({ logs = [], onAddLog, onDeleteLog, onClearLogs }) {
  const [activeTab, setActiveTab] = useState('transportation');

  // Input states
  const [travelMode, setTravelMode] = useState('gasolineCar');
  const [travelDistance, setTravelDistance] = useState('');
  const [passengers, setPassengers] = useState(1);

  const [utilityType, setUtilityType] = useState('electricity');
  const [utilityValue, setUtilityValue] = useState('');

  const [dietType, setDietType] = useState('mixed');
  const [mealsCount, setMealsCount] = useState(3);

  const [consumptionType, setConsumptionType] = useState('generalWaste');
  const [consumptionCount, setConsumptionCount] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    let co2 = 0;
    let details = '';

    if (activeTab === 'transportation') {
      const dist = parseFloat(travelDistance);
      if (isNaN(dist) || dist <= 0) return;
      co2 = calculateTransportation(travelMode, dist, passengers);
      const modeLabel = travelMode.replace(/([A-Z])/g, ' $1');
      details = `${modeLabel} - ${dist} miles (${passengers} passenger${passengers > 1 ? 's' : ''})`;
      setTravelDistance('');
    } else if (activeTab === 'utilities') {
      const val = parseFloat(utilityValue);
      if (isNaN(val) || val <= 0) return;
      co2 = calculateUtilities(utilityType, val);
      const unit = utilityType === 'electricity' ? 'kWh' : utilityType === 'gas' ? 'therms' : 'gallons';
      details = `${utilityType.charAt(0).toUpperCase() + utilityType.slice(1)} usage - ${val} ${unit}`;
      setUtilityValue('');
    } else if (activeTab === 'diet') {
      const count = parseInt(mealsCount);
      if (isNaN(count) || count <= 0) return;
      co2 = calculateDiet(dietType, count);
      const dietLabel = dietType === 'heavyMeat' ? 'Heavy Meat' : dietType.charAt(0).toUpperCase() + dietType.slice(1);
      details = `${dietLabel} meals - ${count} count`;
    } else if (activeTab === 'consumption') {
      const count = parseInt(consumptionCount);
      if (isNaN(count) || count <= 0) return;
      co2 = calculateConsumption(consumptionType, count);
      const consLabel = consumptionType.replace(/([A-Z])/g, ' $1');
      details = `${consLabel.charAt(0).toUpperCase() + consLabel.slice(1)} - ${count} unit${count > 1 ? 's' : ''}`;
    }

    onAddLog({
      id: Date.now(),
      category: activeTab,
      details,
      co2,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    });
  };

  // Quick Templates
  const templates = [
    {
      title: 'Daily Solo Commute',
      category: 'transportation',
      desc: '15 mi Gasoline Car',
      run: () => onAddLog({
        id: Date.now(),
        category: 'transportation',
        details: 'Gasoline Car - 15 miles (Solo)',
        co2: calculateTransportation('gasolineCar', 15, 1),
        date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      })
    },
    {
      title: 'Eco Carpool Commute',
      category: 'transportation',
      desc: '20 mi Hybrid, 3 Passengers',
      run: () => onAddLog({
        id: Date.now() + 1,
        category: 'transportation',
        details: 'Hybrid Car - 20 miles (Carpool of 3)',
        co2: calculateTransportation('hybridCar', 20, 3),
        date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      })
    },
    {
      title: 'Full Day Vegan Diet',
      category: 'diet',
      desc: '3 Vegan Meals',
      run: () => onAddLog({
        id: Date.now() + 2,
        category: 'diet',
        details: 'Vegan meals - 3 count',
        co2: calculateDiet('vegan', 3),
        date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      })
    },
    {
      title: 'Weekly Recycling Log',
      category: 'consumption',
      desc: '4 Units Recycled',
      run: () => onAddLog({
        id: Date.now() + 3,
        category: 'consumption',
        details: 'Recycling - 4 units',
        co2: calculateConsumption('recycling', 4),
        date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      })
    }
  ];

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'transportation': return <Truck size={16} />;
      case 'utilities': return <Zap size={16} />;
      case 'diet': return <Utensils size={16} />;
      case 'consumption': return <ShoppingBag size={16} />;
      default: return null;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
      
      {/* Left Panel: Log Form & Templates */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Input Form Card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ClipboardList style={{ color: 'var(--emerald)' }} /> Log Activities
          </h2>

          {/* Form Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
            {['transportation', 'utilities', 'diet', 'consumption'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 4px',
                  background: activeTab === tab ? 'var(--emerald-glow)' : 'transparent',
                  border: '1px solid',
                  borderColor: activeTab === tab ? 'var(--emerald)' : 'var(--border-glow)',
                  borderRadius: '10px',
                  color: activeTab === tab ? 'var(--emerald)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease'
                }}
              >
                {getTabIcon(tab)}
                <span>{tab === 'transportation' ? 'Travel' : tab === 'utilities' ? 'Utility' : tab}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Travel Specific Inputs */}
            {activeTab === 'transportation' && (
              <>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Transit Mode</label>
                  <select className="form-select" value={travelMode} onChange={(e) => setTravelMode(e.target.value)}>
                    <option value="gasolineCar">Gasoline Car (Standard)</option>
                    <option value="dieselCar">Diesel Car</option>
                    <option value="hybridCar">Hybrid Car</option>
                    <option value="electricCar">Electric Car (EV)</option>
                    <option value="bus">Public Bus</option>
                    <option value="train">Train / Metro</option>
                    <option value="flight">Flight (Commercial Airplane)</option>
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Distance (miles)</label>
                    <input
                      type="number"
                      required
                      min="0.1"
                      step="any"
                      placeholder="e.g. 12.5"
                      className="form-input"
                      value={travelDistance}
                      onChange={(e) => setTravelDistance(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Passengers</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="form-input"
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Utility Specific Inputs */}
            {activeTab === 'utilities' && (
              <>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Resource Type</label>
                  <select className="form-select" value={utilityType} onChange={(e) => setUtilityType(e.target.value)}>
                    <option value="electricity">Electricity (kWh)</option>
                    <option value="gas">Natural Gas (therms)</option>
                    <option value="water">Water (gallons)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Amount Used</label>
                  <input
                    type="number"
                    required
                    min="0.1"
                    step="any"
                    placeholder="Consumption figure"
                    className="form-input"
                    value={utilityValue}
                    onChange={(e) => setUtilityValue(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Diet Specific Inputs */}
            {activeTab === 'diet' && (
              <>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Meal Profile</label>
                  <select className="form-select" value={dietType} onChange={(e) => setDietType(e.target.value)}>
                    <option value="heavyMeat">Heavy Red Meat (Beef/Lamb)</option>
                    <option value="mixed">Mixed Meal (Fish, Poultry, Eggs)</option>
                    <option value="vegetarian">Vegetarian (Dairy, no meat)</option>
                    <option value="vegan">Vegan (Entirely plant-based)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Number of Meals</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="form-input"
                    value={mealsCount}
                    onChange={(e) => setMealsCount(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Consumption Specific Inputs */}
            {activeTab === 'consumption' && (
              <>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Purchase/Action Item</label>
                  <select className="form-select" value={consumptionType} onChange={(e) => setConsumptionType(e.target.value)}>
                    <option value="generalWaste">General Trash (Bag of Waste)</option>
                    <option value="electronics">New Electronics (Smartphone/Laptop)</option>
                    <option value="clothing">New Apparel/Clothing Item</option>
                    <option value="recycling">Recycling Action (Offset reduction)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Quantity</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="form-input"
                    value={consumptionCount}
                    onChange={(e) => setConsumptionCount(e.target.value)}
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
              <PlusCircle size={18} /> Record Entry
            </button>
          </form>
        </div>

        {/* Quick Log Templates Card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '14px', color: 'var(--text-muted)' }}>Quick Add Templates</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {templates.map((tpl, i) => (
              <button
                key={i}
                onClick={tpl.run}
                className="glass-panel"
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  background: 'rgba(255, 255, 255, 0.02)',
                  fontSize: '0.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'all 0.2s ease',
                  border: '1px solid var(--border-glow)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--emerald)';
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-glow)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{tpl.title}</span>
                <span style={{ color: 'var(--text-muted)' }}>{tpl.desc}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Right Panel: Scrollable History */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', maxHeight: '585px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Carbon Entry Logbook
          </h2>
          {logs.length > 0 && (
            <button
              onClick={onClearLogs}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-red)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: '500'
              }}
            >
              Clear All
            </button>
          )}
        </div>

        {logs.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-dark)', gap: '12px' }}>
            <ClipboardList size={48} strokeWidth={1} />
            <p style={{ textAlign: 'center', fontSize: '0.95rem' }}>Your logbook is currently empty. Record your first emissions activity on the left!</p>
          </div>
        ) : (
          <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {logs.slice().reverse().map((log) => (
              <div
                key={log.id}
                className="glass-panel"
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.01)',
                  borderRadius: '12px',
                  borderLeft: `4px solid ${
                    log.category === 'transportation' ? 'var(--accent-blue)' :
                    log.category === 'utilities' ? 'var(--accent-purple)' :
                    log.category === 'diet' ? 'var(--emerald)' : 'var(--accent-orange)'
                  }`
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '75%' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>{log.details}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} /> {log.date}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '700', color: log.co2 < 0 ? 'var(--teal)' : 'var(--text-main)' }}>
                      {log.co2 < 0 ? '' : '+'}{log.co2.toFixed(1)} kg
                    </div>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>CO2e</span>
                  </div>
                  <button
                    onClick={() => onDeleteLog(log.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-dark)',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      display: 'flex'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-red)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-dark)'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
