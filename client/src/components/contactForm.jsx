import React, { useEffect } from 'react';
import './css/contact.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  

  return (
    <div className="contact-container">
      {/* Contact Form Section */}
      <div className="form-container">
        <h3>Contact Us</h3>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Describe your query" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Contact Information */}
      <section className="contact-info">
        <h4>Get in Touch</h4>
        <p>
          For inquiries, you can also contact us through the following:
        </p>
        <div className="contact-details">
          <div className="contact-item">
            <h5>Email</h5>
            <p>
              Send us an email at{' '}
              <a href="mailto:info@company.com">info@codlify.com</a>
            </p>
          </div>
          <div className="contact-item">
            <h5>Phone</h5>
            <p>Call us at: <strong>(+27) 73-7890</strong></p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h4>Frequently Asked Questions</h4>
        <p>
          Before reaching out, please check our frequently asked questions to see if we already have an answer to your inquiry.
        </p>
        <div className="faq-item">
          <h5>How can I contact support?</h5>
          <p>For support, please email us at <a href="mailto:info@company.com">info@codlify.com</a> or call (+27) 73-7890</p>
        </div>
        <div className="faq-item">
          <h5>What services do you offer?</h5>
          <p>We offer software development, web design, and tech consulting services. For more details, check our services page.</p>
        </div>
        <div className="faq-item">
          <h5>How do I become a client?</h5>
          <p>To become a client, simply contact us through the form or email us directly with your project details!</p>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
