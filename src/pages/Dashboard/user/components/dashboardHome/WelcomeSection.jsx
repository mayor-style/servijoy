import { useAuth } from "../../../../../context/AuthContext";
import { FaSun, FaMoon, FaCloudSun } from "react-icons/fa";

const WelcomeSection = () => {
  const { user } = useAuth();

  // Determine greeting based on the current hour
  const currentHour = new Date().getHours();
  let greeting = "";
  let Icon = null;

  if (currentHour < 12) {
    greeting = "Good Morning";
    Icon = FaSun;
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
    Icon = FaCloudSun;
  } else {
    greeting = "Good Evening";
    Icon = FaMoon;
  }

  return (
    <div className="gradient dark:gradient-reverse text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-2xl transform transition duration-300 text-center md:text-left">
      {/* Greeting Icon */}
      <div className="p-4 bg-white bg-opacity-20 rounded-full">
        <Icon className="text-4xl" />
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-bold font-header">
          {greeting}, {user?.firstName || "User"}! 👋
        </h2>
        <p className="mt-2 text-base md:text-lg opacity-90">
          Welcome back! Ready to book or manage your services?
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;