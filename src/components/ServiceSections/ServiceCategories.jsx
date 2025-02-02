import { motion } from "framer-motion";
import { FaBroom, FaTools, FaBolt, FaPaintRoller, FaTruckMoving, FaLeaf } from "react-icons/fa";

const services = [
  { id: 1, name: "Cleaning Services", icon: <FaBroom />, color: "bg-green" },
  { id: 2, name: "Plumbing & Repairs", icon: <FaTools />, color: "bg-blue-500" },
  { id: 3, name: "Electrical Work", icon: <FaBolt />, color: "bg-yellow-500" },
  { id: 4, name: "Painting Services", icon: <FaPaintRoller />, color: "bg-red-500" },
  { id: 5, name: "Moving Services", icon: <FaTruckMoving />, color: "bg-purple-500" },
  { id: 6, name: "Landscaping", icon: <FaLeaf />, color: "bg-green" },
];

const ServiceCategories = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="header text-black"
        >
          Explore Our Premium Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="subheader text-gray-600 max-w-xl mx-auto mt-2"
        >
          Professional and verified experts ready to assist you at any time.
        </motion.p>

        {/* Service Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl transition border border-gray-200 hover:shadow-2xl"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 flex items-center justify-center text-white text-2xl rounded-full ${service.color}`}
              >
                {service.icon}
              </div>
              {/* Service Name */}
              <h3 className="mt-4 font-semibold text-lg text-black">{service.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCategories;
