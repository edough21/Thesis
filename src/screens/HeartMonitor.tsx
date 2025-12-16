import { useState, useEffect } from 'react';
import { Heart, Save, AlertCircle, TrendingUp, ArrowLeft } from 'lucide-react';

interface HeartMonitorProps {
  onBack: () => void;
}

export default function HeartMonitor({ onBack }: HeartMonitorProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [status, setStatus] = useState<'Normal' | 'Murmur Detected'>('Normal');
  const [confidence, setConfidence] = useState(94.5);

  // Simulate real-time analysis
  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      setHeartRate(prev => {
        const variation = (Math.random() - 0.5) * 3;
        return Math.max(60, Math.min(120, prev + variation));
      });
      setConfidence(prev => {
        const variation = (Math.random() - 0.5) * 2;
        return Math.max(85, Math.min(99, prev + variation));
      });
      // Randomly detect murmur for demo
      if (Math.random() > 0.95) {
        setStatus(Math.random() > 0.5 ? 'Normal' : 'Murmur Detected');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleSaveResult = () => {
    alert('Heart analysis results saved successfully!');
    setIsAnalyzing(false);
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-slate-900">Heart Analysis</h2>
              <p className="text-xs text-slate-600">Real-time cardiac monitoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* Split Layout: Buttons Left, Info Right */}
      <div className="grid grid-cols-2 gap-4" style={{ minHeight: 'calc(100vh - 220px)' }}>
        {/* LEFT HALF - Buttons */}
        <div className="flex flex-col gap-4">
          {/* Control Buttons */}
          <button
            onClick={() => setIsAnalyzing(!isAnalyzing)}
            className={`flex-1 min-h-[200px] py-8 rounded-2xl transition-all text-2xl ${
              isAnalyzing
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white'
            }`}
          >
            {isAnalyzing ? 'Stop Analysis' : 'Start Analysis'}
          </button>
          
          <button
            onClick={handleSaveResult}
            disabled={!isAnalyzing}
            className={`flex-1 min-h-[200px] flex flex-col items-center justify-center gap-4 py-8 rounded-2xl transition-all text-2xl ${
              isAnalyzing
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-12 h-12" />
            Save Result
          </button>
        </div>

        {/* RIGHT HALF - Information Display */}
        <div className="space-y-4">
          {/* Status */}
          <div className={`rounded-2xl p-6 border-2 ${
            status === 'Normal' 
              ? 'bg-teal-50 border-teal-300' 
              : 'bg-amber-50 border-amber-300'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              {status === 'Normal' ? (
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600" />
              )}
              <p className="text-sm text-slate-600">Status</p>
            </div>
            <p className={`text-2xl ${
              status === 'Normal' ? 'text-teal-900' : 'text-amber-900'
            }`}>
              {status}
            </p>
          </div>

          {/* Heart Rate */}
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
            <p className="text-sm text-slate-600 mb-3">Heart Rate</p>
            <div className="flex items-baseline gap-2">
              <p className="text-5xl text-slate-900">{Math.round(heartRate)}</p>
              <p className="text-xl text-slate-500">BPM</p>
            </div>
          </div>

          {/* AI Confidence Score */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-slate-900">AI Confidence</p>
              </div>
              <p className="text-3xl text-blue-600">{confidence.toFixed(1)}%</p>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-teal-600 rounded-full transition-all duration-300"
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              {confidence >= 90 ? 'High confidence in analysis' : confidence >= 75 ? 'Moderate confidence' : 'Low confidence, continue monitoring'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}