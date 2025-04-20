// components/ui/tooltip.jsx
import React, { useState, useRef, useEffect } from 'react';

export const Tooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const childRef = useRef(null);

  // Position the tooltip
  useEffect(() => {
    if (isVisible && tooltipRef.current && childRef.current) {
      const childRect = childRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      const positions = {
        top: {
          top: childRect.top - tooltipRect.height - 8,
          left: childRect.left + (childRect.width / 2) - (tooltipRect.width / 2)
        },
        bottom: {
          top: childRect.bottom + 8,
          left: childRect.left + (childRect.width / 2) - (tooltipRect.width / 2)
        },
        left: {
          top: childRect.top + (childRect.height / 2) - (tooltipRect.height / 2),
          left: childRect.left - tooltipRect.width - 8
        },
        right: {
          top: childRect.top + (childRect.height / 2) - (tooltipRect.height / 2),
          left: childRect.right + 8
        }
      };

      const pos = positions[position];
      tooltipRef.current.style.top = `${pos.top}px`;
      tooltipRef.current.style.left = `${pos.left}px`;
    }
  }, [isVisible, position]);

  return (
    <div className="relative inline-block">
      <div 
        ref={childRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg transition-opacity duration-150"
          style={{ opacity: isVisible ? 1 : 0 }}
          role="tooltip"
        >
          {content}
          <div className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45 ${
            position === 'top' ? 'bottom-[-4px] left-1/2 ml-[-4px]' :
            position === 'bottom' ? 'top-[-4px] left-1/2 ml-[-4px]' :
            position === 'left' ? 'right-[-4px] top-1/2 mt-[-4px]' :
            'left-[-4px] top-1/2 mt-[-4px]'
          }`} />
        </div>
      )}
    </div>
  );
};

