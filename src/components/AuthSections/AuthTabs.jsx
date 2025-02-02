import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* 🔥 Tab Navigation */}
      <div className="flex justify-between border-b pb-2">
        <button
          className={`w-1/2 py-2 font-medium text-lg transition ${
            activeTab === "login" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`w-1/2 py-2 font-medium text-lg transition ${
            activeTab === "signup" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </button>
      </div>

      {/* 🔥 Tab Content */}
      <div className="mt-6">
        {activeTab === "login" ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default AuthTabs;
