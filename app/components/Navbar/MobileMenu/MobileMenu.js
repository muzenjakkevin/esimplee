"use client"
import Link from 'next/link';
import Image from "next/image";

import BurgerMenu from '../BurgerMenu/BurgerMenu'

import styles from "./MobileMenu.module.css"; 

export default function MobileMenu({ isScrolled, onMenuToggle }) {
  const LogoStyle = {
    maxWidth: "75px"
  }

  return (
    <div id='welcome' className={styles.mobileMenuContainer}>
      <Link href="/" passHref>
        <h1>esimplee</h1>
      </Link>
      <div>
        <BurgerMenu isScrolled={isScrolled} onMenuToggle={onMenuToggle} />
      </div>
    </div>
  );
}
