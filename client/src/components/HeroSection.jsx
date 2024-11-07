// HeroSection.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaCode, FaMobileAlt, FaCloud } from 'react-icons/fa'; // Importing icons
import './css/hero.css';

function HeroSection() {
  const aboutRef = useRef();
  const missionRef = useRef();
  const ctaRef = useRef();

  useEffect(() => {
    const rollOut = () => {
      gsap.to(aboutRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });
      gsap.to(missionRef.current, {
        x: '100%',
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });
    };

    const showCTA = () => {
      gsap.to(ctaRef.current, {
        opacity: 1,
        duration: 1,
      });
    };

    const hideCTA = () => {
      gsap.to(ctaRef.current, {
        opacity: 0,
        duration: 1,
      });
    };

    const rollIn = () => {
      gsap.to(aboutRef.current, {
        x: '0%',
        opacity: 1,
        duration: 1,
        ease: 'power2.in',
      });
      gsap.to(missionRef.current, {
        x: '0%',
        opacity: 1,
        duration: 1,
        ease: 'power2.in',
      });
    };

    const cycleAnimations = () => {
      rollOut();
      setTimeout(() => {
        showCTA();
        setTimeout(() => {
          hideCTA();
          rollIn();
        }, 2000); // Duration for CTA to stay visible
      }, 1000); // Delay after rolling out
    };

    // Start and repeat cycle
    const interval = setInterval(cycleAnimations, 7000); // Full cycle time
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <h1>Welcome to Codlify</h1>
      <div className="hero-content">
        <div ref={aboutRef} className="hero-box">
          <h2>About Us</h2>
          <p className="hero-text">
            At Codlify, we’re passionate about crafting innovative software solutions that make a real impact.
          </p>
        </div>
        <div ref={missionRef} className="hero-box">
          <h2>Mission</h2>
          <p className="hero-text">
            To be a trusted leader in digital transformation, enabling businesses to harness technology for growth and innovation.
          </p>
        </div>
        <p ref={ctaRef} className="hero-cta">Ready to transform your business? Let's start today!</p>
      </div>
      <button className="cta-button">Read more about us</button>
      <div className="hero-icons">
        <FaCode className="hero-icon" title="Software Development" />
        <FaMobileAlt className="hero-icon" title="Mobile Development" />
        <FaCloud className="hero-icon" title="Cloud Solutions" />
      </div>
    </section>
  );
}

export default HeroSection;
