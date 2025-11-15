import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { analyzeTrashImage } from '../services/gemini';

// Mock user stats
const USER_STATS = {
  points: 420,
  streak: 7,
  cleanups: 24,
};

const CameraPage = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [windowHeight, setWindowHeight] = useState('100vh');

  // Handle mobile viewport height
  useEffect(() => {
    const setAppHeight = () => {
      setWindowHeight(`${window.innerHeight}px`);
    };
    
    setAppHeight();
    window.addEventListener('resize', setAppHeight);
    
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const retake = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setSubmitted(false);
  };

  const submitReport = async () => {
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeTrashImage(capturedImage);
      
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setAnalysisResult(result);
      setIsAnalyzing(false);
      setSubmitted(true);
      
    } catch (error) {
      console.error('Error analyzing image:', error);
      setAnalysisResult({
        primary_material: 'Mixed Waste',
        cleanup_priority_score: 7,
        specific_items: ['Plastic bottle', 'Paper'],
      });
      setIsAnalyzing(false);
      setSubmitted(true);
    }
  };

  const confirmSubmission = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setSubmitted(false);
  };

  return (
    <div
      className="flex flex-col safe-area-inset h-full"
      style={{ height: windowHeight }}
    >
      {/* Header - Always visible */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-4 safe-area-inset-top flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold">Report Trash</h1>
            <p className="text-xs opacity-90">Earn points for environmental impact</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{USER_STATS.points}</div>
            <div className="text-xs opacity-90">Points</div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white bg-opacity-20 rounded px-3 py-2 backdrop-blur-sm text-center">
            <div className="font-bold">{USER_STATS.streak}🔥</div>
            <div className="text-xs opacity-90">Day Streak</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded px-3 py-2 backdrop-blur-sm text-center">
            <div className="font-bold">{USER_STATS.cleanups} 🧹</div>
            <div className="text-xs opacity-90">Cleanups</div>
          </div>
        </div>
      </div>

      {/* Camera/Image Area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-black relative overflow-hidden">
        {!capturedImage ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
              videoConstraints={{
                facingMode: 'environment',
                width: { ideal: 1920 },
                height: { ideal: 1440 },
              }}
            />

            {/* Center Guide Circle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-4 border-green-400 rounded-full w-48 h-48 opacity-50"></div>
              <div className="absolute text-white text-center">
                <p className="text-sm opacity-75">Center the trash in the circle</p>
              </div>
            </div>

            {/* Capture Button - Fixed at bottom */}
            <button
              onClick={capture}
              className="absolute bottom-8 rounded-full p-1 shadow-2xl z-10 transition-transform duration-200 hover:scale-110 active:scale-95"
              style={{ bottom: 'max(2rem, calc(env(safe-area-inset-bottom) + 2rem))' }}
              aria-label="Capture photo"
            >
              <div className="w-20 h-20 bg-white rounded-full border-8 border-green-600 shadow-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-green-600 rounded-full animate-pulse"></div>
              </div>
            </button>
          </>
        ) : (
          <div className="w-full h-full flex flex-col relative">
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full h-full object-cover"
            />

            {/* Analyzing Overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent bg-opacity-80 flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-20 h-20 rounded-full border-8 border-transparent border-t-green-400 border-r-emerald-400 animate-spin"></div>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">AI Analyzing Trash</h2>
                  <p className="text-sm text-gray-300">Identifying materials & priority level...</p>
                  <div className="mt-6 flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Submitted Success */}
            {submitted && analysisResult && !isAnalyzing && (
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black bg-opacity-80 flex flex-col items-center justify-center p-6">
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">✅</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h2>
                    <p className="text-sm text-gray-600">Great job contributing to a cleaner environment</p>
                  </div>

                  {/* Analysis Results */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-200">
                    <h3 className="font-bold text-gray-900 mb-3">AI Analysis Results:</h3>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">🎯</span>
                        <div className="flex-1">
                          <div className="text-xs text-gray-600 font-semibold">PRIMARY MATERIAL</div>
                          <div className="font-bold text-gray-900">{analysisResult.primary_material}</div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">🚨</span>
                        <div className="flex-1">
                          <div className="text-xs text-gray-600 font-semibold">PRIORITY LEVEL</div>
                          <div className="font-bold text-gray-900">
                            {analysisResult.cleanup_priority_score}/10
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">📋</span>
                        <div className="flex-1">
                          <div className="text-xs text-gray-600 font-semibold">ITEMS DETECTED</div>
                          <div className="font-bold text-gray-900">
                            {analysisResult.specific_items.join(', ')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 pt-2 border-t border-green-200">
                        <span className="text-2xl">⭐</span>
                        <div className="flex-1">
                          <div className="text-xs text-gray-600 font-semibold">POINTS EARNED</div>
                          <div className="font-bold text-green-600 text-lg">+{analysisResult.cleanup_priority_score * 5} PTS</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={confirmSubmission}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 min-h-12"
                  >
                    Capture Another
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons - Visible when captured but not submitted */}
            {!submitted && !isAnalyzing && (
              <div
                className="absolute bottom-0 left-0 right-0 flex justify-center space-x-3 px-4 py-4 safe-area-inset-bottom bg-gradient-to-t from-black to-transparent"
                style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)' }}
              >
                <button
                  onClick={retake}
                  disabled={isAnalyzing}
                  className="flex-1 max-w-xs bg-gray-700 hover:bg-gray-800 text-white px-6 py-4 rounded-lg disabled:opacity-50 font-bold transition-colors duration-200 min-h-12"
                  aria-label="Retake photo"
                >
                  ↩️ Retake
                </button>
                <button
                  onClick={submitReport}
                  disabled={isAnalyzing}
                  className="flex-1 max-w-xs bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-lg disabled:opacity-50 font-bold transition-all duration-200 min-h-12"
                  aria-label="Submit report"
                >
                  📤 Analyze & Submit
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraPage;