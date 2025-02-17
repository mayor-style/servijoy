import { useState, useEffect } from "react";

const UpcomingEvents = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setEvents([
          {
            id: 1,
            title: "Monthly Performance Review",
            date: "2025-02-25",
            time: "10:00 AM",
          },
          {
            id: 2,
            title: "Server Maintenance",
            date: "2025-02-28",
            time: "11:30 PM",
          },
          {
            id: 3,
            title: "New Feature Deployment",
            date: "2025-03-05",
            time: "2:00 PM",
          },
        ]);
        setLoading(false);
      }, 2000);
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="p-4 animate-pulse">
        <div className="h-24 bg-light-gray dark:bg-gray-700 rounded-md mb-4"></div>
        <div className="h-24 bg-light-gray dark:bg-gray-700 rounded-md mb-4"></div>
        <div className="h-24 bg-light-gray dark:bg-gray-700 rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-soft-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transition">
        <h2 className="header text-gray-800 dark:text-gray-300 mb-4">
          Upcoming Events & Reminders
        </h2>
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="bg-light-gray dark:bg-gray-700 p-4 rounded-md flex flex-col md:flex-row justify-between items-center transition hover:shadow-md"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {event.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {event.date} at {event.time}
                </p>
              </div>
              <button className="btn-blue mt-2 md:mt-0">
                View Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpcomingEvents;
