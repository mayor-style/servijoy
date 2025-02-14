// File: components/notifications/NotificationsList.jsx
import React from "react";
import NotificationCard from "./NotificationCard";

const NotificationsList = ({ notifications, onMarkRead }) => {
  return (
    <div className="p-4">
      {notifications.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-center text-lg text-gray-500 dark:text-gray-300">
            No notifications to show.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkRead={onMarkRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
