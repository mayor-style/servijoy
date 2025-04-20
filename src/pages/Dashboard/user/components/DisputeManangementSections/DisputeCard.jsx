import React from 'react'
import {
  FaExclamationCircle,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
} from 'react-icons/fa'

const STATUS_CONFIG = {
  pending: {
    icon: <FaExclamationCircle className="mr-2" />,
    color: 'bg-amber-100 text-amber-800',
    label: 'Pending',
  },
  evidence_submitted: {
    icon: <FaSpinner className="mr-2 animate-spin" />,
    color: 'bg-blue-100 text-blue-800',
    label: 'Evidence Submitted',
  },
  resolved: {
    icon: <FaCheckCircle className="mr-2" />,
    color: 'bg-green-100 text-green-800',
    label: 'Resolved',
  },
  rejected: {
    icon: <FaTimesCircle className="mr-2" />,
    color: 'bg-red-100 text-red-800',
    label: 'Rejected',
  },
}

const DisputeCard = ({ dispute, onViewDetails }) => {
  const statusConfig = STATUS_CONFIG[dispute.status] || STATUS_CONFIG.pending

  // Format date if it's a valid date string
  const formattedDate = (() => {
    try {
      const date = new Date(dispute.date)
      return date instanceof Date && !isNaN(date)
        ? date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : dispute.date
    } catch (e) {
      return dispute.date
    }
  })()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2">
            {dispute.subject}
          </h3>
          <span
            className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
          >
            {statusConfig.icon}
            {statusConfig.label}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <span className="font-medium mr-2">Reference:</span>
            <span className="font-mono">{dispute.reference}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2">Submitted:</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        {dispute.description && (
          <p className="mt-4 text-gray-700 dark:text-gray-300 line-clamp-2">
            {dispute.description}
          </p>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onViewDetails(dispute)}
          className="w-full py-3 px-6 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
        >
          View Details
          <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

export default DisputeCard
