import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "What is ServiJoy?",
        answer: "ServiJoy is a platform that connects people who need services with professional vendors ready to help.",
      },
      {
        question: "Is ServiJoy available in all locations?",
        answer: "We currently operate in Ilorin City but plan to expand to Lagos and other major cities soon.",
      },
    ],
  },
  {
    category: "For Users",
    questions: [
      {
        question: "How do I book a service?",
        answer: "Simply sign up, browse available vendors, and book your desired service with a few clicks.",
      },
      {
        question: "What if I’m not satisfied with a service?",
        answer: "You can raise a dispute, and our support team will review the issue and take necessary action.",
      },
    ],
  },
  {
    category: "For Vendors",
    questions: [
      {
        question: "How do I become a vendor?",
        answer: "Click on ‘Become a Vendor’ and complete the sign-up process to start offering your services.",
      },
      {
        question: "How do I get paid?",
        answer: "Payments are made instantly after job completion via our secure system.",
      },
    ],
  },
  {
    category: "Payments & Security",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We support Paystack for fiat payments and BTCPay Server for crypto payments.",
      },
      {
        question: "Is my data safe?",
        answer: "Yes! We use encryption and advanced security measures to protect your information.",
      },
    ],
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {faqData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            <h2 className="text-2xl font-semibold text-black">{section.category}</h2>
            <div className="mt-4 bg-white rounded-lg shadow-lg">
              {section.questions.map((item, index) => {
                const isOpen = openIndex === `${sectionIndex}-${index}`;
                return (
                  <div key={index} className="border-b">
                    <button
                      className="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-blue-500 transition-all"
                      onClick={() => toggleAccordion(`${sectionIndex}-${index}`)}
                    >
                      {item.question}
                      <FaChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && <p className="p-4 text-gray-600">{item.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQAccordion;
