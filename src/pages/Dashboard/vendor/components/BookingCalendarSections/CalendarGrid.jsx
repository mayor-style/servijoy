import React from "react";
import BookingEvent from "./BookingEvent";

const CalendarGrid = ({ calendarDays, events, onSelectEvent }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-aut w-full">
      <div className="grid grid-cols-7 gap-2 sm:gap-3 min-w-[400px] sm:min-w-[600px]">
        {/* Weekday Headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-bold text-gray-800 dark:text-white border-b pb-2 text-xs sm:text-sm md:text-base"
          >
            {day}
          </div>
        ))}

        {/* Calendar Day Cells */}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`border rounded-lg p-2 h-16 sm:h-24 md:h-28 lg:h-32 transition-colors duration-300 flex flex-col justify-between ${
              day.isCurrentMonth
                ? "bg-white dark:bg-gray-900"
                : "bg-gray-100 dark:bg-gray-800"
            } hover:bg-gray-50 dark:hover:bg-gray-700`}
          >
            <div className="text-xs sm:text-sm md:text-base font-bold text-gray-800 dark:text-white">
              {day.dayNumber}
            </div>
            <div className="mt-1 sm:mt-2 space-y-1 overflow-hidden text-xs sm:text-sm">
              {events
                .filter((event) => {
                  const eventDate = new Date(event.date);
                  return (
                    eventDate.getFullYear() === day.date.getFullYear() &&
                    eventDate.getMonth() === day.date.getMonth() &&
                    eventDate.getDate() === day.date.getDate()
                  );
                })
                .map((event) => (
                  <BookingEvent
                    key={event.id}
                    event={event}
                    onSelect={() => onSelectEvent(event)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
