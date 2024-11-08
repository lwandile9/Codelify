import Footer from '../components/footer';
import React from 'react';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import BlogSection from '../components/BlogSection';

const Home = () => {
  return (
    <>

        <HeroSection />
        <ProjectsSection/>
        <BlogSection/>
        <Footer/>
      
    </>
  );
};

export default Home;
