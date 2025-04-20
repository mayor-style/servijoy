import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt, FaCheckCircle, FaTimesCircle, FaArrowRight } from "react-icons/fa";
import { toast } from "react-hot-toast";

const NewServiceForm = ({ closeModal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [justification, setJustification] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formCompletion, setFormCompletion] = useState(0);
  const fileInputRef = useRef(null);

  const serviceCategories = [
    { id: "plumbing", name: "Plumbing", icon: "🔧" },
    { id: "electrical", name: "Electrical Work", icon: "⚡" },
    { id: "cleaning", name: "Cleaning", icon: "🧹" },
    { id: "carpentry", name: "Carpentry", icon: "🪚" },
    { id: "painting", name: "Painting", icon: "🖌️" },
    { id: "appliance", name: "Appliance Repair", icon: "🔌" },
  ];

  // Calculate form completion percentage
  useEffect(() => {
    let completion = 0;
    if (selectedCategory) completion += 33.33;
    if (file) completion += 33.33;
    if (justification.length >= 10) completion += 33.34;
    setFormCompletion(completion);
  }, [selectedCategory, file, justification]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFilePreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFilePreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !file || justification.length < 10) {
      toast.error("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Service request submitted successfully!");
      closeModal();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && !selectedCategory) {
      toast.error("Please select a service category");
      return;
    }
    if (currentStep === 2 && !file) {
      toast.error("Please upload your proof of expertise");
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white dark:bg-gray-900 p-6 px-3 rounded-2xl shadow-xl"
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            New Service Application
          </h2>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {formCompletion.toFixed(0)}% Complete
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green/50"
            initial={{ width: 0 }}
            animate={{ width: `${formCompletion}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === step
                  ? "bg-green/50 text-white"
                  : currentStep > step
                  ? "bg-green/10 text-green/50 dark:bg-green/90"
                  : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
              }`}
              animate={{
                scale: currentStep === step ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
              onClick={() => currentStep > step && setCurrentStep(step)}
            >
              {currentStep > step ? <FaCheckCircle /> : step}
            </motion.div>
            <span className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              {step === 1 ? "Category" : step === 2 ? "Proof" : "Details"}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Select Service Category
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {serviceCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`p-4 border rounded-xl cursor-pointer flex items-center space-x-3 ${
                      selectedCategory === category.name
                        ? "border-green/50 bg-green/5 dark:bg-green/45"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span
                      className={`font-medium ${
                        selectedCategory === category.name
                          ? "text-green/60 dark:text-green/40"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {category.name}
                    </span>
                    {selectedCategory === category.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <FaCheckCircle className="text-green/50" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: currentStep > 2 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: currentStep > 2 ? -20 : 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Upload Proof of Expertise
              </h3>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-colors ${
                  file
                    ? "border-green/50 bg-green/5 dark:bg-green/45"
                    : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileUpload"
                />

                <div className="flex flex-col items-center text-center">
                  {filePreview ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-4"
                    >
                      <div className="relative">
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="w-40 h-40 object-cover rounded-lg shadow-md"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setFilePreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <FaTimesCircle size={18} />
                        </motion.button>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        {file?.name}
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <FaCloudUploadAlt className="text-5xl text-gray-400 dark:text-gray-500 mb-4" />
                      <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        Drag and drop your file here
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
                        or click to browse (PDF, JPG, PNG)
                      </p>
                    </>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-green/50 hover:bg-green/60 text-white py-2 px-6 rounded-lg transition-colors"
                  >
                    {file ? "Change File" : "Select File"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Final Details
              </h3>
              <div>
                <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Why should we approve you?
                </label>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  maxLength={200}
                  placeholder="Describe your experience, qualifications, and why you're the right fit..."
                  rows={4}
                  required
                  className="w-full p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green/50"
                ></textarea>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {justification.length}/200 characters
                  </p>
                  <motion.div
                    className="h-1 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                  >
                    <motion.div
                      className={`h-full ${
                        justification.length < 10
                          ? "bg-red-500"
                          : justification.length < 50
                          ? "bg-yellow-500"
                          : "bg-green/50"
                      }`}
                      animate={{ width: `${(justification.length / 200) * 100}%` }}
                    />
                  </motion.div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Review your application
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Category:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {selectedCategory}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Document:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {file?.name}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          {currentStep > 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={prevStep}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Back
            </motion.button>
          ) : (
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium hover:text-gray-700 dark:hover:text-gray-200"
            >
              Cancel
            </button>
          )}

          {currentStep < 3 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-green/50 text-white rounded-lg font-medium transition-colors hover:bg-green/60 flex items-center space-x-2"
            >
              <span>Next</span>
              <FaArrowRight />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting || !selectedCategory || !file || justification.length < 10}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                isSubmitting || !selectedCategory || !file || justification.length < 10
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-green/50 hover:bg-green/60 text-white"
              }`}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Request</span>
                  <FaCheckCircle />
                </>
              )}
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default NewServiceForm;