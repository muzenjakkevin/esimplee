'use client'
import React, { useEffect, useRef, useState } from 'react'

import { Code, Server, Globe, Check } from 'lucide-react';

import styles from './Services.module.css'

const Services = () => {
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

  const servicesList = [
    {
      title: "Utveckling",
      description: "Vi utvecklar webbplatser och webbapplikationer som är anpassade till dina behov och överträffar dina förväntningar.",
      icon: <Code className={styles.icon} size={40}/>,
      features: ["Responsiv design", "SEO-optimering", "Prestandafokuserad", "Användarvänligt gränssnitt"]
    },
    {
      title: "Förvaltning",
      description: "Vi förvaltar dina webbplatser och webbapplikationer för att säkerställa att de är uppdaterade och fungerar optimalt.",
      icon: <Server className={styles.icon} size={40}/>,
      features: ["Regelbundna uppdateringar", "Säkerhetsövervakning", "Prestandaförbättringar", "Innehållshantering"]
    },
    {
      title: "Hosting",
      description: "Vi hostar dina webbplatser och webbapplikationer för att säkerställa att de är tillgängliga och fungerar optimalt.",
      icon: <Globe className={styles.icon} size={40}/>,
      features: ["99.9% uptime garanti", "Snabba laddningshastigheter", "SSL-certifikat", "Dagliga säkerhetskopieringar"]
    }
  ];

  return (
    <section className={styles.services}>
        <div className={styles.servicesContainer}>
          <h2 
            ref={el => elementsRef.current[0] = el}
            data-element-id="title"
            className={`${styles.title} ${visibleElements.has('title') ? styles.visible : ''}`}
          >
            Våra tjänster
          </h2>
          <div className={styles.servicesContent}>
            {servicesList.map((service, index) => (
              <div 
                ref={el => elementsRef.current[index + 1] = el}
                data-element-id={`service-${index}`}
                className={`${styles.service} ${visibleElements.has(`service-${index}`) ? styles.serviceVisible : ''}`}
                key={index}
              >
                <div>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className={styles.feature}
                    >
                      <Check className={styles.icon} size={20}/>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}

export default Services