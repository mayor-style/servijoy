import { motion } from "framer-motion";

const FAQHero = () => {
  return (
    <section className="gradient-black relative py-24 px-6 pt-36 text-center text-white">
      <div className="absolute inset-0 bg-black/60"></div>
     <div className="relative">
     <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="header text-white"
      >
        Frequently Asked Questions
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="subheader max-w-2xl mx-auto mt-3"
      >
        Have questions? We’ve got answers! Find everything you need to know about ServiJoy below.
      </motion.p>
     </div>
    </section>
  );
};

export default FAQHero;
