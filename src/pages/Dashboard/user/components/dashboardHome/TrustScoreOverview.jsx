import { useContext } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { FaStar, FaRegStar, FaArrowUp } from "react-icons/fa";

const TrustScoreOverview = () => {
  const { user } = useAuth();
  
  const trustScore = 78;
  const rating = 4.5;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl transform transition duration-300 hover:shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg sm:max-w-xl">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full shadow-lg">
          <FaStar className="text-yellow-500 dark:text-yellow-300 text-2xl md:text-3xl" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white font-header">Trust & Ratings</h3>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Your reliability score on ServiJoy</p>
        </div>
      </div>
      
      <div className="mt-6 md:mt-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">{trustScore}/100</h2>
        <p className="mt-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">Your current trust level</p>
        <div className="relative w-full h-2 md:h-3 bg-gray-300 dark:bg-gray-700 rounded-full mt-3 md:mt-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500" style={{ width: `${trustScore}%` }}></div>
        </div>
      </div>
      
      <div className="mt-4 md:mt-6 flex items-center gap-2 md:gap-3">
        <span className="text-yellow-500 text-lg md:text-xl font-bold">{rating.toFixed(1)}</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) =>
            i < Math.floor(rating) ? (
              <FaStar key={i} className="text-yellow-500 text-lg md:text-xl" />
            ) : (
              <FaRegStar key={i} className="text-gray-400 text-lg md:text-xl" />
            )
          )}
        </div>
        <span className="text-xs md:text-sm text-gray-500">(Based on past reviews)</span>
      </div>
      
      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 dark:border-blue-600 rounded-md flex items-center gap-2 md:gap-4">
        <FaArrowUp className="text-blue-500 dark:text-blue-300 text-lg md:text-xl" />
        <p className="text-xs md:text-sm text-gray-700 dark:text-gray-200">
          Keep completing bookings on time & getting good reviews to boost your score!
        </p>
      </div>
    </div>
  );
};

export default TrustScoreOverview;

