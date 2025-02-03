import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Imported hamburger icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "About Us", path: "/about" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Services", path: "/services" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav className="fixed bg-soft-white right-0 left-0 top-0 py-4 px-8 shadow-xl flex justify-between items-center z-50 border-b border-gray-200">
      {/* Logo */}
      <Link to={"/"}>
        <h1 className="font-header text-gradient font-semibold max-xs:text-2xl text-3xl">
          Servi<span>Joy</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <ul className="lg:flex hidden gap-8 text-lg items-center">
        {links.map((link, index) => (
          <li key={index} className="hover:text-green transition">
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>

      {/* Right-side Buttons (Desktop) */}
      <div className="lg:flex hidden space-x-10 text-lg items-center">
        <span className="text-black hover:text-green transition">
          <Link to={"/login-signup"}>Login / SignUp</Link>
        </span>
        <Link to={"/become-a-vendor"} className="btn font-subheading hover:gradient bg-green text-white">
          Become a Vendor
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden z-50 text-black transition-all duration-300"
      >
        {isOpen ? (
          <FiX className="text-3xl text-white" />
        ) : (
          <FiMenu className="text-3xl text-black" />
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black/80 backdrop-blur-md flex flex-col items-center justify-center space-y-6 text-white transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="sm:text-2xl text-lg xs:text-xl hover:text-green transition"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        ))}

        <div className="flex items-center flex-col space-y-4">
          <Link
            to={"/login-signup"}
            className="text-lg hover:text-green transition"
            onClick={() => setIsOpen(false)}
          >
            Login / SignUp
          </Link>
          <Link
            to={"/become-a-vendor"}
            className="btn-green flex items-center m-auto font-subheading "
            onClick={() => setIsOpen(false)}
          >
            Become a Vendor
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
