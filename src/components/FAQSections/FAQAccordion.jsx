import { useState } from "react";

const FAQAccordion = ({ category }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">{category.title}</h2>
      <div className="space-y-3">
        {category.items.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              className="w-full flex justify-between items-center p-3 text-lg font-medium text-left transition hover:bg-gray-100"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-gray-500">
                {openIndex === index ? "▲" : "▼"}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-3 text-gray-600 bg-gray-50 border-t border-gray-200 transition-all duration-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
