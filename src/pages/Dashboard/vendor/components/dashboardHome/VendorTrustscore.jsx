// File: components/vendor/bookingDashboard/VendorTrustScore.jsx
import React from "react";
import { FaStar, FaRegStar, FaChartLine, FaCommentDots } from "react-icons/fa";

const VendorTrustScore = () => {
  return (
    <div className="bg-gradient-to-br from-green to-blue-600 dark:from-green-700 dark:to-blue-800 text-gray-900 dark:text-white p-6 sm:p-8 rounded-2xl shadow-2xl transition-transform duration-300">
      <h2 className="text-xl xs:text-2xl font-header sm:text-3xl font-bold mb-6 flex items-center gap-2">
        🌟 Trust Score & Ratings
      </h2>

      {/* Trust Score Display */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white/20 dark:bg-white/25 p-4 rounded-xl mb-6 border border-transparent dark:border-gray-700">
        <div className="flex items-center gap-3">
          <FaChartLine className="text-3xl sm:text-4xl" />
          <div>
            <p className="text-sm sm:text-base uppercase tracking-wide">Trust Score</p>
            <h3 className="text-2xl sm:text-3xl font-bold">94%</h3>
          </div>
        </div>
        <div className="w-24 sm:w-32 bg-white/30 h-2 rounded-full overflow-hidden mt-4 sm:mt-0">
          <div className="bg-white h-full" style={{ width: "94%" }}></div>
        </div>
      </div>

      {/* Ratings Breakdown */}
      <div className="bg-white/20 dark:bg-white/25 p-4 rounded-xl mb-6 border border-transparent dark:border-gray-700">
        <h4 className="text-lg sm:text-xl font-semibold mb-2">⭐ Ratings Overview</h4>
        <div className="flex items-center gap-2 text-yellow-300">
          <FaStar className="text-xl sm:text-2xl" />
          <FaStar className="text-xl sm:text-2xl" />
          <FaStar className="text-xl sm:text-2xl" />
          <FaStar className="text-xl sm:text-2xl" />
          <FaRegStar className="text-xl sm:text-2xl" />
          <p className="ml-2 text-sm sm:text-base">(4.2/5)</p>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white/20 dark:bg-white/25 p-4 rounded-xl border border-transparent dark:border-gray-700">
        <h4 className="text-lg sm:text-xl font-semibold mb-2">💬 Recent Feedback</h4>
        <p className="text-sm sm:text-base flex items-center gap-2">
          <FaCommentDots className="text-xl sm:text-2xl" />
          "Great service! Vendor was very professional."
        </p>
      </div>
    </div>
  );
};

export default VendorTrustScore;
