import React from "react";

export const Skeleton = ({ className = "" }) => {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} />
  );
};
