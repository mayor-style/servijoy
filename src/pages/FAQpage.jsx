import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// Improved FAQItem component
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
      <button
        className="flex w-full items-center justify-between p-5 text-left font-medium transition-colors duration-300 hover:bg-gray-50 focus:outline-none"
        onClick={onClick}
      >
        <span className="text-base sm:text-lg text-gray-800">{question}</span>
        <span className="ml-4 flex-shrink-0 text-green">
          {isOpen ? (
            <FiChevronUp className="h-5 w-5" />
          ) : (
            <FiChevronDown className="h-5 w-5" />
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white p-5 text-gray-600">{answer}</div>
      </div>
    </div>
  );
};

// FAQ Category component to better organize the content
const FAQCategory = ({ category, questions, activeIndex, setActiveIndex }) => {
  return (
    <div className="mb-10">
      <h3 className="mb-6 border-b border-green/30 pb-2 text-xl font-semibold text-green sm:text-2xl">
        {category}
      </h3>
      <div className="space-y-2">
        {questions.map((faq, idx) => {
          const globalIndex = `${category}-${idx}`;
          return (
            <FAQItem
              key={globalIndex}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeIndex === globalIndex}
              onClick={() => setActiveIndex(activeIndex === globalIndex ? null : globalIndex)}
            />
          );
        })}
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  // You can add a search functionality here if needed
  const [searchTerm, setSearchTerm] = useState("");
  
  const faqCategories = [
    {
      category: "General",
      questions: [
        {
          question: "What is ServiJoy?",
          answer:
            "ServiJoy is a platform that connects users with professional service providers across various categories, including home services, beauty, repairs, and more.",
        },
        {
          question: "Is ServiJoy available in all cities?",
          answer:
            "We are currently operating in Ilorin City, with plans to expand to Lagos and other major cities in Nigeria soon.",
        },
      ],
    },
    {
      category: "Booking & Services",
      questions: [
        {
          question: "How do I book a service?",
          answer:
            "You can browse available services, select your preferred provider, and schedule an appointment directly through our platform.",
        },
        {
          question: "Can I cancel a booking?",
          answer:
            "Yes, you can cancel a booking before the service provider accepts it. If the provider has already accepted, you may need to pay a cancellation fee.",
        },
      ],
    },
    {
      category: "Payments & Security",
      questions: [
        {
          question: "How are payments handled?",
          answer:
            "Payments are securely processed through ServiJoy using bank transfers or card payments. We also provide escrow protection for large transactions.",
        },
        {
          question: "Is my payment information safe?",
          answer:
            "Yes, we use advanced encryption and security protocols to protect your payment details.",
        },
      ],
    },
    {
      category: "For Service Providers",
      questions: [
        {
          question: "How do I become a service provider on ServiJoy?",
          answer:
            "If you offer professional services, you can sign up as a vendor, complete our verification process, and start receiving job requests.",
        },
        {
          question: "What are the requirements for becoming a provider?",
          answer:
            "All service providers must complete ID verification, skill verification, and agree to our terms of service.",
        },
      ],
    },
    {
      category: "Disputes & Support",
      questions: [
        {
          question: "What if I have a complaint or dispute?",
          answer:
            "You can raise a dispute directly on the platform, and our support team will step in to mediate and find a resolution.",
        },
        {
          question: "How do I contact customer support?",
          answer:
            "You can reach out to us through our support email or the live chat feature on our platform.",
        },
      ],
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header with improved styling */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Find answers to the most common questions about ServiJoy's services and platform.
          </p>
        </div>

        {/* Search component (optional) */}
        <div className="mb-10">
          <div className="relative mx-auto max-w-md">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 pl-10 pr-10 text-gray-700 shadow-sm focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                onClick={() => setSearchTerm("")}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Quick links to categories (enhanced UX) */}
        <div className="mb-12 hidden sm:block">
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category) => (
              <button
                key={category.category}
                className="rounded-full border border-green/30 bg-white px-5 py-2 text-sm font-medium text-green shadow-sm transition hover:bg-green hover:text-white"
                onClick={() => {
                  const element = document.getElementById(`category-${category.category.replace(/\s+/g, '-').toLowerCase()}`);
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="rounded-xl bg-white p-6 shadow-lg sm:p-8">
          {faqCategories.map((category, index) => (
            <div 
              id={`category-${category.category.replace(/\s+/g, '-').toLowerCase()}`} 
              key={index}
            >
              <FAQCategory
                category={category.category}
                questions={
                  searchTerm
                    ? category.questions.filter(
                        (q) =>
                          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                    : category.questions
                }
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>
          ))}
        </div>

        {/* Support card at the bottom */}
        <div className="mt-12 rounded-xl bg-green/10 p-6 text-center shadow-sm">
          <h3 className="mb-2 text-xl font-semibold text-gray-800">Still have questions?</h3>
          <p className="mb-4 text-gray-600">Our team is ready to assist you with any other questions you might have.</p>
          <button className="rounded-full bg-green px-6 py-3 font-medium text-white shadow-sm transition hover:bg-green/90">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQPage;