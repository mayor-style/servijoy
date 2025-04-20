import React, { useState } from "react";

export const Tooltip = ({ children, content }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="inline-flex"
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-50 px-2 py-1 text-xs text-white bg-black rounded whitespace-nowrap bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1">
          {content}
          <div className="absolute w-2 h-2 bg-black transform rotate-45 left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2"></div>
        </div>
      )}
    </div>
  );
};
