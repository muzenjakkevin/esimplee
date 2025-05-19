"use client"
import Link from 'next/link';

import styles from "./DesktopMenu.module.css"; 

export default function DesktopMenu() {

  const LogoStyle = {
    maxWidth: "150px",
    padding: "16px"
  }
  
  return (
    <div id='welcome' className={styles.desktopMenuContainer}>
      <Link href="/" passHref>
        <h1>esimplee</h1>
      </Link>
      <div className={styles.desktopMenu}>
        <Link href="/" passHref>
          <span className={styles.menuItem}>Hem</span>
        </Link>
        <Link href="https://www.blocket.se/butik/vidmarks-bil-ab" passHref target='_blank'>
          <span className={styles.menuItem}>Våra bilar</span>
        </Link>
        <Link href="/pages/tjanster" passHref>
          <span className={styles.menuItem}>Tjänster</span>
        </Link>
        <Link href="/pages/kontakta-oss" passHref>
          <span className={styles.menuItem}>Kontakta oss</span>
        </Link>
      </div>
    </div>
  );
}
