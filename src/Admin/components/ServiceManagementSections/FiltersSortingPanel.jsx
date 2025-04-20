import React, { useState, useId } from "react";
import { format } from "date-fns";
import { 
  Filter, 
  CalendarIcon, 
  ArrowDownAZ, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  X,
  RefreshCw,
  Check,
  Search,
  SlidersHorizontal
} from "lucide-react";

// Utility function to concatenate class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Enhanced Calendar with better styling and animations
const Calendar = ({ mode, selected, onSelect, disabled, initialFocus }) => {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());
  
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();
  
  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const isSelected = (date) => {
    if (!selected || !date) return false;
    return date.getDate() === selected.getDate() && 
           date.getMonth() === selected.getMonth() && 
           date.getFullYear() === selected.getFullYear();
  };
  
  const isDisabled = (date) => {
    if (!date || !disabled) return false;
    return disabled(date);
  };
  
  return (
    <div className="p-4 select-none">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth} 
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="text-sm font-medium">{format(currentMonth, "MMMM yyyy")}</h2>
        <button 
          onClick={nextMonth} 
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-xs font-medium text-gray-500 dark:text-gray-400 py-1">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((date, index) => (
          <div key={index} className="p-1">
            {date ? (
              <button
                onClick={() => !isDisabled(date) && onSelect(date)}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors",
                  isSelected(date) && "bg-blue-600 text-white",
                  isDisabled(date) && "text-gray-300 dark:text-gray-600 cursor-not-allowed",
                  !isSelected(date) && !isDisabled(date) && "hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
                disabled={isDisabled(date)}
              >
                {date.getDate()}
              </button>
            ) : (
              <span className="w-8 h-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Popover Components with smooth animations
const PopoverContext = React.createContext({});

const Popover = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block w-full">{children}</div>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = ({ asChild, children }) => {
  const { setOpen, open } = React.useContext(PopoverContext);
  const child = React.Children.only(children);
  
  if (asChild) {
    return React.cloneElement(child, {
      onClick: (e) => {
        e.preventDefault();
        setOpen(!open);
        if (child.props.onClick) child.props.onClick(e);
      },
      "aria-expanded": open,
      "aria-haspopup": "dialog"
    });
  }
  
  return (
    <button 
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-haspopup="dialog"
    >
      {children}
    </button>
  );
};

const PopoverContent = ({ children, className, align = "center" }) => {
  const { open } = React.useContext(PopoverContext);
  
  if (!open) return null;
  
  return (
    <div 
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg",
        align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2",
        "top-full mt-2",
        className
      )}
      role="dialog"
    >
      <div>{children}</div>
    </div>
  );
};

// Enhanced Button implementation
const Button = ({ 
  children, 
  onClick, 
  variant = "default", 
  size = "default",
  className, 
  type = "button",
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    outline: "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
  };
  
  const sizeStyles = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-4 py-2",
    lg: "h-12 px-5 py-2.5 text-base"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced Select Components with animations
const SelectContext = React.createContext({});

const Select = ({ children, onValueChange, defaultValue }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  
  const handleSelect = (newValue) => {
    setValue(newValue);
    onValueChange(newValue);
    setOpen(false);
  };
  
  return (
    <SelectContext.Provider value={{ open, setOpen, value, handleSelect }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = ({ children, id, className }) => {
  const { open, setOpen, value } = React.useContext(SelectContext);
  
  return (
    <button
      id={id}
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm",
        "hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200",
        className
      )}
      aria-haspopup="listbox"
      aria-expanded={open}
    >
      {children}
      <ChevronDown className={cn(
        "h-4 w-4 opacity-70 transition-transform duration-200",
        open && "transform rotate-180"
      )} />
    </button>
  );
};

const SelectValue = ({ placeholder }) => {
  const { value } = React.useContext(SelectContext);
  return (
    <span className={cn(
      "truncate",
      !value && "text-gray-500 dark:text-gray-400"
    )}>
      {value || placeholder}
    </span>
  );
};

const SelectContent = ({ children }) => {
  const { open } = React.useContext(SelectContext);
  
  if (!open) return null;
  
  return (
    <div 
      className="absolute z-50 w-full min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-1 shadow-lg mt-1"
      role="listbox"
    >
      <ul className="py-1 max-h-60 overflow-auto">{children}</ul>
    </div>
  );
};

const SelectItem = ({ children, value }) => {
  const { handleSelect, value: selectedValue } = React.useContext(SelectContext);
  
  return (
    <li>
      <button
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none transition-colors",
          value === selectedValue 
            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        )}
        onClick={() => handleSelect(value)}
        role="option"
        aria-selected={value === selectedValue}
      >
        <span className={cn(
          "absolute left-2 flex h-3.5 w-3.5 items-center justify-center opacity-0 transition-opacity",
          value === selectedValue && "opacity-100"
        )}>
          <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </span>
        <span className={value === selectedValue ? "pl-6" : "pl-6"}>
          {children}
        </span>
      </button>
    </li>
  );
};

// Enhanced Form Components
const FormContext = React.createContext({});

const Form = ({ children, ...props }) => {
  return <FormContext.Provider value={props}>{children}</FormContext.Provider>;
};

const FormItem = ({ children, className }) => {
  return <div className={cn("space-y-2", className)}>{children}</div>;
};

const FormLabel = ({ children, htmlFor }) => {
  return (
    <label 
      htmlFor={htmlFor}
      className="text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {children}
    </label>
  );
};

const FormControl = ({ children }) => {
  return <div className="mt-1">{children}</div>;
};

const FormField = ({ name, render, control }) => {
  const field = {
    onChange: (value) => {
      if (control && control.onChange) {
        control.onChange({ target: { name, value } });
      }
    },
    value: control?.values?.[name] || "",
  };
  
  return render({ field });
};

// Enhanced Custom Hook Form Implementation
const useForm = ({ defaultValues }) => {
  const [values, setValues] = useState(defaultValues);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    callback(values);
  };
  
  const reset = () => {
    setValues(defaultValues);
  };
  
  const watch = (name) => values[name];
  
  return {
    control: { onChange: handleChange, values },
    handleSubmit,
    reset,
    watch
  };
};

// Badge component for indicating active filters
const Badge = ({ children, variant = "default", onClear }) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  };
  
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      variantClasses[variant]
    )}>
      {children}
      {onClear && (
        <button 
          onClick={onClear}
          className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Clear filter"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

// Main enhanced component
const FiltersSortingPanel = ({ onFilterChange, categories = [], statuses = [] }) => {
  // Generate unique IDs for accessibility
  const statusId = useId();
  const categoryId = useId();
  const dateFromId = useId();
  const dateToId = useId();
  const sortById = useId();
  
  // Track panel expanded state
  const [isExpanded, setIsExpanded] = useState(false);
  // Track active filters count for the badge
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  // Default values with proper data structure
  const defaultValues = {
    status: "",
    category: "",
    dateFrom: undefined,
    dateTo: undefined,
    sortBy: "",
  };

  // Use our custom hook form implementation
  const form = useForm({ defaultValues });
  
  // Predefined options
  const statusOptions = statuses.length > 0 ? statuses : [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "declined", label: "Declined" }
  ];
  
  const categoryOptions = categories.length > 0 ? categories : [
    { value: "cleaning", label: "Cleaning" },
    { value: "plumbing", label: "Plumbing" },
    { value: "electrical", label: "Electrical" }
  ];
  
  const sortOptions = [
    { value: "date", label: "Date (Newest First)" },
    { value: "date-asc", label: "Date (Oldest First)" },
    { value: "status", label: "Status (A-Z)" },
    { value: "serviceName", label: "Service Name (A-Z)" }
  ];

  // Handle form submission
  const onSubmit = (data) => {
    // Count active filters
    let count = 0;
    Object.entries(data).forEach(([key, value]) => {
      if (value && key !== 'sortBy') count++;
    });
    setActiveFiltersCount(count);
    
    onFilterChange(data);
    
    // Auto-collapse panel after applying on mobile
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  // Reset form handler
  const handleReset = () => {
    form.reset();
    setActiveFiltersCount(0);
    onFilterChange(defaultValues);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all overflow-hidden">
      {/* Panel Header with toggle */}
      <div 
        className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h2 className="text-base font-medium text-gray-900 dark:text-white">
            Filters & Sorting
          </h2>
          {activeFiltersCount > 0 && (
            <Badge variant="blue">{activeFiltersCount} active</Badge>
          )}
        </div>
        <ChevronDown className={cn(
          "h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200",
          isExpanded && "transform rotate-180"
        )} />
      </div>
      
      {/* Collapsible Panel Content */}
      <div className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden",
        isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-4 sm:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Status Filter */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={statusId}>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id={statusId} className="w-full">
                            <SelectValue placeholder="All Statuses" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">All Statuses</SelectItem>
                          {statusOptions.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Category Filter */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={categoryId}>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id={categoryId} className="w-full">
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">All Categories</SelectItem>
                          {categoryOptions.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Date Range From */}
                <FormField
                  control={form.control}
                  name="dateFrom"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel htmlFor={dateFromId}>From Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              id={dateFromId}
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal justify-between",
                                !field.value && "text-gray-500 dark:text-gray-400"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "MMM d, yyyy")
                              ) : (
                                <span>From date</span>
                              )}
                              <CalendarIcon className="h-4 w-4 opacity-70" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => 
                              form.watch("dateTo") && date > form.watch("dateTo")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                {/* Date Range To */}
                <FormField
                  control={form.control}
                  name="dateTo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel htmlFor={dateToId}>To Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              id={dateToId}
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal justify-between",
                                !field.value && "text-gray-500 dark:text-gray-400"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "MMM d, yyyy")
                              ) : (
                                <span>To date</span>
                              )}
                              <CalendarIcon className="h-4 w-4 opacity-70" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => 
                              form.watch("dateFrom") && date < form.watch("dateFrom")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sort By */}
                <FormField
                  control={form.control}
                  name="sortBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={sortById}>Sort By</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id={sortById} className="w-full">
                            <SelectValue placeholder="Default Order" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Default Order</SelectItem>
                          {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <div className="flex items-end gap-3">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    aria-label="Apply filters and sorting"
                  >
                    <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
                    Apply Filters
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleReset}
                    aria-label="Reset all filters and sorting"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FiltersSortingPanel;