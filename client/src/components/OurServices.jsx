import React, { useEffect, useRef } from 'react';
import '../components/css/services.css';
import { FaLaptopCode, FaMobileAlt, FaDatabase, FaCode } from 'react-icons/fa';
import gsap from 'gsap';

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

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
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

  return (
    <div className="services-page">
      <h2 className="services-title">Our Services</h2>
      <p className="services-description">We offer a range of services to help businesses succeed in the digital world.</p>
      <div className="services-list">
        {servicesData.map((service, index) => (
          <div key={index} ref={(el) => (cardsRef.current[index] = el)}>
            <ServiceCard Icon={service.Icon} title={service.title} description={service.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
