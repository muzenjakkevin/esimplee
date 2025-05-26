import React, { useState, useEffect, useRef } from 'react'

import Link from 'next/link'

import styles from './BurgerMenu.module.css'

const BurgerMenu = ({ isScrolled, onMenuToggle }) => {

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const scrollPosition = useRef(0);

  // Update the scroll lock effect
  useEffect(() => {
    if (open) {
      // Store the current scroll position
      scrollPosition.current = window.scrollY;
      // Apply the fixed position to body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
    } else {
      // Restore the scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition.current);
    }
    
    // Cleanup function
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [open]);

  // Handle focus trap
  useEffect(() => {
    if (!open) return;

    const menuElement = menuRef.current;
    const focusableElements = menuElement.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    function handleTabKey(e) {
      if (!open) return;

      if (e.key === 'Tab') {
        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else { // Tab
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    }

    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [open]);

  const toggleMenu = () => {
    setOpen(!open);
    onMenuToggle(!open);
  };

  return (
    <div className={styles.menuButton}>
      <button 
        ref={buttonRef}
        onClick={toggleMenu}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className={isScrolled ? styles.scrolled : ''}
      >
        {open ? (
          <div className={styles.closeIcon}>
            <div className={styles.crossLine} />
            <div className={styles.crossLine} />
          </div>
        ) : (
          <div>
            <div className={styles.menuIcon} />
            <div className={styles.menuIcon} />
            <div className={styles.menuIcon} />
          </div>
        )}
      </button>
      <div 
        ref={menuRef}
        className={`${styles.menu} ${open ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <Link href="/" passHref>
          <span className={styles.menuItem} onClick={toggleMenu}>Hem</span>
        </Link>
        <Link href="/pages/tjanster" passHref>
          <span className={styles.menuItem} onClick={toggleMenu}>Tjänster</span>
        </Link>
        <Link href="https://www.blocket.se/butik/vidmarks-bil-ab" passHref target='_blank'>
          <span className={styles.menuItem} onClick={toggleMenu}>FAQ</span>
        </Link>
        <Link href="/pages/kontakta-oss" passHref>
          <span className={styles.menuItem} onClick={toggleMenu}>Kontakta oss</span>
        </Link>
      </div>
    </div>
  )
}

export default BurgerMenu