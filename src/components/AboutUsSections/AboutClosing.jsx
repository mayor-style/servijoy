import React from "react";
import { useNavigate } from "react-router-dom";

const AboutClosing = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-16 gradient-black text-center text-white relative overflow-hidden">
      {/* Background Overlay (Optional) */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20">
        {/* Heading */}
        <h2 className="header text-gradient">Transforming Services, Empowering Lives</h2>
        <p className="subheader text-gray-300 mt-4 max-w-3xl mx-auto">
          Join thousands of satisfied users and professional vendors on ServiJoy.  
          Quality, trust, and convenience—this is the future of service booking.
        </p>

        {/* Call to Action */}
        <div className="flex items-center flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/signup")}
            className="btn-green"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/become-a-vendor")}
            className="btn-blue"
          >
            Become a Vendor
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutClosing;
