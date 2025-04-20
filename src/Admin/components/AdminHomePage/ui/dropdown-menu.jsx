import React, { useState, useRef, useEffect } from "react";

const DropdownMenuContext = React.createContext(null);

export const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownMenuContext.Provider>
  );
};
export const DropdownMenuTrigger = ({ asChild, children }) => {
    const { open, setOpen } = React.useContext(DropdownMenuContext);
    
    const handleClick = (e) => {
      e.preventDefault();
      setOpen(!open);
    };
    
    if (asChild) {
      return React.cloneElement(children, {
        onClick: handleClick
      });
    }
    
    return (
      <button onClick={handleClick}>
        {children}
      </button>
    );
  };
  
  export const DropdownMenuContent = ({ children, align = "start", className = "" }) => {
    const { open, setOpen } = React.useContext(DropdownMenuContext);
    const ref = useRef(null);
    
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (open && ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      };
      
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, setOpen]);
    
    if (!open) return null;
    
    const alignClasses = {
      start: "left-0",
      end: "right-0"
    };
    
    return (
      <div 
        ref={ref}
        className={`absolute z-50 min-w-[8rem] bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-1 shadow-lg ${alignClasses[align]} mt-1 ${className}`}
      >
        {children}
      </div>
    );
  };
  
  export const DropdownMenuItem = ({ children, onClick, className = "" }) => {
    const { setOpen } = React.useContext(DropdownMenuContext);
    
    const handleClick = (e) => {
      if (onClick) onClick(e);
      setOpen(false);
    };
    
    return (
      <button
        className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${className}`}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  };
  
  export const DropdownMenuLabel = ({ children, className = "" }) => {
    return (
      <div className={`px-2 py-1.5 text-sm font-semibold ${className}`}>
        {children}
      </div>
    );
  };
  
  export const DropdownMenuSeparator = ({ className = "" }) => {
    return (
      <div className={`-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700 ${className}`} />
    );
  };
  