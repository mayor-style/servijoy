import React from 'react'
import { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
      {
        question: "What cleaning services do you offer?",
        answer:
          "We offer Airbnb cleaning, deep cleaning, move-in/move-out cleaning, and standard home cleaning services.",
      },
      {
        question: "Do I need to provide cleaning supplies?",
        answer:
          "No, our team comes fully equipped with professional cleaning supplies. However, if you have preferences, you can let us know.",
      },
      {
        question: "How long does a typical cleaning take?",
        answer:
          "It depends on the service and home size. A standard cleaning takes 2-3 hours, while deep cleaning may take longer.",
      },
      {
        question: "Can I schedule a recurring cleaning?",
        answer:
          "Yes, we offer weekly, bi-weekly, and monthly cleaning plans for consistent maintenance.",
      },
      {
        question: "What happens if I need to reschedule?",
        answer:
          "You can reschedule up to 24 hours in advance without any charges. Late cancellations may incur a fee.",
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
          Find answers to common questions about our cleaning services.
        </p>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-white text-left text-blue-900 max-xs:text-sm font-medium hover:bg-gray-100"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className={`text-sm ${openIndex === index? 'text-blue-900' : ''}`}>{openIndex === index ? "➖" : "➕"}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 max-xs:text-sm bg-white text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
