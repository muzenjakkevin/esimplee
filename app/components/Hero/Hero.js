import React from 'react'
import Image from 'next/image'

import styles from './Hero.module.css'

const Hero = ({ image, alt, logo, pageClass }) => {
  return (
    <div className={styles.heroContainer}>
      {image && (<Image 
        className={`${styles.heroImage} ${styles[pageClass]}`} 
        src={image} 
        alt={alt} 
        quality={100} 
        priority
      />)}
      {logo && (<Image className={styles.heroLogo} src={logo} alt="Bilhall" loading="eager"/>)}
      <div className={styles.heroContent}>
        <h1>
          <span>Web lösningar</span>
          <span>för företag</span>
        </h1>
        <p>
          <span>Här på esimplee skapar, förvaltar och hostar vi webbplatser som är enkla att hantera och uppdatera, samtidigt som de är tillgängliga för alla användare.</span>
          <span>simpelt.</span>
        </p>
      </div>
    </div>
  )
}

export default Hero