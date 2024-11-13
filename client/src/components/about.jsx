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

      <section className="About-mission">
        <h2>Our Mission</h2>
        <p>
          To lead the digital future by creating software solutions that drive transformation and growth. Codlify believes in innovation, quality, and dedication to help our clients achieve their potential.
        </p>
        <p>
          With a commitment to excellence, we aspire to be your partner in navigating technological challenges and unlocking new opportunities.
        </p>
        <h2>Our Vission</h2>
        <p>Vision
        To become the foremost global partner in digital transformation, recognized for empowering businesses to thrive in an evolving digital landscape. Codlify envisions a world where businesses of all sizes can seamlessly leverage emerging technologies, drive impactful change, and unlock new avenues for growth. Through a commitment to innovation, sustainability, and excellence, Codlify strives to shape the future of technology, setting industry standards for quality, integrity, and client success.</p>
      </section>

      <section className="About-values">
        <h2>Our Core Values</h2>
        <div className="values-container">
          {['Innovation', 'Collaboration', 'Integrity', 'Excellence', 'Customer Focus', 'Innovation in Diversity', 'Client Success', 'Resilience'].map(
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
                    {value === 'Innovation in Diversity' &&
                    'Valuing diverse perspectives and backgrounds as a foundation for innovative thinking and creativity in problem-solving.'}
                    {value === 'Client Success' &&
                    'Prioritizing measurable outcomes and value for our clients, focusing on solutions that drive real impact and long-term success.'}
                    {value === 'Resilience' &&
                    'Demonstrating strength and adaptability in the face of challenges, turning obstacles into opportunities for growth and learning.'}
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
