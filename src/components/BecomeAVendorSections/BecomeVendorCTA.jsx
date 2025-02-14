
import { useNavigate } from "react-router-dom";

const BecomeVendorCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-16 gradient text-center text-white relative overflow-hidden">
      {/* Background Overlay (Optional) */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20">
        {/* Heading */}
        <h2 className="xs:text-3xl text-2xl md:text-4xl font-bold text-white">
          Elevate Your Business, Unlock More Opportunities
        </h2>
        <p className="md:text-lg max-xs:text-sm text-gray-50 mt-4 max-w-3xl mx-auto">
          Join Nigeria’s most trusted service platform and grow your income.  
          Get more bookings, build credibility, and stand out in your field.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex justify-center flex-wrap items-center gap-6 mt-8">
          <button
            onClick={() => navigate("/become-a-vendor")}
            className="btn-green"
          >
            Start Now
          </button>
          <button
            onClick={() => navigate("/how-it-works")}
            className="btn-blue"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default BecomeVendorCTA;
