import React, { useRef } from "react";
import { FaMoneyBillWave, FaUsers, FaLock, FaTools, FaArrowRight, FaRegCheckCircle } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import vendorImg from "../../assets/imgs/plumbing (2).webp";
import OptimizedImage from "../OptimizedImage";

const BecomeAVendor = () => {
  const benefits = [
    {
      icon: <FaMoneyBillWave className="text-3xl" />,
      title: "Earn More Money",
      desc: "Expand your client base and boost your income with every completed service.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Join a Growing Network",
      desc: "Get discovered by thousands of users actively looking for skilled professionals.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: <FaLock className="text-3xl" />,
      title: "Secure Payments",
      desc: "We ensure timely and protected payments through our trusted escrow system.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: <FaTools className="text-3xl" />,
      title: "Easy Management",
      desc: "Our intuitive dashboard lets you manage bookings, track earnings, and more.",
      color: "from-amber-500 to-orange-600"
    },
  ];

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const statsData = [
    { value: "5K+", label: "Active Vendors" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "$1.2M", label: "Monthly Payouts" }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Floating Shape Decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-100 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 opacity-30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header with Enhanced Typography */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-3 px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
            Partner With Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Become a <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">ServiJoy Vendor</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Turn your skills into a thriving business with our seamless platform
          </p>
        </motion.div>

        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          {/* Left Side - Content */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {/* Stats Banner */}
            <motion.div 
              className="hidden md:flex justify-between mb-10 p-6 bg-white rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {statsData.map((stat, index) => (
                <div key={index} className="text-center px-4">
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Benefits Cards - Enhanced */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const { ref, inView } = useInView({
                  triggerOnce: true,
                  threshold: 0.2,
                });
                
                return (
                  <motion.div
                    key={index}
                    ref={ref}
                    className="overflow-hidden rounded-xl shadow-lg group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  >
                    <div className={`h-full p-6 bg-gradient-to-br ${benefit.color} text-white relative`}>
                      {/* Decorative Circle */}
                      <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-white/10 rounded-full"></div>
                      
                      {/* Icon with improved presentation */}
                      <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        {benefit.icon}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-white/90 text-sm">{benefit.desc}</p>
                      
                      {/* Hidden arrow that appears on hover */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FaArrowRight className="text-white/70" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Call to Action - Enhanced */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 w-full sm:w-auto text-lg font-medium text-white bg-gradient-to-r from-emerald-600 to-blue-500 rounded-lg shadow-lg overflow-hidden">
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
                  <span className="relative flex items-center">
                    Join as a Vendor
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                {/* Added additional trust signal */}
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-600">
                    <FaRegCheckCircle className="text-emerald-500 mr-2" />
                    <span className="text-sm">Free to join, commission-based</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <FaRegCheckCircle className="text-emerald-500 mr-2" />
                    <span className="text-sm">Get started in under 5 minutes</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Image Presentation */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {/* Main Image with Aesthetic Enhancement */}
            <div className="relative">
              {/* Image Frame with Shadow and Border */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 animate-pulse" style={{ animationDuration: '4s' }}></div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white">
                <OptimizedImage 
                  src={vendorImg}
                  alt="Become a Vendor"
                  className="w-full h-auto object-cover"
                  rounded="rounded-3xl"
                />
                
                {/* Overlay Gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
              </div>
              
              {/* Floating Achievement Badges */}
              <motion.div 
                className="absolute -left-6 top-1/4 bg-white rounded-xl shadow-lg p-4 flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <FaUsers className="text-emerald-600 text-xl" />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">Fast Growth</div>
                  <div className="text-xs text-gray-500">30% month-over-month</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -right-6 bottom-1/4 bg-white rounded-xl shadow-lg p-4 flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaMoneyBillWave className="text-blue-600 text-xl" />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">Higher Earnings</div>
                  <div className="text-xs text-gray-500">Avg $2400/month</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BecomeAVendor;