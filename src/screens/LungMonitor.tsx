import { useState, useEffect } from 'react';
import { Wind, Save, AlertTriangle, ArrowLeft } from 'lucide-react';

interface LungMonitorProps {
  onBack: (tab: 'home' | 'heart' | 'lung' | 'recording' | 'history') => void;
}

export default function LungMonitor({ onBack }: LungMonitorProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [crackles, setCrackles] = useState(false);
  const [wheezes, setWheezes] = useState(false);
  const [severity, setSeverity] = useState<'None' | 'Mild' | 'Moderate' | 'Severe'>('None');
  const [audioLevel, setAudioLevel] = useState(0);

  // Simulate real-time analysis
  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      setAudioLevel(Math.random() * 100);
      
      // Randomly detect anomalies for demo
      if (Math.random() > 0.9) {
        setCrackles(Math.random() > 0.5);
        setWheezes(Math.random() > 0.5);
        
        if (crackles || wheezes) {
          const severities: Array<'None' | 'Mild' | 'Moderate' | 'Severe'> = ['None', 'Mild', 'Moderate'];
          setSeverity(severities[Math.floor(Math.random() * severities.length)]);
        } else {
          setSeverity('None');
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isAnalyzing, crackles, wheezes]);

  const handleSaveResult = () => {
    alert('Lung analysis results saved successfully!');
    setIsAnalyzing(false);
  };

  const getRecommendation = () => {
    if (severity === 'None') return 'No abnormalities detected. Continue regular monitoring.';
    if (severity === 'Mild') return 'Minor irregularities detected. Monitor and consult if symptoms persist.';
    if (severity === 'Moderate') return 'Noticeable abnormalities. Recommend medical consultation.';
    return 'Significant abnormalities. Immediate medical attention recommended.';
  };

  const getSeverityColor = () => {
    if (severity === 'None') return 'from-teal-500 to-emerald-500';
    if (severity === 'Mild') return 'from-yellow-500 to-amber-500';
    if (severity === 'Moderate') return 'from-orange-500 to-red-500';
    return 'from-red-600 to-pink-600';
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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Wind className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-slate-900">Lung Analysis</h2>
              <p className="text-xs text-slate-600">Respiratory sound monitoring</p>
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
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
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
          {/* Audio Input Level */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-900">Audio Input</p>
              {isAnalyzing && (
                <div className="flex items-center gap-1 text-xs text-blue-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Recording</span>
                </div>
              )}
            </div>
            <div className="h-20 bg-slate-50 rounded-lg flex items-center px-2 overflow-hidden">
              {isAnalyzing ? (
                <div className="w-full flex items-center gap-0.5">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-500 rounded-full transition-all duration-100"
                      style={{
                        height: `${Math.random() * audioLevel}%`,
                        minHeight: '4px'
                      }}
                    ></div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 w-full text-center">Start analyzing</p>
              )}
            </div>
          </div>

          {/* Indicators for Crackles and Wheezes */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-xl p-4 border-2 ${
              crackles && isAnalyzing
                ? 'bg-amber-50 border-amber-300'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {crackles && isAnalyzing && (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                )}
                <p className="text-xs text-slate-600">Crackles</p>
              </div>
              <p className={`text-lg ${
                crackles && isAnalyzing ? 'text-amber-900' : 'text-slate-500'
              }`}>
                {crackles && isAnalyzing ? 'Detected' : 'Not Detected'}
              </p>
            </div>

            <div className={`rounded-xl p-4 border-2 ${
              wheezes && isAnalyzing
                ? 'bg-orange-50 border-orange-300'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {wheezes && isAnalyzing && (
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                )}
                <p className="text-xs text-slate-600">Wheezes</p>
              </div>
              <p className={`text-lg ${
                wheezes && isAnalyzing ? 'text-orange-900' : 'text-slate-500'
              }`}>
                {wheezes && isAnalyzing ? 'Detected' : 'Not Detected'}
              </p>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-200 p-6">
            <p className="text-sm text-slate-900 mb-4">Analysis Summary</p>
            
            {/* Severity Indicator */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-600">Severity Level</p>
                <p className="text-lg text-slate-900">{severity}</p>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getSeverityColor()} rounded-full transition-all duration-300`}
                  style={{ 
                    width: severity === 'None' ? '0%' : 
                           severity === 'Mild' ? '33%' : 
                           severity === 'Moderate' ? '66%' : '100%' 
                  }}
                ></div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-700 mb-1">Recommendation</p>
              <p className="text-xs text-blue-900">{getRecommendation()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}