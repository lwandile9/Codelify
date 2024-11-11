import React, { useRef } from 'react';
import '../components/css/about.css';

import gsap from 'gsap'; // Make sure to have this hook if it's custom

export default function Boxes() {
  const container = useRef();
  const tl = useRef();

  const toggleTimeline = () => {
    tl.current.reversed(!tl.current.reversed());
  };

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray('.box');
      tl.current = gsap
        .timeline()
        .to(boxes[0], { x: 120, rotation: 360 })
        .to(boxes[1], { x: -120, rotation: -360 }, '<')
        .to(boxes[2], { y: -166 })
        .to(boxes[3], { opacity: 1, y: 20 })
        .reverse();
    },
    { scope: container }
  );

  return (
    <main>
      <section className="About-description">
        <h1>About Us</h1>
        <p>
          At Codlify, we’re a team of passionate software developers, designers, and strategists dedicated to building software solutions that enable digital transformation. Founded by software enthusiasts, our goal is to help businesses unlock the potential of technology to drive growth and innovation. Through collaboration, creativity, and expertise, we aim to become a trusted partner in your journey toward a digital future.
        </p>
      </section>

      <section className="boxes-container" ref={container}>
        <h2>Our Values</h2>
        <button onClick={toggleTimeline}>Toggle Timeline</button>
        
        <div className="box gradient-blue">Innovation: We push the boundaries of technology to create impactful solutions.</div>
        <div className="box gradient-blue">Collaboration: Teamwork and shared ideas drive our success.</div>
        <div className="box gradient-blue">Integrity: Transparency and honesty build trust with our clients and team.</div>
        <div className="box gradient-blue">Excellence: We deliver high-quality solutions that exceed expectations.</div>
        <div className="box gradient-blue">Customer-Centricity: We focus on understanding and meeting customer needs.</div>
      </section>
    </main>
  );
}
