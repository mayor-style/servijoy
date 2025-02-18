import React, { useState, useEffect, useCallback } from "react"; 
import BookingFilters from "./components/BookingRequestSections/BookingFilters";
import BookingRequestsList from "./components/BookingRequestSections/BookingRequestsList";

const BookingRequestsPage = () => {
  // Sample booking data
  const initialBookings = [
    {
      id: 1,
      customer: { name: "John Doe" },
      service: "Home Cleaning",
      date: "2025-02-15",
      price: 50,
      status: "pending",
    },
    {
      id: 2,
      customer: { name: "Alice Smith" },
      service: "Plumbing Repair",
      date: "2025-02-18",
      price: 75,
      status: "accepted",
    },
    {
      id: 3,
      customer: { name: "Michael Johnson" },
      service: "AC Servicing",
      date: "2025-02-20",
      price: 60,
      status: "rejected",
    },
  ];

  const [bookings, setBookings] = useState(initialBookings);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    dateRange: { start: "", end: "" },
  });
  const [filteredBookings, setFilteredBookings] = useState(initialBookings);

  useEffect(() => {
    const filtered = bookings.filter((booking) => {
      // Status filter
      const statusMatch =
        filters.status === "all" ||
        booking.status.toLowerCase() === filters.status;
      // Search filter: match in customer name or service
      const searchMatch =
        booking.customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        booking.service.toLowerCase().includes(filters.search.toLowerCase());
      // Date Range filter
      let dateMatch = true;
      if (filters.dateRange.start) {
        dateMatch = new Date(booking.date) >= new Date(filters.dateRange.start);
      }
      if (filters.dateRange.end) {
        dateMatch = dateMatch && new Date(booking.date) <= new Date(filters.dateRange.end);
      }
      return statusMatch && searchMatch && dateMatch;
    });
    setFilteredBookings(filtered);
  }, [filters, bookings]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleUpdateBookingStatus = (id, action, reason) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: action, rejectionReason: reason } : booking
      )
    );
  };

  return (
    <div className="p-4 sm:py-6 px-0 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-header font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Manage Booking Requests
        </h1>
        <div className="overflow-x-auto">
          <BookingFilters onFilterChange={handleFilterChange} />
          <BookingRequestsList
            bookings={filteredBookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingRequestsPage;
