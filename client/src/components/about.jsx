import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../components/css/about.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const missionRef = useRef();
  const valuesRef = useRef([]);
  const containerRef = useRef();

  useEffect(() => {
    // Enhanced animation for mission section with rotation and delay
    gsap.from(missionRef.current, {
      opacity: 0,
      y: 150,
      rotation: -10,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: missionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Multi-step animation for value boxes with stronger stagger and scale effect
    gsap.fromTo(
      valuesRef.current,
      { opacity: 0, y: 100, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.3,
        duration: 1.2,
        ease: 'elastic.out(1, 0.75)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <main ref={containerRef}>
      <section className="About-intro">
        <h1>Welcome to Codlify</h1>
        <p>
          We specialize in harnessing the power of technology to help businesses thrive in a digital world. Our team brings expertise and creativity to build impactful solutions.
        </p>
      </section>

      <section className="About-mission" ref={missionRef}>
        <h2>Our Mission</h2>
        <p>
          To lead the digital future by creating software solutions that drive transformation and growth. Codlify believes in innovation, quality, and dedication to help our clients achieve their potential.
        </p>
        <p>
          With a commitment to excellence, we aspire to be your partner in navigating technological challenges and unlocking new opportunities.
        </p>
      </section>

      <section className="About-values">
        <h2>Our Core Values</h2>
        <div className="values-container">
          {['Innovation', 'Collaboration', 'Integrity', 'Excellence', 'Customer Focus'].map(
            (value, index) => (
              <div
                key={index}
                className="value-box"
                ref={(el) => (valuesRef.current[index] = el)}
              >
                <h3>{value}</h3>
                <p>
                  {value === 'Innovation' &&
                    'Pioneering new approaches for impactful solutions.'}
                  {value === 'Collaboration' &&
                    'Our collective success is driven by teamwork and respect.'}
                  {value === 'Integrity' &&
                    'Upholding transparency and honesty in every interaction.'}
                  {value === 'Excellence' &&
                    'Delivering quality solutions that exceed expectations.'}
                  {value === 'Customer Focus' &&
                    'Understanding and addressing client needs with dedication.'}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <section className="About-cta">
        <h2>Start Your Digital Transformation with Us</h2>
        <p>
          Ready to explore how Codlify can help your business adapt, grow, and succeed in today’s fast-paced digital landscape? Let’s connect and make it happen together.
        </p>
        <Link to="/contact">  {/* Link to the contact page */}
          <button>Contact Us</button>
        </Link>
      </section>
    </main>
  );
}
