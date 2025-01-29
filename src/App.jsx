import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ServicesPage from './pages/ServicesPage'


function App() {
  return (
   <Router>
    <Navbar />

    <Routes>

      <Route 
        path="/" element={<HomePage />}
      />

      <Route 
        path="/about" element={<AboutPage />}
      />

      <Route 
        path="/services" element={<ServicesPage />}
      />
      
      <Route 
        path="/how-it-works" element={<HowItWorksPage />}
      />

    </Routes>

    <Footer />
   </Router>
  );
}

export default App;
