import React from 'react';
import { FaShieldAlt, FaBolt, FaThumbsUp, FaUserCheck } from "react-icons/fa";

const WhyChooseUs = () => {
  const benefits = [
    { 
      icon: <FaShieldAlt className="text-4xl" />, 
      title: "Trusted & Verified", 
      desc: "Every professional is thoroughly vetted to ensure safety and reliability.",
      color: "from-emerald-500 to-teal-600"
    },
    { 
      icon: <FaBolt className="text-4xl" />, 
      title: "Fast & Seamless", 
      desc: "Get matched instantly with top-rated professionals near you.",
      color: "from-sky-500 to-blue-600" 
    },
    { 
      icon: <FaThumbsUp className="text-4xl" />, 
      title: "Quality Assurance", 
      desc: "We prioritize customer satisfaction with reliable service guarantees.",
      color: "from-amber-500 to-orange-600"
    },
    { 
      icon: <FaUserCheck className="text-4xl" />, 
      title: "Secure Payments", 
      desc: "Your transactions are protected with escrow, ensuring peace of mind.",
      color: "from-violet-500 to-purple-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading with improved typography */}
        <div className="text-center mb-16">
          <div className="inline-block mb-2 px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
            Our Promise
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">ServiJoy</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted platform for reliable and professional services.
          </p>
        </div>

        {/* Benefits Grid with improved cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Card Background with gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Card Content */}
              <div className="relative p-8 text-center h-full flex flex-col">
                {/* Icon with animation */}
                <div className="bg-white/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/90 text-sm flex-grow">{benefit.desc}</p>
                
                {/* Subtle arrow indicator */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action with improved button */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Start Booking Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          {/* Added trust indicator */}
          <p className="mt-4 text-gray-500 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100% Satisfaction Guarantee</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;