import React, { useRef } from "react";
import { FaMoneyBillWave, FaUsers, FaLock, FaTools } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import vendorImg from "../../assets/imgs/plumbing (2).jpg"; // Replace with a high-quality image

const BecomeAVendor = () => {


  const benefits = [
    {
      icon: <FaMoneyBillWave className="text-4xl text-white" />,
      title: "Earn More Money",
      desc: "Expand your client base and boost your income with every completed service.",
    },
    {
      icon: <FaUsers className="text-4xl text-white" />,
      title: "Join a Growing Network",
      desc: "Get discovered by thousands of users actively looking for skilled professionals.",
    },
    {
      icon: <FaLock className="text-4xl text-white" />,
      title: "Secure Payments",
      desc: "We ensure timely and protected payments through our trusted escrow system.",
    },
    {
      icon: <FaTools className="text-4xl text-white" />,
      title: "Easy Management",
      desc: "Our intuitive dashboard lets you manage bookings, track earnings, and more.",
    },
  ];

  const { ref, inView } = useInView({
                triggerOnce: true, // Runs only once
                 // Ensures smooth visibility before animation
              });
  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
        {/* Left Side - Image */}
        <motion.div
          className="w-full lg:w-1/2"
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay:0.5, ease: "easeOut" }}
        >
          <img
            src={vendorImg}
            alt="Become a Vendor"
            className="w-full h-auto rounded-3xl shadow-lg"
          />
        </motion.div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 text-center md:text-left">
          <motion.h2
            className="header text-black mb-4"
            initial={{ opacity: 0, y: -30 }}
            ref={ref}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Become a <span className="text-gradient">ServiJoy Vendor</span>
          </motion.h2>
          <motion.p
            className="subheader text-gray-600 mb-6"
            initial={{ opacity: 0, y: -40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            ref={ref}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            Get paid for your skills and connect with customers effortlessly.
          </motion.p>

          {/* Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const { ref, inView } = useInView({
                triggerOnce: true, // Runs only once
                threshold: 0.5, // Ensures smooth visibility before animation
              });
             return( <motion.div
                key={index}
                ref={ref}
                className="p-6 flex items-center gap-4 full shadow-lg rounded-xl bg-green text-white cursor-pointer"
                initial={{ opacity: 0, scale:0.5 }}
                animate={ { opacity:inView ? 1: 0, scale:inView ?1: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: inView ? 0 : index * 0.4, // Delay only before the element is in view
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.03,
                  // No delay on hover, smooth transition
                  transition: { duration: 0.3 },
                }}
              >
                <div>{benefit.icon}</div>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm">{benefit.desc}</p>
                </div>
              </motion.div>
            );
          })}
          </div>

          {/* Call to Action */}
          <motion.div
            className="mt-8 "
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            ref={ref}
            transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          >
            <button className="btn-blue">
              Join as a Vendor
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BecomeAVendor;
