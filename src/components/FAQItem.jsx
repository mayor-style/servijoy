import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi"; // For sleek icons

const FAQItem = ({ question, answer, index }) => {
   const [openIndex, setOpenIndex] = useState(null);

   const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <button
        className="w-full flex text-gradient justify-between items-center p-4 bg-white text-left sm:text-lg font-medium hover:bg-gray-100 transition"
        onClick={() =>  toggleFAQ(index)}
      >
        {question}
        <span className="text-xl t">
          {openIndex === index ? <FiMinus className="text-green" /> : <FiPlus className="text-green"/>}
        </span>
      </button>
      {openIndex === index && (
        <div className="p-4 max-sm:text-sm bg-gray-50 text-gray-700 transition">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
