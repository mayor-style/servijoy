import { motion } from "framer-motion";

const FAQCTA = () => {
  return (
    <section className="gradient py-20 px-6 text-center text-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="header text-white"
      >
        Need More Help?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="subheader max-w-2xl mx-auto mt-3"
      >
        Still have questions? Our support team is available 24/7 to assist you.
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-green mt-6"
      >
        Contact Support
      </motion.button>
    </section>
  );
};

export default FAQCTA;
