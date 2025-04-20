import React, { useState, useRef } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const searchInputRef = useRef(null);

  const categories = [
    { id: "all", name: "All" },
    { id: "general", name: "General" },
    { id: "booking", name: "Booking" },
    { id: "payment", name: "Payment" },
    { id: "providers", name: "Providers" }
  ];

  const faqs = [
    {
      question: "What types of services are available on ServiJoy?",
      answer: "We connect you with skilled professionals in various categories, including home cleaning, plumbing, electrical work, beauty services, repairs, and more.",
      category: "general",
      tags: ["services", "categories", "professionals"]
    },
    {
      question: "How do I book a service?",
      answer: "Simply browse available services, select your preferred provider, and schedule an appointment directly through our platform.",
      category: "booking",
      tags: ["booking", "appointment", "scheduling"]
    },
    {
      question: "Are the service providers verified?",
      answer: "Yes! Every provider goes through a verification process, including ID and skill verification, to ensure quality and trustworthiness.",
      category: "providers",
      tags: ["verification", "providers", "quality"]
    },
    {
      question: "How are payments handled?",
      answer: "Payments can be made securely online through ServiJoy using bank transfers or card payments. We also offer escrow protection for large services.",
      category: "payment",
      tags: ["payment", "security", "escrow"]
    },
    {
      question: "Can I become a service provider on ServiJoy?",
      answer: "Yes! If you offer professional services, you can sign up as a vendor, complete verification, and start receiving job requests.",
      category: "providers",
      tags: ["become provider", "vendor", "sign up"]
    },
    {
      question: "What if I have a complaint or dispute?",
      answer: "You can raise disputes directly on the platform, and our support team will mediate to find a resolution.",
      category: "general",
      tags: ["complaints", "disputes", "support"]
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600 mb-6">Get answers to common questions about using ServiJoy.</p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <p className="text-gray-600 mb-4 text-sm">
          Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} for "{searchQuery}"
        </p>
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-medium text-gray-800">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                      
                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {faq.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No matching FAQs found. Try a different search term.</p>
          </div>
        )}
      </div>
      
      {/* Still Need Help Section */}
      <div className="mt-12 text-center p-6 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-4">Our support team is ready to help you with any other questions.</p>
        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQ;