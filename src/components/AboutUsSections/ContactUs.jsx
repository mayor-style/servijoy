import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
// import Lottie from "lottie-react";
// import contactAnimation from "../../assets/contact-animation.json";
import AdvancedContactAnimation from "./AdvancedContactAnimation";

const ContactUs = ({ autoFocus = false }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState("idle"); // idle, loading, success, error
  const [formErrors, setFormErrors] = useState({});
  const [activeTab, setActiveTab] = useState("form");
  const [mapVisible, setMapVisible] = useState(false);

  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const nameInputRef = useRef(null);
  
  // Social media links
  const socialLinks = [
    { name: "Facebook", icon: "facebook", color: "bg-blue-600" },
    { name: "Twitter", icon: "twitter", color: "bg-blue-400" },
    { name: "Instagram", icon: "instagram", color: "bg-pink-600" },
    { name: "LinkedIn", icon: "linkedin", color: "bg-blue-700" }
  ];

  useEffect(() => {
    // Only focus the name input if autoFocus prop is true
    if (autoFocus && nameInputRef.current) {
      setTimeout(() => nameInputRef.current.focus(), 500);
    }
  }, [autoFocus]);

  // Map load handler
  const handleShowMap = () => {
    setMapVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formState.name.trim()) errors.name = "Name is required";
    if (!formState.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Email is invalid";
    }
    if (!formState.message.trim()) errors.message = "Message is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake form on validation error
      formRef.current.classList.add("shake");
      setTimeout(() => formRef.current.classList.remove("shake"), 500);
      return;
    }
    
    setFormStatus("loading");
    
    // Simulate form submission
    setTimeout(() => {
      // 90% chance of success to simulate real-world behavior
      if (Math.random() < 0.9) {
        setFormStatus("success");
        // Reset form after success
        setFormState({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    }, 1500);
  };

  const resetForm = () => {
    setFormStatus("idle");
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full py-24 bg-gradient-to-b from-white to-gray-50 text-center text-black relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        {/* Heading with animated underline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-green bg-clip-text text-transparent">
            Get in Touch with Us
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-green rounded-full mx-auto mt-4"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
            Have questions, feedback, or need support? Reach out to us and we'll be happy to assist you.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { icon: <Mail className="w-6 h-6" />, title: "Email", content: "support@servijoy.com", action: "mailto:support@servijoy.com" },
            { icon: <MapPin className="w-6 h-6" />, title: "Address", content: "Ilorin, Nigeria", action: "#location" },
            { icon: <Phone className="w-6 h-6" />, title: "Phone", content: "+234 123 456 7890", action: "tel:+2341234567890" }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-blue-500 to-green text-white p-4 rounded-full mb-4">
                  {item.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.content}</p>
                <a 
                  href={item.action}
                  onClick={item.title === "Address" ? (e) => {
                    e.preventDefault();
                    handleShowMap();
                    setActiveTab("location");
                  } : undefined}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  {item.title === "Email" ? "Send Email" : 
                   item.title === "Address" ? "View on Map" : "Call Now"}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-4 mb-12"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`${social.color} text-white p-3 rounded-full shadow-lg`}
            >
              <span className="sr-only">{social.name}</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {social.icon === "facebook" && <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />}
                {social.icon === "twitter" && <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />}
                {social.icon === "instagram" && <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.986-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />}
                {social.icon === "linkedin" && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />}
              </svg>
            </motion.a>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("form")}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTab === "form" 
                    ? "bg-white text-blue-600 shadow-md" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Contact Form
              </button>
              <button
                onClick={() => setActiveTab("faq")}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTab === "faq" 
                    ? "bg-white text-blue-600 shadow-md" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                FAQs
              </button>
              <button
                onClick={() => {
                  setActiveTab("location");
                  handleShowMap();
                }}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTab === "location" 
                    ? "bg-white text-blue-600 shadow-md" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Our Location
              </button>
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/3">
                      <AdvancedContactAnimation />
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800">Send Us a Message</h3>
                      
                      <AnimatePresence mode="wait">
                        {formStatus === "success" ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-green p-6 rounded-lg border border-green text-center"
                          >
                            <CheckCircle className="w-12 h-12 text-green mx-auto mb-4" />
                            <h4 className="text-xl font-semibold text-green mb-2">Message Sent Successfully!</h4>
                            <p className="text-green mb-4">Thank you for reaching out. We'll get back to you shortly.</p>
                            <button
                              onClick={resetForm}
                              className="px-4 py-2 bg-green text-white rounded-md hover:bg-green transition-colors"
                            >
                              Send Another Message
                            </button>
                          </motion.div>
                        ) : formStatus === "error" ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-red-50 p-6 rounded-lg border border-red-100 text-center"
                          >
                            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <h4 className="text-xl font-semibold text-red-800 mb-2">Something went wrong</h4>
                            <p className="text-red-700 mb-4">Please try again or contact us directly at support@servijoy.com</p>
                            <button
                              onClick={resetForm}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                              Try Again
                            </button>
                          </motion.div>
                        ) : (
                          <motion.form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="mt-4 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <div>
                              <div className="relative">
                                <input
                                  ref={nameInputRef}
                                  type="text"
                                  name="name"
                                  value={formState.name}
                                  onChange={handleInputChange}
                                  placeholder="Your Name"
                                  className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                    formErrors.name 
                                      ? "border-red-300 focus:ring-red-200 bg-red-50"
                                      : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
                                  }`}
                                />
                                <span className="absolute left-3 top-3.5 text-gray-400">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                  </svg>
                                </span>
                              </div>
                              {formErrors.name && (
                                <motion.p 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mt-1 text-sm text-red-600"
                                >
                                  {formErrors.name}
                                </motion.p>
                              )}
                            </div>
                            
                            <div>
                              <div className="relative">
                                <input
                                  type="email"
                                  name="email"
                                  value={formState.email}
                                  onChange={handleInputChange}
                                  placeholder="Your Email"
                                  className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                    formErrors.email 
                                      ? "border-red-300 focus:ring-red-200 bg-red-50"
                                      : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
                                  }`}
                                />
                                <span className="absolute left-3 top-3.5 text-gray-400">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                  </svg>
                                </span>
                              </div>
                              {formErrors.email && (
                                <motion.p 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mt-1 text-sm text-red-600"
                                >
                                  {formErrors.email}
                                </motion.p>
                              )}
                            </div>
                            
                            <div>
                              <div className="relative">
                                <textarea
                                  rows={4}
                                  name="message"
                                  value={formState.message}
                                  onChange={handleInputChange}
                                  placeholder="Your Message"
                                  className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                    formErrors.message 
                                      ? "border-red-300 focus:ring-red-200 bg-red-50"
                                      : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
                                  }`}
                                ></textarea>
                                <span className="absolute left-3 top-3.5 text-gray-400">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                  </svg>
                                </span>
                              </div>
                              {formErrors.message && (
                                <motion.p 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mt-1 text-sm text-red-600"
                                >
                                  {formErrors.message}
                                </motion.p>
                              )}
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              type="submit"
                              disabled={formStatus === "loading"}
                              className="w-full p-3 bg-gradient-to-r from-blue-600 to-green text-white rounded-lg font-medium flex items-center justify-center transition-all hover:shadow-lg disabled:opacity-70"
                            >
                              {formStatus === "loading" ? (
                                <>
                                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="w-5 h-5 mr-2" />
                                  Send Message
                                </>
                              )}
                            </motion.button>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === "faq" && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {[
                    { question: "How quickly will I receive a response?", answer: "We typically respond to all inquiries within 24 hours during business days." },
                    { question: "Do you offer phone support?", answer: "Yes, our support team is available by phone during business hours (9 AM - 5 PM local time)." },
                    { question: "Can I visit your office in person?", answer: "Yes, you can visit our office in Ilorin. We recommend scheduling an appointment beforehand." },
                    { question: "How can I report a technical issue?", answer: "You can report technical issues through our contact form by selecting 'Technical Support' in the subject line." }
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === "location" && (
              <motion.div
                key="location"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Our Location</h3>
                <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 h-80 bg-gray-100">
                  {mapVisible ? (
                    // Map iframe
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126582.19674653577!2d4.4605258!3d8.5390947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10364652a666a22d%3A0x80d078f209eb2d47!2sIlorin%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1661396338930!5m2!1sen!2sus" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <button 
                        onClick={handleShowMap}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <MapPin className="w-5 h-5" />
                        Load Map
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-6 text-center">
                  <h4 className="font-semibold mb-2">Business Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 9 AM - 5 PM</p>
                  <p className="text-gray-600">Saturday: 10 AM - 2 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Wave */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 50C840 40 960 20 1080 15C1200 10 1320 20 1380 25L1440 30V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z" fill="#F3F4F6" />
      </svg>
    </motion.section>
  );
};

export default ContactUs;
