import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../components/css/home.css';

const RotatingText = () => {
  const textRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const texts = [
    {
      title: "Codlify",
      content: "At Codlify, we’re not just a software company—we’re your partner in digital transformation. Specializing in tailored, scalable, and secure software solutions, we empower businesses of all sizes to harness the potential of technology for growth and success. Whether you need custom software, web applications, or mobile solutions, our team of experienced developers and strategists is here to make it happen. Let’s Make Your Vision a Reality. Join the many organizations transforming their operations and reaching new heights with Codlify's innovative approach to technology. Reach out today and discover how we can bring your ideas to life.",
      image: './images/iStock.png'
    },
    {
      title: "About Us",
      content: "At Codlify, we’re passionate about crafting innovative software solutions that make a real impact. Founded on the belief that technology should empower people and businesses, we specialize in delivering high-quality, scalable, and secure software tailored to meet the evolving needs of our clients. Our team of experienced developers, designers, and strategists works collaboratively to bring ideas to life, from concept to deployment. By combining technical expertise with a commitment to outstanding service, we help organizations of all sizes transform digitally, improve efficiency, and stay ahead of the competition. Whether you’re looking for custom software, web applications, or mobile solutions, Codlify is here to make your vision a reality.",
      image: './images/iStock/image2.jpg'
    },
    {
      title: "Vision",
      content: "To be a trusted leader in the digital transformation landscape, enabling businesses of all sizes to harness the power of technology for growth and innovation. Codlify envisions a world where technology empowers every organization to realize its full potential, stay competitive, and make a positive impact on the communities they serve.",
      image: './images/iStock/image3.jpg'
    },
    {
      title: "Services",
      content: "At Codlify, we offer a range of services tailored to meet the diverse technology needs of businesses: Custom Software Development, Web Application Development, Mobile Application Development, Cloud Solutions, and UI/UX Design. Our bespoke solutions are designed to fit unique business requirements, enhance user experience, improve scalability, and ensure seamless performance across platforms.",
      image: './images/iStock/image4.jpg'
    }
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
      {texts.map((item, index) => (
        <div
          key={index}
          ref={(el) => textRef.current[index] = el}
          style={styles.text}
        >
          <img src={item.image} alt={item.title} style={styles.image} />
          <h2 className="text-title" style={styles.title}>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

// Styles for positioning text and image
const styles = {
  container: {
    position: 'fixed',
    top: '8%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '20px',
    zIndex: 1000,
    height: '100vh',
    width: '96.5%',
    backgroundColor: '#343a40',
    color: 'white',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
  },
  text: {
    opacity: 0,
    marginBottom: '20px',
    position: 'absolute',
    width: '50%',
    textAlign: 'center',
  },
  title: {
    color: 'pink',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '20px',
  }
};

export default RotatingText;
