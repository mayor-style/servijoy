import { FaBroom, FaPlug, FaTools, FaPaintRoller, FaTruck, FaWrench } from "react-icons/fa";
import { motion } from "framer-motion";

const servicesList = [
  { id: 1, name: "House Cleaning", icon: <FaBroom />, desc: "Professional cleaning for homes & offices." },
  { id: 2, name: "Electrical Repairs", icon: <FaPlug />, desc: "Certified electricians for all power issues." },
  { id: 3, name: "Plumbing Services", icon: <FaWrench />, desc: "Reliable plumbing solutions, anytime." },
  { id: 4, name: "Painting & Decoration", icon: <FaPaintRoller />, desc: "High-quality painting & home styling." },
  { id: 5, name: "Moving Services", icon: <FaTruck />, desc: "Fast & safe home and office relocations." },
  { id: 6, name: "Handyman Services", icon: <FaTools />, desc: "Skilled experts for all household fixes." },
];

const ServicesList = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="header text-black"
        >
          **All Services We Offer**
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="subheader text-gray-600 max-w-xl mx-auto mt-2"
        >
          Top-quality services provided by vetted professionals, ensuring **best-in-class results**.
        </motion.p>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10"
        >
          {servicesList.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center text-center transition-all"
            >
              {/* Service Icon */}
              <div className="text-4xl text-green mb-4">{service.icon}</div>

              {/* Service Name */}
              <h3 className="text-xl font-semibold text-black">{service.name}</h3>

              {/* Service Description */}
              <p className="text-gray-600 mt-2">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesList;
