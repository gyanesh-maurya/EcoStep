import React, { useState, useEffect } from 'react';
import { Compass, ClipboardList, Leaf, BarChart2, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Ledger from './components/Ledger';
import Guide from './components/Guide';
import Insights from './components/Insights';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // States with localStorage fallbacks
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('ecostep_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('ecostep_points');
    return saved ? parseInt(saved, 10) : 100; // start with 100 bonus points
  });

  const [offsets, setOffsets] = useState(() => {
    const saved = localStorage.getItem('ecostep_offsets');
    return saved ? parseFloat(saved) : 0;
  });

  const [activeChallenges, setActiveChallenges] = useState(() => {
    const saved = localStorage.getItem('ecostep_active_challenges');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedChallenges, setCompletedChallenges] = useState(() => {
    const saved = localStorage.getItem('ecostep_completed_challenges');
    return saved ? JSON.parse(saved) : [];
  });

  // LocalStorage synchronizations
  useEffect(() => {
    localStorage.setItem('ecostep_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('ecostep_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('ecostep_offsets', offsets.toString());
  }, [offsets]);

  useEffect(() => {
    localStorage.setItem('ecostep_active_challenges', JSON.stringify(activeChallenges));
  }, [activeChallenges]);

  useEffect(() => {
    localStorage.setItem('ecostep_completed_challenges', JSON.stringify(completedChallenges));
  }, [completedChallenges]);

  // Log Actions
  const handleAddLog = (newLog) => {
    setLogs((prev) => [...prev, newLog]);
  };

  const handleDeleteLog = (id) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  };

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all carbon records?')) {
      setLogs([]);
    }
  };

  // Challenge Actions
  const handleJoinChallenge = (challengeId) => {
    setActiveChallenges((prev) => [...prev, challengeId]);
  };

  const handleCompleteChallenge = (challengeId, earnedPoints, reductionCo2) => {
    // Move from active to completed, award points, and add a reduction entry in logs
    setActiveChallenges((prev) => prev.filter((id) => id !== challengeId));
    setCompletedChallenges((prev) => [...prev, challengeId]);
    setPoints((prev) => prev + earnedPoints);

    // Record carbon reduction offset in logs as a negative value!
    handleAddLog({
      id: Date.now() + 10,
      category: 'consumption',
      details: `Challenge: Completed reward - reduction`,
      co2: -reductionCo2,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    });
  };

  // Offsetting Action
  const handleBuyOffset = (costPoints, offsetKg) => {
    if (points >= costPoints) {
      setPoints((prev) => prev - costPoints);
      setOffsets((prev) => prev + offsetKg);
    }
  };

  const totalEmissions = logs.reduce((sum, log) => sum + log.co2, 0);
  const netFootprint = Math.max(0, totalEmissions - offsets);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={18} /> },
    { id: 'ledger', label: 'Carbon Ledger', icon: <ClipboardList size={18} /> },
    { id: 'guide', label: 'Eco-Guide', icon: <Compass size={18} /> },
    { id: 'insights', label: 'Advisor Insights', icon: <Leaf size={18} /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard logs={logs} offsets={offsets} target={4000} />;
      case 'ledger':
        return <Ledger logs={logs} onAddLog={handleAddLog} onDeleteLog={handleDeleteLog} onClearLogs={handleClearLogs} />;
      case 'guide':
        return (
          <Guide
            points={points}
            activeChallenges={activeChallenges}
            completedChallenges={completedChallenges}
            onJoinChallenge={handleJoinChallenge}
            onCompleteChallenge={handleCompleteChallenge}
            onBuyOffset={handleBuyOffset}
          />
        );
      case 'insights':
        return <Insights logs={logs} />;
      default:
        return <Dashboard logs={logs} offsets={offsets} />;
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Top Navbar */}
      <header
        style={{
          display: 'none',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-glow)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
        className="mobile-header"
        role="banner"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Leaf style={{ color: 'var(--emerald)' }} size={24} fill="var(--emerald)" aria-hidden="true" />
          <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>EcoStep</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation Menu"
          style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'flex' }}
        >
          {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </header>

      {/* Navigation Sidebar (Desktop & Mobile) */}
      <aside
        className={`glass-panel ${mobileMenuOpen ? 'mobile-open' : ''}`}
        role="complementary"
        aria-label="Sidebar Menu"
        style={{
          margin: '16px',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 99
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Logo Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px' }}>
            <div style={{ background: 'var(--emerald-glow)', padding: '8px', borderRadius: '10px', color: 'var(--emerald)', display: 'flex' }}>
              <Leaf size={24} fill="var(--emerald)" role="img" aria-label="EcoStep Logo" />
            </div>
            <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', letterSpacing: '-0.03em' }} className="green-gradient">
              EcoStep
            </span>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Sidebar navigation links" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                aria-current={activeTab === item.id ? 'page' : undefined}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left', font: 'inherit' }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Summary Card */}
        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }} aria-label={`Current Carbon Status Summary: net ${netFootprint.toFixed(1)} kg`}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Active Carbon Status</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
              {netFootprint.toFixed(1)} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>kg</span>
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--teal)', fontWeight: '500' }}>
              -{offsets.toFixed(0)} kg offsets
            </span>
          </div>
          {/* Visual Mini Progress Bar */}
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${Math.min(100, (netFootprint / 4000) * 100)}%`,
                height: '100%',
                background: netFootprint > 4000 ? 'var(--accent-red)' : 'var(--emerald)'
              }}
            />
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main id="main-content" style={{ padding: '32px 32px 32px 16px', overflowY: 'auto', maxHeight: '100vh' }} className="content-pane">
        {renderContent()}
      </main>

      {/* Extra CSS Styles for Sidebar Responsiveness */}
      <style>{`
        @media (max-width: 900px) {
          .mobile-header {
            display: flex !important;
          }
          .app-container {
            grid-template-columns: 1fr !important;
          }
          aside {
            position: fixed;
            top: 60px;
            left: 0;
            bottom: 0;
            right: 0;
            margin: 0 !important;
            border-radius: 0 !important;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            background: var(--bg-primary) !important;
            box-shadow: none !important;
          }
          aside.mobile-open {
            transform: translateX(0);
          }
          .content-pane {
            padding: 24px !important;
            max-height: calc(100vh - 65px) !important;
          }
        }
      `}</style>
    </div>
  );
}
