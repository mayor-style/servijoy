import React, { useState } from 'react';
import FAQItem from './FAQItem';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
      {
        question: "What types of services are available on ServiJoy?",
        answer:
          "We connect you with skilled professionals in various categories, including home cleaning, plumbing, electrical work, beauty services, repairs, and more.",
      },
      {
        question: "How do I book a service?",
        answer:
          "Simply browse available services, select your preferred provider, and schedule an appointment directly through our platform.",
      },
      {
        question: "Are the service providers verified?",
        answer:
          "Yes! Every provider goes through a verification process, including ID and skill verification, to ensure quality and trustworthiness.",
      },
      {
        question: "How are payments handled?",
        answer:
          "Payments can be made securely online through ServiJoy using bank transfers or card payments. We also offer escrow protection for large services.",
      },
      {
        question: "Can I become a service provider on ServiJoy?",
        answer:
          "Yes! If you offer professional services, you can sign up as a vendor, complete verification, and start receiving job requests.",
      },
      {
        question: "What if I have a complaint or dispute?",
        answer:
          "You can raise disputes directly on the platform, and our support team will mediate to find a resolution.",
      },
    ];
  
    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="header font-bold text-center font-header">Frequently Asked Questions</h2>
          <p className="text-center subheader text-gray-600 mt-4">
            Get answers to common questions about using ServiJoy.
          </p>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => (
             <FAQItem  
             key={index}
             question={faq.question}
             answer={faq.answer}
             />
            ))}
          </div>
        </div>
      </section>
    );
};

export default FAQ;
