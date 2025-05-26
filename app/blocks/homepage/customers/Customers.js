'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Customers.module.css';

const Customers = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.dataset.elementId;
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, elementId]));
          } else {
            setVisibleElements(prev => {
              const newSet = new Set(prev);
              newSet.delete(elementId);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '20px 0px -20px 0px'
      }
    );

    elementsRef.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      elementsRef.current.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Array of customer objects with logo and website information
  const customers = [
    {
      id: 1,
      name: 'Microsoft',
      logo: '/images/customers/microsoft-logo.png',
      website: 'https://microsoft.com',
    },
    {
      id: 2,
      name: 'Google',
      logo: '/images/customers/google-logo.png',
      website: 'https://google.com',
    },
    {
      id: 3,
      name: 'Apple',
      logo: '/images/customers/apple-logo.png',
      website: 'https://apple.com',
    },
    {
      id: 4,
      name: 'Amazon',
      logo: '/images/customers/amazon-logo.png',
      website: 'https://amazon.com',
    },
    {
      id: 5,
      name: 'Meta',
      logo: '/images/customers/meta-logo.png',
      website: 'https://meta.com',
    },
    {
      id: 6,
      name: 'Netflix',
      logo: '/images/customers/netflix-logo.png',
      website: 'https://netflix.com',
    },
    {
      id: 7,
      name: 'Tesla',
      logo: '/images/customers/tesla-logo.png',
      website: 'https://tesla.com',
    },
    {
      id: 8,
      name: 'Spotify',
      logo: '/images/customers/spotify-logo.png',
      website: 'https://spotify.com',
    },
  ];

  return (
    <section className={styles.customers}>
      <div className={styles.container}>
        <h2 
          ref={el => elementsRef.current[0] = el}
          data-element-id="title"
          className={`${styles.title} ${visibleElements.has('title') ? styles.titleVisible : ''}`}
        >
          Några av våra kunder
        </h2>
        <p 
          ref={el => elementsRef.current[1] = el}
          data-element-id="subtitle"
          className={`${styles.subtitle} ${visibleElements.has('subtitle') ? styles.subtitleVisible : ''}`}
        >
          Kika gärna in på några av våra kunders hemsidor som vi har hjälpt att skapa.
        </p>
        
        <div 
          ref={el => elementsRef.current[2] = el}
          data-element-id="carousel"
          className={`${styles.carouselContainer} ${visibleElements.has('carousel') ? styles.carouselVisible : ''}`}
        >
          <div className={styles.carousel}>
            {/* First set of logos */}
            {customers.map((customer) => (
              <a
                key={customer.id}
                href={customer.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.customerLink}
                aria-label={`Visit ${customer.name} website`}
              >
                <Image
                  src={customer.logo}
                  alt={`${customer.name} logo`}
                  width={140}
                  height={60}
                  className={styles.customerLogo}
                  priority={false}
                  loading="lazy"
                />
              </a>
            ))}
            {/* Duplicate set for seamless loop */}
            {customers.map((customer) => (
              <a
                key={`duplicate-${customer.id}`}
                href={customer.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.customerLink}
                aria-label={`Visit ${customer.name} website`}
              >
                <Image
                  src={customer.logo}
                  alt={`${customer.name} logo`}
                  width={140}
                  height={60}
                  className={styles.customerLogo}
                  priority={false}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customers;
