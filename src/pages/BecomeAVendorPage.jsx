import { FaUserShield, FaMoneyBillWave, FaBriefcase, FaCheckCircle, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const benefits = [
  { id: 1, title: "Earn More Income", icon: <FaMoneyBillWave />, desc: "Get paid for your skills and services on a reliable platform." },
  { id: 2, title: "Secure & Trusted", icon: <FaUserShield />, desc: "Verified vendors and secure transactions for peace of mind." },
  { id: 3, title: "Flexible Work", icon: <FaBriefcase />, desc: "Work on your own schedule and accept jobs that suit you." },
  { id: 4, title: "Instant Payments", icon: <FaCheckCircle />, desc: "Receive payments instantly after job completion." },
];

const steps = [
  { id: 1, title: "Sign Up", desc: "Create your vendor account in just a few clicks.", icon: <FaUserPlus /> },
  { id: 2, title: "Get Verified", desc: "Submit required documents to verify your identity.", icon: <FaUserShield /> },
  { id: 3, title: "List Your Services", desc: "Set up your profile and showcase your expertise.", icon: <FaBriefcase /> },
  { id: 4, title: "Start Earning", desc: "Accept jobs, complete them, and receive payments instantly.", icon: <FaMoneyBillWave /> },
];

const BecomeAVendorPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="gradient py-24 px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="header text-white"
        >
          Become a Vendor on **ServiJoy**
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="subheader max-w-2xl mx-auto mt-3"
        >
          **Join a community of trusted professionals and grow your business with ServiJoy.** Start earning today!
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-green mt-6"
        >
          Get Started
        </motion.button>
      </section>

      {/* Why Become a Vendor Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="header"
          >
            **Why Become a ServiJoy Vendor?**
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center transition-all"
              >
                <div className="text-4xl text-green mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-black">{benefit.title}</h3>
                <p className="text-gray-600 mt-2">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="header"
          >
            **How It Works**
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center transition-all"
              >
                <div className="text-4xl text-blue-500 mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-black">{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient py-20 px-6 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="header text-white"
        >
          **Ready to Get Started?**
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="subheader max-w-2xl mx-auto mt-3"
        >
          **Join thousands of vendors making money on ServiJoy today!**
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-green mt-6"
        >
          Become a Vendor Now
        </motion.button>
      </section>
    </div>
  );
};

export default BecomeAVendorPage;
