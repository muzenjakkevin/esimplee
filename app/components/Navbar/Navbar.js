"use client"
import React, { useState, useEffect } from 'react';

import MobileMenu from './MobileMenu/MobileMenu';
import DesktopMenu from './DesktopMenu/DesktopMenu';

import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    setIsMobile(window.innerWidth <= 1023);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Call handlers immediately
    handleResize();
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isMobile === null) return null;

  return (
    <header className={`
      ${styles.header} 
      ${isScrolled && !isMenuOpen ? styles.scrolled : ''} 
      ${isMenuOpen ? styles.menuOpen : ''}
    `}>
      <nav className={isMobile ? styles.navbar : styles.navbarDesktop}>
        {isMobile ? (
          <MobileMenu 
            isScrolled={isScrolled} 
            onMenuToggle={setIsMenuOpen}
          />
        ) : (
          <DesktopMenu/>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
