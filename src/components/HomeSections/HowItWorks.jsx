import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCalendarAlt, FaSmileBeam, FaHandsHelping } from "react-icons/fa";

const howItWorkData = [
  {
    index: 1,
    title: "Describe your needs.",
    desc: "Describe the kind of service you need and get linked with the best professional.",
    icon: <FaCalendarAlt className="text-4xl" />,
  },
  {
    index: 2,
    title: "Get matched instantly.",
    desc: "Get matched with the best Professionals around you with our sleek matching algorithm.",
    icon: <FaHandsHelping className="text-4xl" />,
  },
  {
    index: 3,
    title: "Hire and complete your task.",
    desc: "Get in contact with your Professional and schedule a time to get the task done.",
    icon: <FaSmileBeam className="text-4xl" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="header text-black mb-4">
          How <span className="text-gradient">ServiJoy</span> Works
        </h2>
        <p className="subheader text-gray-600 mb-10">
          Three Simple steps to book a service.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {howItWorkData.map((data, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true, // Runs only once
              threshold: 0.5, // Ensures smooth visibility before animation
            });

            return (
              <motion.div
                key={data.index}
                ref={ref}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7, // Slower transition for premium feel
                  ease: "easeOut",
                  delay: index * 0.4, // Staggered entrance per card
                }}
              >
                <div
                  className={`px-8 py-6 flex justify-center items-center ${
                    data.index === 2 ? "gradient" : "bg-green"
                  } mb-4 rounded-tl-3xl rounded-br-3xl text-white shadow-lg`}
                >
                  {data.icon}
                </div>
                <h3 className="mb-2 font-semibold xs:text-xl text-lg">
                  {data.title}
                </h3>
                <p className="text-gray-700">{data.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
