import React from 'react';
import { FaShieldAlt, FaBolt, FaThumbsUp, FaUserCheck } from "react-icons/fa";

const WhyChooseUs = () => {
  const benefits = [
    { icon: <FaShieldAlt className='text-3xl sm:text-4xl text-white' />, title: "Trusted & Verified", desc: "Every professional is thoroughly vetted to ensure safety and reliability." },
    { icon: <FaBolt className='text-3xl sm:text-4xl text-white' />, title: "Fast & Seamless", desc: "Get matched instantly with top-rated professionals near you." },
    { icon: <FaThumbsUp className='text-3xl sm:text-4xl text-white' />, title: "Quality Assurance", desc: "We prioritize customer satisfaction with reliable service guarantees." },
    { icon: <FaUserCheck className='text-3xl sm:text-4xl text-white' />, title: "Secure Payments", desc: "Your transactions are protected with escrow, ensuring peace of mind." }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className='header text-black mb-4'>Why Choose <span className="text-gradient">ServiJoy</span>?</h2>
        <p className="subheader text-gray-600 mb-10">
          Your trusted platform for reliable and professional services.
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 text-center shadow-lg rounded-2xl transition hover:shadow-2xl hover:scale-105 duration-300 bg-green text-white">
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold">{benefit.title}</h3>
              <p className="text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <button className="btn-blue">
            Start Booking Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
