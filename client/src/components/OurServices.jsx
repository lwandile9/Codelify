import React, { useEffect, useRef, useState } from 'react';
import '../components/css/services.css';
import { FaLaptopCode, FaMobileAlt, FaDatabase, FaCode } from 'react-icons/fa';
import gsap from 'gsap';

// Typing effect component using GSAP
const TypingText = () => {
  const typingRef = useRef(null);

  useEffect(() => {
    const text = "We provide top-tier solutions that elevate your business.";
    const textArray = text.split("");
    typingRef.current.innerHTML = "";
    textArray.forEach((char, i) => {
      const span = document.createElement("span");
      span.innerHTML = char;
      typingRef.current.appendChild(span);
    });

    gsap.fromTo(
      typingRef.current.querySelectorAll("span"),
      { opacity: 0, y: "50%", scale: 0.7 },
      {
        opacity: 1,
        y: "0%",
        scale: 1,
        duration: 0.1,
        stagger: 0.05,
        ease: "power3.out",
      }
    );
  }, []);

  return <div className="typing-text" ref={typingRef} />;
};

// Service Card Component
const ServiceCard = ({ Icon, title, description }) => {
  return (
    <div className="service-card">
      <div className="icon-container">
        <Icon size={40} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const OurServices = () => {
  const cardsRef = useRef([]);
  const testimonialsRef = useRef([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 60, scale: 0.85, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'expo.out',
      }
    );

    gsap.fromTo(
      testimonialsRef.current,
      { opacity: 0, x: "-100%", scale: 0.9 },
      {
        opacity: 1,
        x: "0%",
        scale: 1,
        duration: 1.5,
        stagger: 0.4,
        ease: "power4.out",
      }
    );
  }, []);

  const servicesData = [
    {
      Icon: FaLaptopCode,
      title: 'Custom Software Development',
      description: 'We offer tailored software solutions to meet your unique business requirements.',
    },
    {
      Icon: FaCode,
      title: 'Website Development',
      description: 'Professional and modern websites built for high performance and user engagement.',
    },
    {
      Icon: FaDatabase,
      title: 'Database Optimization',
      description: 'Efficient and scalable database solutions to keep your data organized and accessible.',
    },
    {
      Icon: FaMobileAlt,
      title: 'Mobile App Development',
      description: 'Feature-rich mobile apps designed for both iOS and Android platforms.',
    },
  ];

  const testimonials = [
    {
      name: 'John Doe',
      feedback: 'This team transformed our online presence. They are true experts in the digital space.',
    },
    {
      name: 'Jane Smith',
      feedback: 'Their custom software solutions have greatly improved our business efficiency. Highly recommended!',
    },
    {
      name: 'Michael Brown',
      feedback: 'A professional and dedicated team that delivered exactly what we needed for our project.',
    },
  ];

  return (
    <div className="services-page">
      <h2 className="services-title">Our Services</h2>

      {/* Typing text effect before the cards */}
      <TypingText />

      <p className="services-description">
        We offer a range of services to help businesses succeed in the digital world. From custom software to optimized databases, our solutions are designed to scale and grow with you.
      </p>

      {/* Button to request a service */}
      <button
        className="request-service-button"
        onClick={() => setShowForm(true)}
      >
        Request a Service
      </button>

      {/* Service Cards */}
      <div className="services-list">
        {servicesData.map((service, index) => (
          <div key={index} ref={(el) => (cardsRef.current[index] = el)}>
            <ServiceCard Icon={service.Icon} title={service.title} description={service.description} />
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="form-overlay" onClick={() => setShowForm(false)}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <h3>Request a Service</h3>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Describe your service request" required></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <div className="testimonials">
        <h3 className="testimonials-title">What Our Clients Say</h3>
        <div className="testimonials-list">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index} ref={(el) => (testimonialsRef.current[index] = el)}>
              <p className="testimonial-feedback">"{testimonial.feedback}"</p>
              <p className="testimonial-name">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
