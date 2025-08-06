import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay: number;
  speed?: number;
}

const Typewriter = ({ text, delay, speed = 50 }: TypewriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isStarted, text, speed]);

  return <span>{displayText}</span>;
};

export const AIRobotAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCV, setShowCV] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCV(true);
    }, 500);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 6);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(stepTimer);
    };
  }, []);

  const cvSections = [
    { title: "John Smith", type: "name", delay: 1000 },
    { title: "Senior Software Engineer", type: "title", delay: 2000 },
    { title: "john.smith@email.com | +1 (555) 123-4567", type: "contact", delay: 3000 },
    { title: "• 8+ years of full-stack development experience", type: "skill", delay: 4000 },
    { title: "• Expert in React, Node.js, Python, and AWS", type: "skill", delay: 5000 },
    { title: "• Led development teams of 5+ engineers", type: "skill", delay: 6000 },
  ];

  return (
    <div className="relative flex justify-center items-center h-96 w-full">
      {/* Main CV Document */}
      <div className={`relative bg-white border-2 border-gray-200 rounded-lg shadow-2xl w-80 h-96 p-8 transition-all duration-1000 ${showCV ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="space-y-4">
          {cvSections.map((section, index) => (
            <div key={index} className="min-h-[20px]">
              {section.type === 'name' && (
                <h1 className="text-2xl font-bold text-gray-900">
                  <Typewriter text={section.title} delay={section.delay} speed={80} />
                </h1>
              )}
              {section.type === 'title' && (
                <h2 className="text-lg font-semibold text-blue-600">
                  <Typewriter text={section.title} delay={section.delay} speed={60} />
                </h2>
              )}
              {section.type === 'contact' && (
                <p className="text-sm text-gray-600">
                  <Typewriter text={section.title} delay={section.delay} speed={40} />
                </p>
              )}
              {section.type === 'skill' && (
                <p className="text-sm text-gray-700">
                  <Typewriter text={section.title} delay={section.delay} speed={30} />
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-8 right-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (currentStep + 1) * 16.66)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">AI Building Your Resume...</p>
        </div>
      </div>

      {/* Robotic Arms */}
      <div className={`absolute transition-all duration-2000 ${currentStep >= 1 ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{ left: '-100px', top: '20px' }}>
        <div className="relative">
          {/* Robot Arm 1 */}
          <div className="w-16 h-2 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full transform origin-right animate-pulse"></div>
          <div className="w-12 h-2 bg-gradient-to-r from-gray-500 to-gray-300 rounded-full transform origin-right rotate-45 -mt-1"></div>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ml-14 -mt-4 animate-bounce">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className={`absolute transition-all duration-2000 ${currentStep >= 2 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`} style={{ right: '-100px', top: '60px' }}>
        <div className="relative">
          {/* Robot Arm 2 */}
          <div className="w-16 h-2 bg-gradient-to-l from-gray-600 to-gray-400 rounded-full transform origin-left"></div>
          <div className="w-12 h-2 bg-gradient-to-l from-gray-500 to-gray-300 rounded-full transform origin-left -rotate-45 -mt-1 ml-4"></div>
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center -ml-2 -mt-4 animate-bounce" style={{ animationDelay: '0.5s' }}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* AI Brain */}
      <div className={`absolute transition-all duration-1000 ${currentStep >= 3 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} style={{ bottom: '-60px', left: '50%', transform: 'translateX(-50%)' }}>
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            AI Processing...
          </p>
        </div>
      </div>

      {/* Floating Data Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-blue-400 rounded-full transition-all duration-2000 ${currentStep >= 4 ? 'opacity-100' : 'opacity-0'}`}
          style={{
            left: `${20 + (i * 60)}px`,
            top: `${100 + Math.sin(i) * 50}px`,
            animation: `float 3s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }}
        ></div>
      ))}

      {/* Success Checkmarks */}
      {currentStep >= 5 && (
        <div className="absolute -top-8 -right-8 animate-bounce">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};