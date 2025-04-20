import React, { useEffect, useState } from 'react';

const AdvancedContactAnimation = () => {
  const [animationState, setAnimationState] = useState({
    envelopeY: 0,
    envelopeRotation: 0,
    paperY: -40,
    paperScale: 0,
    paperVisible: false,
    checkmarkPath: "M70,80 L85,95 L115,65",
    checkmarkLength: 0,
    checkmarkVisible: false
  });

  useEffect(() => {
    let animationFrame;
    let startTime = null;
    const duration = 5000; // 5 seconds for the full animation cycle

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Create animation keyframes
      let state = { ...animationState };
      
      if (progress < 0.3) {
        // Phase 1: Envelope floats up and rotates slightly
        const phase1Progress = progress / 0.3;
        state.envelopeY = -10 * Math.sin(phase1Progress * Math.PI);
        state.envelopeRotation = 5 * Math.sin(phase1Progress * Math.PI * 2);
      } else if (progress < 0.5) {
        // Phase 2: Paper emerges from envelope
        const phase2Progress = (progress - 0.3) / 0.2;
        state.paperVisible = true;
        state.paperY = -40 * phase2Progress;
        state.paperScale = phase2Progress;
        state.envelopeY = -10 * Math.sin(0.3 * Math.PI) * (1 - phase2Progress);
      } else if (progress < 0.7) {
        // Phase 3: Paper fully visible and envelope settles
        const phase3Progress = (progress - 0.5) / 0.2;
        state.paperY = -40;
        state.paperScale = 1;
        state.envelopeY = 0;
      } else if (progress < 0.9) {
        // Phase 4: Checkmark appears
        const phase4Progress = (progress - 0.7) / 0.2;
        state.checkmarkVisible = true;
        state.checkmarkLength = phase4Progress;
      } else {
        // Phase 5: Animation complete, paper recedes back into envelope
        const phase5Progress = (progress - 0.9) / 0.1;
        state.paperY = -40 * (1 - phase5Progress);
        state.paperScale = 1 - phase5Progress;
        state.checkmarkLength = 1 - phase5Progress;
        if (phase5Progress > 0.5) state.checkmarkVisible = false;
      }
      
      setAnimationState(state);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Restart animation after completion
        startTime = null;
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const getEnvelopeTransform = () => {
    return `translate(0, ${animationState.envelopeY}) rotate(${animationState.envelopeRotation})`;
  };

  const getPaperTransform = () => {
    return `translate(0, ${animationState.paperY}) scale(${animationState.paperScale})`;
  };

  const getCheckmarkStyle = () => {
    return {
      strokeDasharray: 100,
      strokeDashoffset: 100 - (animationState.checkmarkLength * 100),
      opacity: animationState.checkmarkVisible ? 1 : 0,
    };
  };

  const envelopeGradient = "linear-gradient(135deg, #4299e1 0%, #38b2ac 100%)";
  const paperGradient = "linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%)";

  return (
    <div className="w-full h-48 flex items-center justify-center overflow-hidden">
      <svg 
        viewBox="0 0 200 160" 
        width="100%" 
        height="100%" 
        className="max-w-full max-h-full"
      >
        {/* Envelope */}
        <g transform={getEnvelopeTransform()}>
          {/* Envelope body */}
          <rect 
            x="40" 
            y="80" 
            width="120" 
            height="70" 
            rx="6" 
            fill="#3b82f6"
            stroke="#2563eb"
            strokeWidth="2"
          />
          
          {/* Envelope flap (back) */}
          <path 
            d="M40,80 L100,50 L160,80" 
            fill="#2563eb"
            stroke="#2563eb"
            strokeWidth="2"
          />
          
          {/* Envelope inner shadow */}
          <path 
            d="M40,80 L100,110 L160,80" 
            fill="#2563eb"
            stroke="#2563eb"
            strokeWidth="1"
            opacity="0.7"
          />
        </g>
        
        {/* Paper with lines */}
        {animationState.paperVisible && (
          <g transform={getPaperTransform()}>
            <rect 
              x="50" 
              y="60" 
              width="100" 
              height="70" 
              rx="4" 
              fill="white"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            
            {/* Paper lines */}
            <line x1="60" y1="80" x2="140" y2="80" stroke="#cbd5e0" strokeWidth="2" />
            <line x1="60" y1="95" x2="140" y2="95" stroke="#cbd5e0" strokeWidth="2" />
            <line x1="60" y1="110" x2="120" y2="110" stroke="#cbd5e0" strokeWidth="2" />
            
            {/* Checkmark */}
            {animationState.checkmarkVisible && (
              <path 
                d={animationState.checkmarkPath}
                fill="none"
                stroke="#38b2ac"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={getCheckmarkStyle()}
              />
            )}
          </g>
        )}
        
        {/* Background decorative elements */}
        <circle cx="30" cy="30" r="10" fill="#3b82f6" opacity="0.2" />
        <circle cx="170" cy="130" r="15" fill="#38b2ac" opacity="0.2" />
        <path d="M180,20 L190,30 L180,40" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
        <path d="M20,120 L10,130 L20,140" fill="none" stroke="#38b2ac" strokeWidth="2" opacity="0.3" />
      </svg>
    </div>
  );
};

export default AdvancedContactAnimation;