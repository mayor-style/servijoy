const ActivitySummaryCards = ({ data }) => {
  const cards = [
    { label: "Total Signups", value: data.totalSignups },
    { label: "Service Requests", value: data.serviceRequests },
    { label: "Vendor Responses", value: data.vendorResponses },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-6 bg-soft-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition"
        >
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            {card.label}
          </h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ActivitySummaryCards;
