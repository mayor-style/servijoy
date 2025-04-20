import React, { useState } from "react";
import { Plus, Search, Filter, Clock, Settings } from "lucide-react";

// Enhanced Button with hover effects and better transitions
const Button = ({ 
  children, 
  onClick, 
  className, 
  variant = "primary",
  size = "default",
  ...props 
}) => {
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
    outline: "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
  };
  
  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base"
  };
  
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced Tooltip with fade-in animation
const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-md bottom-full mb-2 left-1/2 transform -translate-x-1/2 shadow-lg opacity-100 transition-opacity duration-200">
          {content}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-1/2 -ml-1"></div>
        </div>
      )}
    </div>
  );
};

// Enhanced Breadcrumb with better spacing and hover effects
const BreadcrumbLink = ({ href, children, isCurrentPage, ...props }) => {
  const Component = href && !isCurrentPage ? 'a' : 'span';
  return (
    <Component
      href={href}
      className={`text-sm transition-colors duration-200 ${isCurrentPage ? 'font-medium text-gray-800 dark:text-gray-100' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
      {...props}
    >
      {children}
    </Component>
  );
};

const BreadcrumbItem = ({ children, isCurrentPage }) => {
  return (
    <li className="inline-flex items-center">
      {!isCurrentPage && (
        <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
      )}
      {children}
    </li>
  );
};

const Breadcrumb = ({ children, ...props }) => {
  return (
    <nav {...props}>
      <ol className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
        {children}
      </ol>
    </nav>
  );
};

// Badge component for status indicators
const Badge = ({ children, variant = "default" }) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

// The enhanced ServicePageHeader component
const ServicePageHeader = ({ onAddCategory }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="space-y-6">
      {/* Main header section with glass morphism effect */}
      <header
        className="p-6 mt-14 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300"
        aria-labelledby="page-heading"
      >
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div>
            {/* Page Title with visual hierarchy */}
            <h1
              id="page-heading"
              className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight"
            >
              Service Management
            </h1>
            
            {/* Improved Breadcrumb with proper spacing */}
            <Breadcrumb aria-label="breadcrumb navigation" className="mt-1">
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink aria-current="page">Service Management</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          
          {/* Action buttons with better visual hierarchy */}
          <div className="flex items-center space-x-3">
            <Tooltip content="Filter services">
              <Button 
                variant="ghost" 
                aria-label="Filter services"
                className="text-gray-500 dark:text-gray-400"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </Tooltip>
            
            <Tooltip content="View recent changes">
              <Button 
                variant="ghost" 
                aria-label="View recent changes"
                className="text-gray-500 dark:text-gray-400"
              >
                <Clock className="h-4 w-4" />
              </Button>
            </Tooltip>
            
            <Tooltip content="Service settings">
              <Button 
                variant="ghost" 
                aria-label="Service settings"
                className="text-gray-500 dark:text-gray-400"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </Tooltip>
            
            <Tooltip content="Create a new service category">
              <Button
                onClick={onAddCategory}
                variant="primary"
                className="ml-2"
                aria-label="Add new service category"
              >
                <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Add Category</span>
              </Button>
            </Tooltip>
          </div>
        </div>
        
        {/* Secondary row with search and summary */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-64 md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <Badge variant="success">10 Active</Badge>
            <Badge variant="warning">3 Pending</Badge>
            <Badge variant="danger">1 Issue</Badge>
          </div>
        </div>
      </header>
    </div>
  );
};

export default ServicePageHeader;