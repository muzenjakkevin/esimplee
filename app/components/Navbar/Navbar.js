import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Add/remove no-scroll class to body when menu opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Cleanup function to re-enable scrolling if component unmounts while menu is open
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Hem', path: '/' },
    { name: 'Tjänster', path: '/tjanster' },
    { name: 'Om oss', path: '/om-oss' },
    { name: 'Kontakt', path: '/kontakt' },
  ];

  return (
    <nav className="relative">
      {/* Nav container with flex to position menu */}
      <div className="flex justify-between items-center">
        {/* Desktop menu - centered */}
        <div className="hidden lg:flex w-full justify-center">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="text-gray-800 hover:text-blue-600"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Burger menu button - visible only below 1024px */}
        <div className="lg:hidden z-50 relative">
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center w-10 h-10 relative focus:outline-none"
            aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
          >
            <div className="block w-5 absolute">
              <span 
                className={`block absolute h-0.5 w-5 transform transition duration-300 ease-in-out ${
                  isOpen ? "rotate-45 bg-white" : "-translate-y-1.5 bg-gray-700"
                }`}
              ></span>
              <span 
                className={`block absolute h-0.5 transform transition duration-300 ease-in-out ${
                  isOpen ? "opacity-0 w-0" : "opacity-100 w-5 bg-gray-700"
                }`}
              ></span>
              <span 
                className={`block absolute h-0.5 w-5 transform transition duration-300 ease-in-out ${
                  isOpen ? "-rotate-45 bg-white" : "translate-y-1.5 bg-gray-700"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu - fullscreen with animation */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        } lg:hidden`}
      >
        <div className="flex items-center justify-center h-full">
          <ul className="space-y-6 text-center">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="block py-2 text-white text-2xl font-semibold hover:text-blue-400"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
