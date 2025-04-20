import { useState, useEffect } from "react";
import { Calendar, Clock, ChevronRight, Loader2 } from "lucide-react";

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
            category: "meeting"
          },
          {
            id: 2,
            title: "Server Maintenance",
            date: "2025-02-28",
            time: "11:30 PM",
            category: "maintenance"
          },
          {
            id: 3,
            title: "New Feature Deployment",
            date: "2025-03-05",
            time: "2:00 PM",
            category: "deployment"
          },
        ]);
        setLoading(false);
      }, 2000);
    };
    fetchEvents();
  }, []);

  // Format date to be more human-readable
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get category color based on event type
  const getCategoryStyles = (category) => {
    switch (category) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'deployment':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Upcoming Events</h2>
        </div>
        <div className="p-6 flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading your upcoming events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden transition">
      <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Upcoming Events</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
          View all
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      
      {events.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">No upcoming events</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {events.map((event) => (
            <li
              key={event.id}
              className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              <div className="p-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-12 rounded-full ${
                      event.category === 'meeting' ? 'bg-blue-500' :
                      event.category === 'maintenance' ? 'bg-amber-500' :
                      'bg-green-500'
                    }`}></div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {event.title}
                      </h3>
                      <div className="mt-1 flex items-center space-x-4">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryStyles(event.category)}`}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                    <button className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingEvents;