import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import BecomeAVendorPage from "./pages/BecomeAVendorPage";
import ServicesPage from "./pages/ServicesPage";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import FAQpage from "./pages/FAQpage";
import ScrollToTop from "./ScrollToTop";
import AuthPage from "./pages/AuthPage";
import ServicePage from "./pages/ServicePage";
import VendorList from "./components/VendorList";


function PageWrapper() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }} // Start lower with opacity 0
        animate={{ opacity: 1, y: 0 }} // Gradually fade in & move to normal position
        exit={{ opacity: 0, y: -15 }} // Smooth exit upwards
        transition={{ duration: 0.7, ease: "easeInOut" }} // Smoother movement
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/become-a-vendor" element={<BecomeAVendorPage />} />
          <Route path="/faq" element={<FAQpage />} />
          <Route path="/login-signup" element={<AuthPage />} />
          <Route path="/service/:service" element={<ServicePage />} />
          <Route path="/vendor-list" element={<VendorList />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const visits = parseInt(localStorage.getItem("visitCount") || "0", 10);
    const lastVisit = localStorage.getItem("lastPreloader");

    // If first-time visitor or under 5 visits, show preloader
   {/* if (visits < 15) {
      setIsLoading(true);
    } else if (!lastVisit || Date.now() - lastVisit > 3 * 24 * 60 * 60 * 1000) {
      setIsLoading(true);
      localStorage.setItem("lastPreloader", Date.now());
    } else {
      setIsLoading(false);
    }

    // Update visit count
    localStorage.setItem("visitCount", (visits + 1).toString());
   */}

   setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
   {isLoading ? (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut", delay: 1.2 }}
    className="min-h-screen flex flex-col justify-center items-center w-full h-full gradient-black relative overflow-hidden"
  >
    {/* Subtle Animated Background Effects */}
    <div className="absolute inset-0 bg-black/60 "></div>
    
    {/* Glowing Circle Animation */}
    <div className="absolute w-60 h-60 bg-white/15 rounded-full blur-3xl top-1/4 left-1/3 animate-pulse"></div>
    <div className="absolute w-40 h-40 bg-white/5 rounded-full blur-3xl bottom-1/4 right-1/3 animate-pulse"></div>

    {/* Main Content */}
    <h1 className="text-4xl xs:text-5xl sm:text-6xl animate-glow_fast font-bold font-header mb-2 text-gradient drop-shadow-lg">
      ServiJoy
    </h1>

    <FaSpinner className="text-white text-5xl animate-spin" />
  </motion.div>
) : (
  <Router>
    <Navbar />
    <ScrollToTop />
    <PageWrapper />
    <Footer />
  </Router>
)}

    </>
  );
}

export default App;
