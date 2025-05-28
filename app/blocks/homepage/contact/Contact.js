/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '' // Hidden field for spam protection
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    // Check if honeypot is filled (indicates spam)
    if (formData.honeypot) {
      return false;
    }
    
    // Either email or phone must be provided
    if (!formData.email && !formData.phone) {
      newErrors.contact = 'Vänligen ange antingen en e-postadress eller telefonnummer';
      // Also set individual errors to get the red border styling
      newErrors.email = 'Vänligen ange en e-postadress';
      newErrors.phone = 'Vänligen ange ett telefonnummer';
    }
    
    // Validate email format if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Vänligen ange en giltig e-postadress';
    }
    
    // Validate phone format if provided (basic validation)
    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Vänligen ange ett giltigt telefonnummer';
    }
    
    // Subject is required
    if (!formData.subject.trim()) {
      newErrors.subject = 'Vänligen ange ett ämne';
    }
    
    // Message is no longer required - removed validation
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear contact error when either email or phone is filled
    if ((name === 'email' || name === 'phone') && errors.contact) {
      setErrors(prev => ({
        ...prev,
        contact: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          lastname: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          honeypot: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.title}>Hör av dig till oss!</h2>
        <p className={styles.subtitle}>Kontakta oss och låt oss hjälpa dig komma fram till vad du behöver.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            className={styles.honeypot}
            tabIndex="-1"
            autoComplete="off"
          />
          
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Förnamn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Fyll i ditt förnamn"
              />
            </div>
            
            <div className={styles.field}>
              <label htmlFor="lastname" className={styles.label}>
                Efternamn
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className={styles.input}
                placeholder="Fyll i ditt efternamn"
              />
            </div>
          </div>
          
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Epost {!formData.phone && '*'}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                placeholder="Fyll i din e-postadress"
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
            
            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                Telefonnummer {!formData.email && '*'}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                placeholder="Fyll i ditt telefonnummer"
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>
          </div>
          
          {errors.contact && (
            <div className={styles.contactError}>
              {errors.contact}
            </div>
          )}
          
          <div className={styles.field}>
            <label htmlFor="subject" className={styles.label}>
              Ämne *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`${styles.input} ${errors.subject ? styles.error : ''}`}
              placeholder="Vad handlar ditt meddelande om?"
            />
            {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
          </div>
          
          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>
              Beskriv vad du vill eller hur vi kan hjälpa dig
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
              placeholder="Beskriv vad du vill eller hur vi kan hjälpa dig..."
            />
            {errors.message && <span className={styles.errorText}>{errors.message}</span>}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
          >
            {isSubmitting ? 'Skickar...' : 'Skicka meddelande'}
          </button>
          
          {submitStatus === 'success' && (
            <div className={styles.successMessage}>
              Tack! Ditt meddelande har skickats. Vi kommer att höra av oss till dig så fort som möjligt.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>
              Ojdå, det uppstod visst ett fel medans du skickade meddelandet. Vänligen försök igen eller kontakta oss direkt.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
