'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Faq.module.css';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
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

  const faqData = [
    {
      question: "What services do you offer?",
      answer: "We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, digital marketing, and cloud solutions. Our team specializes in creating custom solutions tailored to your business needs."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process."
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes, we offer comprehensive support and maintenance packages. This includes regular updates, security patches, performance monitoring, and technical support. We believe in building long-term partnerships with our clients."
    },
    {
      question: "What is your development process?",
      answer: "Our development process follows agile methodology with clear phases: Discovery & Planning, Design & Prototyping, Development & Testing, Launch & Deployment, and Ongoing Support. We maintain transparent communication throughout each phase."
    },
    {
      question: "Can you work with our existing systems?",
      answer: "Absolutely! We have extensive experience integrating with existing systems, APIs, and databases. We'll assess your current infrastructure and recommend the best approach for seamless integration while minimizing disruption to your operations."
    },
    {
      question: "What are your pricing models?",
      answer: "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project complexity, timeline, and specific requirements. We provide detailed quotes after understanding your needs."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 
            ref={el => elementsRef.current[0] = el}
            data-element-id="title"
            className={`${styles.title} ${visibleElements.has('title') ? styles.titleVisible : ''}`}
          >
            Vanliga frågor
          </h2>
          <p 
            ref={el => elementsRef.current[1] = el}
            data-element-id="subtitle"
            className={`${styles.subtitle} ${visibleElements.has('subtitle') ? styles.subtitleVisible : ''}`}
          >
            Här hittar du svar på vanliga frågor om våra tjänster och processer.
          </p>
        </div>
        
        <div className={styles.accordionContainer}>
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              ref={el => elementsRef.current[index + 2] = el}
              data-element-id={`faq-${index}`}
              className={`${styles.accordionItem} ${visibleElements.has(`faq-${index}`) ? styles.accordionItemVisible : ''}`}
            >
              <button
                className={`${styles.accordionHeader} ${
                  openIndex === index ? styles.active : ''
                }`}
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.question}>{faq.question}</span>
                <span className={styles.icon}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              <div
                className={`${styles.accordionContent} ${
                  openIndex === index ? styles.open : ''
                }`}
              >
                <div className={styles.answer}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
