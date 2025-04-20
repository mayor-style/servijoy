import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaQuestionCircle, 
  FaHome, 
  FaCalendarCheck, 
  FaShieldAlt, 
  FaUserTie, 
  FaHeadset, 
  FaSearch,
  FaEnvelope, 
  FaComments, 
  FaPhone 
} from "react-icons/fa";

const EnhancedFAQItem = ({ question, answer, isOpen, toggleOpen, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500"
    >
      <div
        onClick={toggleOpen}
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-blue-50 transition-colors duration-300"
      >
        <div className="flex items-center">
          <FaQuestionCircle className="text-blue-500 mr-3 flex-shrink-0" />
          <h4 className="font-medium text-gray-800">{question}</h4>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-gray-50 border-t border-gray-100">
              <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const categoryIcons = {
  "General": <FaHome className="text-blue-500" />,
  "Booking & Services": <FaCalendarCheck className="text-green" />,
  "Payments & Security": <FaShieldAlt className="text-purple-500" />,
  "For Service Providers": <FaUserTie className="text-orange-500" />,
  "Disputes & Support": <FaHeadset className="text-red-500" />
};

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
  const [activeCategory, setActiveCategory] = useState("all");
  const [openQuestions, setOpenQuestions] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  // Toggle FAQ open/close state
  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = [];
    faqCategories.forEach((category, catIndex) => {
      category.questions.forEach((item, qIndex) => {
        if (
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({
            category: category.category,
            question: item.question,
            answer: item.answer,
            catIndex,
            qIndex
          });
        }
      });
    });
    setSearchResults(results);
  }, [searchTerm]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section with Animation */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Support Center
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-24 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to the most common questions about ServiJoy and our services.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-xl mx-auto"
          >
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Search Results */}
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Search Results ({searchResults.length})
                </h3>
                <div className="space-y-4">
                  {searchResults.map((result, idx) => (
                    <EnhancedFAQItem
                      key={idx}
                      question={result.question}
                      answer={result.answer}
                      isOpen={openQuestions[`${result.catIndex}-${result.qIndex}`] || false}
                      toggleOpen={() => toggleQuestion(result.catIndex, result.qIndex)}
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 overflow-x-auto py-2 hide-scrollbar"
        >
          <div className="flex space-x-2 md:justify-center">
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveTab(0);
              }}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 0
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Categories
            </button>
            {faqCategories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCategory(category.category);
                  setActiveTab(idx + 1);
                }}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                  activeTab === idx + 1
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{categoryIcons[category.category]}</span>
                {category.category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Categories */}
        {!searchTerm && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {faqCategories
              .filter(
                (category) => activeCategory === "all" || category.category === activeCategory
              )
              .map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md p-6 border-t-4"
                  style={{
                    borderColor: 
                      category.category === "General" ? "#3B82F6" :
                      category.category === "Booking & Services" ? "#10B981" :
                      category.category === "Payments & Security" ? "#8B5CF6" :
                      category.category === "For Service Providers" ? "#F59E0B" :
                      "#EF4444"
                  }}
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4 p-3 rounded-full bg-blue-100">
                      {categoryIcons[category.category]}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {category.category}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {category.questions.map((faq, questionIndex) => (
                      <EnhancedFAQItem
                        key={questionIndex}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openQuestions[`${categoryIndex}-${questionIndex}`] || false}
                        toggleOpen={() => toggleQuestion(categoryIndex, questionIndex)}
                        index={questionIndex}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}

        {/* Still Need Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="mb-6 max-w-md mx-auto">
            We're here to help! Contact our support team and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:support@servijoy.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium shadow-lg hover:bg-blue-50 transition-colors duration-300"
            >
              <FaEnvelope className="mr-2" />
              Email Support
            </a>
            <a
              href="#live-chat"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium shadow-lg hover:bg-blue-50 transition-colors duration-300"
            >
              <FaComments className="mr-2" />
              Live Chat
            </a>
            <a
              href="tel:+234800SERVIJOY"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium shadow-lg hover:bg-blue-50 transition-colors duration-300"
            >
              <FaPhone className="mr-2" />
              Call Us
            </a>
          </div>
        </motion.div>

        {/* FAQ Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-blue-100 p-6 rounded-lg text-center">
            <div className="text-blue-600 text-4xl font-bold mb-2">
              {faqCategories.reduce((acc, cat) => acc + cat.questions.length, 0)}
            </div>
            <p className="text-blue-800">Total FAQ Items</p>
          </div>
          <div className="bg-green/10 p-6 rounded-lg text-center">
            <div className="text-green text-4xl font-bold mb-2">
              {faqCategories.length}
            </div>
            <p className="text-green">Categories</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg text-center">
            <div className="text-purple-600 text-4xl font-bold mb-2">24/7</div>
            <p className="text-purple-800">Support Available</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQPage;
