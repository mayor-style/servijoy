import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

// Sample FAQ data
const faqData = [
  {
    question: "How do I sign up as a vendor?",
    answer:
      "Signing up is easy! Click the 'Get Started' button, fill in your details, and submit your verification documents. Once approved, you can start receiving service requests."
  },
  {
    question: "Is there a registration fee?",
    answer:
      "No, registering as a vendor on ServiJoy is completely free. However, we take a small service fee per completed job."
  },
  {
    question: "How do I receive payments?",
    answer:
      "Payments are securely processed through our platform. You can withdraw your earnings directly to your bank account or wallet."
  },
  {
    question: "What kind of services can I offer?",
    answer:
      "You can offer a wide range of services including cleaning, plumbing, electrical work, home repairs, and more. Ensure your profile accurately reflects your skills."
  },
  {
    question: "How does ServiJoy ensure customer trust?",
    answer:
      "We verify both vendors and users to create a secure environment. Reviews, ratings, and trust scores also help maintain a high-quality marketplace."
  }
];

const BecomeVendorFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 mt-3">
          Everything you need to know before joining ServiJoy as a vendor.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto mt-10">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 py-4">
            <button
              className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <FaChevronDown
                className={`transform transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <p
              className={`text-gray-600 mt-2 text-sm ${
                openIndex === index ? "block" : "hidden"
              }`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BecomeVendorFAQ;
