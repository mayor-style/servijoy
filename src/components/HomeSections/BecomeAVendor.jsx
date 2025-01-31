import React from 'react';
import { FaMoneyBillWave, FaUsers, FaLock, FaTools } from "react-icons/fa";
import vendorImg from '../../assets/imgs/plumbing (2).jpg'; // Replace with a suitable image

const BecomeAVendor = () => {
  const benefits = [
    { icon: <FaMoneyBillWave className='text-4xl text-white' />, title: "Earn More Money", desc: "Expand your client base and boost your income with every completed service." },
    { icon: <FaUsers className='text-4xl text-white' />, title: "Join a Growing Network", desc: "Get discovered by thousands of users actively looking for skilled professionals." },
    { icon: <FaLock className='text-4xl text-white' />, title: "Secure Payments", desc: "We ensure timely and protected payments through our trusted escrow system." },
    { icon: <FaTools className='text-4xl text-white' />, title: "Easy Management", desc: "Our intuitive dashboard lets you manage bookings, track earnings, and more." }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
        
        {/* Left Side - Image */}
        <div className="w-full lg:w-1/2">
          <img src={vendorImg} alt="Become a Vendor" className="w-full h-auto rounded-3xl shadow-lg" />
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 text-center md:text-left">
          <h2 className="header text-black mb-4">Become a <span className="text-gradient">ServiJoy Vendor</span></h2>
          <p className="subheader text-gray-600 mb-6">
            Get paid for your skills and connect with customers effortlessly.
          </p>

          {/* Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 flex items-center gap-4 shadow-lg rounded-xl transition hover:shadow-2xl hover:scale-105 duration-300 bg-green text-white">
                <div>{benefit.icon}</div>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold transition">
              Join as a Vendor
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default BecomeAVendor;
