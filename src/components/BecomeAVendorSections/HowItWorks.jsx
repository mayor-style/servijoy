import { FaUserCheck, FaCogs, FaBriefcase, FaWallet } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserCheck className="text-5xl text-green" />,
    title: "Sign Up & Verify",
    description: "Create an account, complete verification, and get ready to start working.",
  },
  {
    icon: <FaCogs className="text-5xl text-blue-500" />,
    title: "Set Up Profile",
    description: "Add your skills, pricing, availability, and let users find you.",
  },
  {
    icon: <FaBriefcase className="text-5xl text-green" />,
    title: "Get Hired & Work",
    description: "Users book your services, you complete tasks, and earn money.",
  },
  {
    icon: <FaWallet className="text-5xl text-blue-400" />,
    title: "Get Paid Securely",
    description: "Receive payments quickly and withdraw your earnings anytime.",
  },
];

const HowItWorksVendor = () => {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">
      {/* Header */}
      <h2 className="header text-gradient mb-4">How It Works</h2>
      <p className="subheader text-black/70 max-w-3xl">
        Becoming a vendor on **ServiJoy** is simple! Follow these **four easy steps** to start earning today.
      </p>

      {/* Steps Container */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {steps.map((step, index) => (
          <div key={index} className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center transition hover:shadow-xl">
            {step.icon}
            <h3 className="font-semibold text-lg mt-4">{step.title}</h3>
            <p className="text-black/70 text-sm mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksVendor;
