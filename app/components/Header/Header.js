'use client';

import React from 'react';
import Navbar from '../Navbar/Navbar';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto p-6 flex flex-col md:flex-row md:items-center justify-between w-full max-w-5xl">
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Logo - left aligned */}
          <div className="text-2xl font-bold">
            <span className="text-blue-600">e</span>Simplee
          </div>
          
          {/* Burger menu button (visible only below 1024px) - right aligned */}
          <div className="lg:hidden ml-auto">
            <Navbar />
          </div>
        </div>
        
        {/* Desktop navbar (visible only above 1024px) */}
        <div className="hidden lg:block">
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
