import { FaMoneyBillWave, FaUsers, FaClock, FaStar } from "react-icons/fa";

const WhyBecomeVendor = () => {
  const benefits = [
    {
      icon: <FaMoneyBillWave className="text-3xl sm:text-4xl text-green" />,
      title: "Earn More",
      description: "Expand your income by offering your services to a wider audience.",
    },
    {
      icon: <FaUsers className="text-3xl sm:text-4xl text-blue-500" />,
      title: "Trusted Network",
      description: "Join a platform that connects you with verified, high-quality clients.",
    },
    {
      icon: <FaClock className="sm:text-4xl text-3xl text-green" />,
      title: "Flexible Work",
      description: "Work on your own terms, set your schedule, and take control of your time.",
    },
    {
      icon: <FaStar className="text-3xl sm:text-4xl text-blue-400" />,
      title: "Boost Your Reputation",
      description: "Gain ratings and reviews that help build credibility and attract more clients.",
    },
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">
      {/* Header */}
      <h2 className="header text-gradient mb-4">Why Become a Vendor?</h2>
      <p className="subheader text-black/70 max-w-3xl">
        ServiJoy provides everything you need to succeed, grow, and thrive in your industry.
      </p>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {benefits.map((benefit, index) => (
          <div key={index} className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
            {benefit.icon}
            <h3 className="font-semibold text-lg mt-4">{benefit.title}</h3>
            <p className="text-black/70 text-sm mt-2">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyBecomeVendor;
