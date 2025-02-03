import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import FAQItem from "../FAQItem";

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
        <h2 className="header font-bold text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="tsubheader text-gray-600 mt-3">
          Everything you need to know before joining ServiJoy as a vendor.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="max-w-3xl space-y-4 mx-auto mt-10">
        {faqData.map((faq, index) => (
         <FAQItem  answer={faq.answer} question={faq.question} key={index} />
        ))}
      </div>
    </section>
  );
};

export default BecomeVendorFAQ;
