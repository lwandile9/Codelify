// ProjectsSection.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './css/ProjectsSection.css';
import "../components/css/card.css";
import Card from '../pages/card.jsx';

function ProjectsSection() {
  const projectsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      projectsRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1 }
    );
  }, []);

  const projects = [
    { 
      name: 'Code Heads Hub', 
      description: 'Learning Hub',  
      image: '/images/codeheads.png', 
      link: 'https://codeheadshublms.netlify.app/' 
     
    },
    { 
      name: 'Back-End Rest API', 
      description: 'Basic Crud',  
      image: '/images/toto.png', 
      link: 'https://github.com/lwandile9/crud-rest-api-app' 
    },
    { 
      name: 'The Rise of AI', 
      description: 'Python Data Analysis',  
      image: '/images/python.png', 
      link: 'https://github.com/Gcina-jpy/The-rise-of-AI.git' 
    },
  ];

  return (
    <section className="projects-section">
      <h2>Our Projects</h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <div className="project-card" ref={(el) => projectsRef.current[index] = el} key={index}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <div className='project-card-image'><img src={project.image} alt={project.name} className="project-image" /></div>
           
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
