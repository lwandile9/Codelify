import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../components/css/home.css';

const RotatingText = () => {
  const textRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const texts = [
    "About Us: At Codlify, we’re passionate about crafting innovative software solutions that make a real impact. Founded on the belief that technology should empower people and businesses, we specialize in delivering high-quality, scalable, and secure software tailored to meet the evolving needs of our clients. Our team of experienced developers, designers, and strategists works collaboratively to bring ideas to life, from concept to deployment. By combining technical expertise with a commitment to outstanding service, we help organizations of all sizes transform digitally, improve efficiency, and stay ahead of the competition. Whether you’re looking for custom software, web applications, or mobile solutions, Codlify is here to make your vision a reality.",
    "Vision: To be a trusted leader in the digital transformation landscape, enabling businesses of all sizes to harness the power of technology for growth and innovation. Codlify envisions a world where technology empowers every organization to realize its full potential, stay competitive, and make a positive impact on the communities they serve.",
    "Services: At Codlify, we offer a range of services tailored to meet the diverse technology needs of businesses: Custom Software Development, Web Application Development, Mobile Application Development, Cloud Solutions, and UI/UX Design. Our bespoke solutions are designed to fit unique business requirements, enhance user experience, improve scalability, and ensure seamless performance across platforms."
  ];

  useEffect(() => {
    const rotateText = () => {
      gsap.fromTo(
        textRef.current[currentIndex], 
        { opacity: 1 }, 
        { opacity: 0, duration: 3, onComplete: () => {
          const nextIndex = (currentIndex + 1) % texts.length;
          setCurrentIndex(nextIndex);
        }}
      );
    };

    const interval = setInterval(rotateText, 4000); // 4 seconds to switch texts

    return () => clearInterval(interval);
  }, [currentIndex, texts.length]);

  useEffect(() => {
    gsap.fromTo(
      textRef.current[currentIndex], 
      { opacity: 0 }, 
      { opacity: 1, duration: 3 }
    );
  }, [currentIndex]);

  return (
    <div className='dark-bg' style={styles.container}>
      {texts.map((text, index) => (
        <div
          key={index}
          ref={(el) => textRef.current[index] = el}
          style={styles.text}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

// Styles for positioning text on the side
const styles = {
  container: {
    position: 'fixed',
    top: '8%', // Adjust the starting vertical position
    left: '50%', // Center horizontally or adjust as needed
    transform: 'translateX(-50%)', // Centers the container
    padding: '20px',
    zIndex: 1000,
    height: '100vh', // Adjust the height as needed
    width: '96.5%', // Adjust the width as needed
    backgroundColor: '#343a40', // Dark background color
    color: 'white', // White text color for contrast
     bordertop: 'none',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Optional: shadow for depth
    overflow: 'hidden', // Optional: hides any overflowed content
  },
  text: {
    opacity: 0,
    marginBottom: '20px', // Space between the texts
    position: 'absolute',
    width: '50%',
  }
};

export default RotatingText;
