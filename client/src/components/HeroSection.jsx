// HeroSection.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaCode, FaMobileAlt, FaCloud } from 'react-icons/fa'; // Importing icons
import './css/hero.css';

function HeroSection() {
  const messageRef = useRef();
  const messages = [
    "Abbout Us: At Codlify, we’re passionate about crafting innovative software solutions that make a real impact. Founded on the belief that technology should empower people and businesses, we specialize in delivering high-quality, scalable, and secure software tailored to meet the evolving needs of our clients. Our team of experienced developers, designers, and strategists works collaboratively to bring ideas to life, from concept to deployment. By combining technical expertise with a commitment to outstanding service, we help organizations of all sizes transform digitally, improve efficiency, and stay ahead of the competition. Whether you’re looking for custom software, web applications, or mobile solutions, Codlify is here to make your vision a reality.",
    "vision: To be a trusted leader in the digital transformation landscape, enabling businesses of all sizes to harness the power of technology for growth and innovation. Codlify envisions a world where technology empowers every organization to realize its full potential, stay competitive, and make a positive impact on the communities they serve.",
    "Services: At Codlify, we offer a range of services tailored to meet the diverse technology needs of businesses: Custom Software Development Bespoke software solutions designed to fit unique business requirements, from planning to deployment. Web Application Development Scalable, secure, and responsive web applications to enhance user experience and drive engagement. Mobile Application Development Native and cross-platform mobile apps for iOS and Android, designed to deliver seamless performance and functionality. Cloud Solutions Cloud architecture, migration, and management services to enhance scalability, reduce costs, and improve accessibility. UI/UX Design Intuitive and user-friendly design services that elevate user experience and align with brand aesthetics."
  ];
  
  useEffect(() => {
    let currentMessage = 0;

    const cycleMessages = () => {
      gsap.to(messageRef.current, { opacity: 0, duration: 1.5, onComplete: () => {
        messageRef.current.innerText = messages[currentMessage];
        gsap.to(messageRef.current, { opacity: 1, duration: 1 });
        currentMessage = (currentMessage + 1) % messages.length;
      }});
    };

    const interval = setInterval(cycleMessages, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Codlify</h1>
        <p ref={messageRef} className="hero-message">{messages[0]}</p>
        <button className="cta-button">Read more about us</button>
      </div>
      <div className="hero-icons">
        <FaCode className="hero-icon " title="Software Development" />
       
      </div>
    </section>
  );
}

export default HeroSection;
