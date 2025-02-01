import React, { useState } from "react";
import { FaSearch, FaClipboardCheck, FaHandshake, FaSmile, FaUserCheck, FaBriefcase, FaTools, FaStar } from "react-icons/fa";

const userSteps = [
  {
    id: 1,
    icon: <FaSearch size={30} className="text-green" />,
    title: "Find the Right Service",
    description: "Browse through our verified professionals to find the perfect fit for your needs.",
  },
  {
    id: 2,
    icon: <FaClipboardCheck size={30} className="text-blue-500" />,
    title: "Book & Confirm",
    description: "Select your service, schedule a time, and confirm your booking with ease.",
  },
  {
    id: 3,
    icon: <FaHandshake size={30} className="text-green" />,
    title: "Service Execution",
    description: "Our vetted professionals deliver top-tier services to your doorstep or location.",
  },
  {
    id: 4,
    icon: <FaSmile size={30} className="text-blue-500" />,
    title: "Payment & Rating",
    description: "Securely pay and leave a review to help others choose quality services.",
  },
];

const vendorSteps = [
  {
    id: 1,
    icon: <FaUserCheck size={30} className="text-green" />,
    title: "Sign Up & Verify",
    description: "Register as a vendor and complete the verification process to start working.",
  },
  {
    id: 2,
    icon: <FaBriefcase size={30} className="text-blue-500" />,
    title: "Get Hired",
    description: "Accept job requests from users and manage bookings efficiently.",
  },
  {
    id: 3,
    icon: <FaTools size={30} className="text-green" />,
    title: "Complete the Job",
    description: "Deliver high-quality service to maintain a top-tier reputation.",
  },
  {
    id: 4,
    icon: <FaStar size={30} className="text-blue-500" />,
    title: "Get Paid & Reviewed",
    description: "Receive payments securely and build credibility with positive reviews.",
  },
];

const HowItWorkSteps = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <h2 className="header text-gradient">How It Works</h2>
        <p className="subheader text-gray-600 mt-2">
          Whether you're a user or a vendor, ServiJoy makes it easy to connect and get things done.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`btn-green ${activeTab === "users" ? "gradient text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setActiveTab("users")}
        >
          For Users
        </button>
        <button
          className={`btn-blue ${activeTab === "vendors" ? "gradient text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setActiveTab("vendors")}
        >
          For Vendors
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "users" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {userSteps.map((step) => (
              <div
                key={step.id}
                className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900">{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {vendorSteps.map((step) => (
              <div
                key={step.id}
                className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900">{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorkSteps;
