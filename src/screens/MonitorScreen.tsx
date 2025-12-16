// src/screens/MonitorScreen.tsx
import React from 'react';

const MonitorScreen: React.FC = () => {
  return (
    <div className="monitor-container">
      <Header />
      <RecordingCard />
      <AnalysisActions />
    </div>
  );
};

export default MonitorScreen;

/* ================= COMPONENTS ================= */

const Header = () => (
  <div className="header">
    <h1>AI Stethoscope System</h1>
    <p className="status">Ready to monitor</p>
    <div className="battery">🔋 87%</div>
  </div>
);

const RecordingCard = () => (
  <div className="recording-card">
    <button className="record-btn">
      ▶ Start Recording
    </button>
    <p>Tap to begin monitoring</p>
  </div>
);

const AnalysisActions = () => (
  <div className="analysis-actions">
    <button>❤️ Heart Analysis</button>
    <button>🌬 Lung Analysis</button>
  </div>
);
