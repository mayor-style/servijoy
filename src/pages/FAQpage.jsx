import React from "react";
import FAQItem from "../components/FAQItem"; // Import the reusable FAQ component

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

const FAQPage = () => {
  return (
    <section className="py-40 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header Section */}
        <h2 className="text-center  text-3xl font-header header font-bold text-black">
          Frequently Asked Questions
        </h2>
        <p className="text-center  text-gray-600 subheader mt-3">
          Find answers to the most common questions about ServiJoy.
        </p>

        {/* FAQ Categories */}
        <div className="mt-10 space-y-12">
          {faqCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-lg sm:text-xl font-semibold text-green-600 border-b-2 border-green-300 pb-2 mb-4">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, idx) => (
                  <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
