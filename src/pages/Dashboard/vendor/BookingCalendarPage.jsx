import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import CalendarHeader from "./components/BookingCalendarSections/CalendarHeader";
import CalendarGrid from "./components/BookingCalendarSections/CalendarGrid";
import BookingDetailsModal from "./components/BookingCalendarSections/BookingDetailsModal";
import NewScheduleModal from "./components/BookingCalendarSections/NewScheduleModal";
import LoadingSpinner from "./components/BookingCalendarSections/LoadingSpinner";
import EmptyState from "./components/BookingCalendarSections/EmptyState";

// Sample dummy data for development testing
const dummyEvents = [
  {
    id: 1,
    title: "Home Cleaning - John",
    service: "Premium House Cleaning",
    client: "John Smith",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 10, 0).toISOString(),
    details: "Complete house cleaning with special attention to kitchen and bathrooms."
  },
  {
    id: 2,
    title: "Office Cleaning - TechCorp",
    service: "Office Cleaning Service",
    client: "TechCorp Inc.",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 17, 14, 30).toISOString(),
    details: "Weekly office cleaning including waste disposal and surface sanitization."
  },
  {
    id: 3,
    title: "Window Cleaning - Sarah",
    service: "Window Cleaning",
    client: "Sarah Johnson",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 9, 0).toISOString(),
    details: "Complete window cleaning for two-story home."
  }
];

const generateCalendarDays = (year, month) => {
  const days = [];
  const firstDay = new Date(year, month, 1);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const dayNumber = daysInPrevMonth - i;
    const date = new Date(year, month - 1, dayNumber);
    days.push({ date, dayNumber, isCurrentMonth: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({ date, dayNumber: i, isCurrentMonth: true });
  }
  const totalCells = Math.ceil(days.length / 7) * 7;
  const nextDays = totalCells - days.length;
  for (let i = 1; i <= nextDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({ date, dayNumber: i, isCurrentMonth: false });
  }
  return days;
};

const BookingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // New state variables for enhanced UX
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("month"); // "month", "week", "day" options

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCalendarDays(generateCalendarDays(year, month));
    
    // Simulate loading data from API and load dummy events
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setEvents(dummyEvents);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedEvent(null);
    setIsDetailsModalOpen(false);
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header Section with Logo and Title */}
        <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="flex items-center gap-3">
            <FaCalendarAlt size={24} className="text-white" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Booking Calendar</h1>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="p-4 sm:p-6">
          <CalendarHeader
            currentDate={currentDate}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-3 bg-green/60 hover:bg-green/70 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center gap-2"
            >
              <span>Add New Schedule</span>
            </button>
          </div>

          {/* Calendar Content */}
          {isLoading ? (
            <LoadingSpinner />
          ) : events.length === 0 ? (
            <EmptyState onAddNew={() => setIsAddModalOpen(true)} />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 sm:p-4 md:p-6 mb-4">
              <CalendarGrid
                calendarDays={calendarDays}
                events={events}
                onSelectEvent={handleSelectEvent}
                viewMode={viewMode}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <BookingDetailsModal
        event={selectedEvent}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
      />
      <NewScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </motion.div>
  );
};

export default BookingCalendar;
