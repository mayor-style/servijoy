import React, { useState, useEffect } from "react";
import CalendarHeader from "./components/BookingCalendarSections/CalendarHeader";
import CalendarGrid from "./components/BookingCalendarSections/CalendarGrid";
import BookingDetailsModal from "./components/BookingCalendarSections/BookingDetailsModal";
import NewScheduleModal from "./components/BookingCalendarSections/NewScheduleModal";

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

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCalendarDays(generateCalendarDays(year, month));
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
    <div className="min-h-screen  dark:bg-gray-900 px-0 py-4 sm:py-6 md:py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <CalendarHeader
          currentDate={currentDate}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 btn-green hover:bg-green text-white rounded-md shadow-xl mb-6 transition-all"
        >
          Add New Schedule
        </button>
        <CalendarGrid
          calendarDays={calendarDays}
          events={events}
          onSelectEvent={handleSelectEvent}
        />
      </div>
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
    </div>
  );
};

export default BookingCalendar;
