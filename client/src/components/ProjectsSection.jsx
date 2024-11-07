// ProjectsSection.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './css/ProjectsSection.css';

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
    { name: 'Code Heads hub', description: 'Lorem5 lorem' },
    { name: 'NJabulo softwares', description: 'Description  lorem' },
    { name: 'Code code code', description: 'Description of Project C' },
  ];

  return (
    <section className="projects-section">
      <h2>Our Projects</h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <div className="project-card" ref={(el) => projectsRef.current[index] = el} key={index}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
