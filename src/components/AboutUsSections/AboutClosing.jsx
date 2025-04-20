import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import { ArrowRight, Star, Users, CheckCircle } from "lucide-react";
import Confetti from "react-confetti";

const AboutClosing = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [hoverButton, setHoverButton] = useState(null);
  
  // Stats for animation
  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "10,000+", label: "Happy Customers" },
    { icon: <Star className="w-6 h-6" />, value: "4.8/5", label: "Average Rating" },
    { icon: <CheckCircle className="w-6 h-6" />, value: "95%", label: "Satisfaction Rate" }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleGetStarted = () => {
    setShowConfetti(true);
    setTimeout(() => {
      navigate("/signup");
    }, 800);
  };

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } }
      }}
      className="w-full py-20 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        
        {/* Animated circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
                transform: `scale(${Math.random() + 0.5})`,
                animation: `float ${Math.random() * 10 + 15}s linear infinite`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading with animated reveal */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.7, ease: "easeOut" }
              }
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Transforming Services, 
              <span className="relative inline-block ml-2">
                Empowering Lives
                <motion.div 
                  className="absolute bottom-1 left-0 h-3 bg-green-400/30 w-full -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                ></motion.div>
              </span>
            </h2>
          </motion.div>

          {/* Subheader */}
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { delay: 0.3, duration: 0.7 }
              }
            }}
            className="text-lg md:text-xl text-gray-50 mt-6 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of satisfied users and professional vendors on ServiJoy.
            Quality, trust, and convenience—this is the future of service booking.
          </motion.p>

          {/* Animated Stats */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  staggerChildren: 0.2,
                  delayChildren: 0.6
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-white"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-white/20 p-3 rounded-full mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-gray-200">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { delay: 1, duration: 0.7 }
              }
            }}
            className="flex items-center flex-wrap justify-center gap-6 mt-12"
          >
            <motion.button
              onClick={handleGetStarted}
              onMouseEnter={() => setHoverButton("start")}
              onMouseLeave={() => setHoverButton(null)}
              className="relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-full group overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="relative z-10 flex items-center">
                Get Started 
                <motion.div
                  animate={hoverButton === "start" ? { x: [0, 5, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.div>
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700"
                initial={{ x: "100%" }}
                animate={hoverButton === "start" ? { x: 0 } : { x: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
            
            <motion.button
              onClick={() => navigate("/become-a-vendor")}
              onMouseEnter={() => setHoverButton("vendor")}
              onMouseLeave={() => setHoverButton(null)}
              className="relative px-8 py-4 bg-white text-blue-600 font-medium rounded-full group overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="relative z-10 flex items-center">
                Become a Vendor
                <motion.div
                  animate={hoverButton === "vendor" ? { x: [0, 5, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.div>
              </span>
              <motion.div 
                className="absolute inset-0 bg-blue-50"
                initial={{ x: "100%" }}
                animate={hoverButton === "vendor" ? { x: 0 } : { x: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { delay: 1.3, duration: 0.7 }
              }
            }}
            className="mt-16 bg-white/10 backdrop-blur-sm p-6 rounded-2xl max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-1 justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="italic text-gray-100">"ServiJoy completely transformed how I manage home services. The quality of professionals and ease of booking is unmatched!"</p>
            <div className="mt-4 font-medium text-gray-100">Sarah K. — Happy Customer</div>
          </motion.div>
        </div>
      </div>

      {/* CSS for the floating animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, 30px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        .bg-grid-white {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </motion.section>
  );
};

export default AboutClosing;