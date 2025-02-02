import { motion } from "framer-motion";
import sampleImg from '../../assets/imgs/hero.jpg'

const featuredServices = [
  { id: 1, name: "Deep Home Cleaning", img: "/images/cleaning.jpg" },
  { id: 2, name: "24/7 Plumbing Support", img: "/images/plumbing.jpg" },
  { id: 3, name: "Emergency Electrical Repairs", img: "/images/electrical.jpg" },
];

const FeaturedServices = () => {
  return (
    <section className="py-16 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="header text-black"
        >
          Featured Premium Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="subheader text-gray-600 max-w-xl mx-auto mt-2"
        >
          Our most in-demand services, trusted by thousands of happy customers.
        </motion.p>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10"
        >
          {featuredServices.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group overflow-hidden rounded-xl shadow-lg transition-all"
            >
              {/* Background Image */}
              <div
                className="w-full h-64 bg-cover bg-center bg-hero"
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all"></div>

              {/* Service Name */}
              <h3 className="absolute bottom-5 left-5 text-white text-xl font-semibold transition-all group-hover:scale-110">
                {service.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
