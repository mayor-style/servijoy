import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ServicesPage from './pages/ServicesPage';
import { useEffect, useState } from "react";

function App() {
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    const welMessage = setTimeout(() => {
      setWelcome(false);
    }, 3000);

    return () => clearTimeout(welMessage); // Ensure cleanup of timeout on component unmount
  }, []);

  return (
    <>
      {welcome ? (
        <div className="min-h-screen flex justify-center items-center text-center bg-gray-200 w-full h-full">
          <h1 className=" text-3xl font-header xs:text-4xl text-center font-bold m-auto animate-glow text-black">
            Welcome to <span className="text-gradient">Servijoy</span>
          </h1>
        </div>
      ) : (
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
          </Routes>

          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
