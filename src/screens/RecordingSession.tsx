import { useState, useEffect } from 'react';
import { Heart, Wind, StopCircle, Clock, ArrowLeft, Save } from 'lucide-react';

interface RecordingSessionProps {
  onBack: (tab: 'home' | 'heart' | 'lung' | 'recording' | 'history') => void;
}

export default function RecordingSession({ onBack }: RecordingSessionProps) {
  const [isRecording, setIsRecording] = useState(true);
  const [duration, setDuration] = useState(0);
  const [heartRate, setHeartRate] = useState(72);
  const [respiratoryRate, setRespiratoryRate] = useState(16);
  const [heartActive, setHeartActive] = useState(true);
  const [lungActive, setLungActive] = useState(true);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [athleteName, setAthleteName] = useState('');

  // Timer
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  // Simulate real-time data
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      if (heartActive) {
        setHeartRate(prev => {
          const variation = (Math.random() - 0.5) * 3;
          return Math.max(60, Math.min(150, prev + variation));
        });
      }
      if (lungActive) {
        setRespiratoryRate(prev => {
          const variation = (Math.random() - 0.5) * 2;
          return Math.max(12, Math.min(25, prev + variation));
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording, heartActive, lungActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopAndAnalyze = () => {
    setIsRecording(false);
    setShowSaveDialog(true);
  };

  const handleSaveRecording = () => {
    if (athleteName.trim()) {
      alert(`Recording saved for ${athleteName}! You can now analyze the data in Heart or Lung Analysis sections.`);
      onBack('home');
    } else {
      alert('Please enter athlete name before saving.');
    }
  };

  const handleCancelSave = () => {
    setShowSaveDialog(false);
    setIsRecording(true);
  };

  return (
    <div className="space-y-4">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onBack('home')}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </button>
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <StopCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-slate-900">Recording Session</h2>
                <p className="text-xs text-slate-600">Capturing vital signs</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm">REC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Save Dialog Overlay */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-2xl text-slate-900 mb-4">Save Recording</h3>
            <p className="text-sm text-slate-600 mb-4">Enter athlete name to save this session</p>
            
            <input
              type="text"
              value={athleteName}
              onChange={(e) => setAthleteName(e.target.value)}
              placeholder="Athlete Name"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg mb-4 text-slate-900 focus:outline-none focus:border-blue-500"
              autoFocus
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCancelSave}
                className="py-3 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRecording}
                className="flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white transition-all"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Split Layout: Buttons Left, Info Right */}
      <div className="grid grid-cols-2 gap-4" style={{ minHeight: 'calc(100vh - 220px)' }}>
        {/* LEFT HALF - Buttons */}
        <div className="flex flex-col gap-4">
          {/* Stop and Analyze Button */}
          <button
            onClick={handleStopAndAnalyze}
            className="flex-1 min-h-[180px] bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-8 rounded-2xl flex flex-col items-center justify-center gap-4 shadow-lg transition-all"
          >
            <StopCircle className="w-16 h-16" />
            <span className="text-2xl">Stop and Analyze</span>
          </button>

          {/* Sensor Controls */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setHeartActive(!heartActive)}
              className={`flex-1 min-h-[120px] py-6 rounded-2xl transition-all text-xl flex items-center justify-center gap-3 ${
                heartActive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-slate-300 hover:bg-slate-400 text-slate-700'
              }`}
            >
              <Heart className="w-8 h-8" />
              {heartActive ? 'Heart Active' : 'Heart Inactive'}
            </button>
            
            <button
              onClick={() => setLungActive(!lungActive)}
              className={`flex-1 min-h-[120px] py-6 rounded-2xl transition-all text-xl flex items-center justify-center gap-3 ${
                lungActive
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-slate-300 hover:bg-slate-400 text-slate-700'
              }`}
            >
              <Wind className="w-8 h-8" />
              {lungActive ? 'Lung Active' : 'Lung Inactive'}
            </button>
          </div>
        </div>

        {/* RIGHT HALF - Information Display */}
        <div className="space-y-4">
          {/* Timer Display */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-200 p-8">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-slate-600" />
                <p className="text-sm text-slate-600">Duration</p>
              </div>
              <p className="text-6xl text-slate-900 tabular-nums">{formatDuration(duration)}</p>
            </div>
          </div>

          {/* Heart Monitor Panel */}
          <div className={`rounded-2xl p-6 border-2 transition-all ${
            heartActive 
              ? 'bg-red-50 border-red-300' 
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  heartActive 
                    ? 'bg-gradient-to-br from-red-500 to-pink-500' 
                    : 'bg-slate-300'
                }`}>
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-900">Heart Monitor</p>
                  <p className="text-xs text-slate-600">
                    {heartActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl text-slate-900">{Math.round(heartRate)}</p>
                <p className="text-xs text-slate-600">BPM</p>
              </div>
            </div>
          </div>

          {/* Lung Monitor Panel */}
          <div className={`rounded-2xl p-6 border-2 transition-all ${
            lungActive 
              ? 'bg-blue-50 border-blue-300' 
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  lungActive 
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                    : 'bg-slate-300'
                }`}>
                  <Wind className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-900">Lung Monitor</p>
                  <p className="text-xs text-slate-600">
                    {lungActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl text-slate-900">{Math.round(respiratoryRate)}</p>
                <p className="text-xs text-slate-600">BrPM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}