// BlogSection.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './css/BlogSection.css';

function BlogSection() {
  const blogRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      blogRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1 }
    );
  }, []);

  const blogs = [
    { title: 'Digital Transformation 101', snippet: 'Learn the essentials of going digital.', link: '/blog/digital-transformation-101' },
    { title: 'Why Custom Software?', snippet: 'Explore the benefits of tailored software.', link: '/blog/why-custom-software' },
    { title: 'Tech Trends 2024', snippet: 'What’s next in technology this year?', link: '/blog/tech-trends-2024' },
  ];

  return (
    <section className="blog-section">
      <h2>Latest Blog Posts</h2>
      <div className="blog-grid">
        {blogs.map((blog, index) => (
          <div className="blog-card" ref={(el) => (blogRef.current[index] = el)} key={index}>
            <h3>{blog.title}</h3>
            <p>{blog.snippet}</p>
            <a href={blog.link} className="read-more-button">Read More</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;
