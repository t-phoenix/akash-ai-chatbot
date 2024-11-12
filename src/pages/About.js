import React from 'react';
import '../styles/about.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h2>About Akash AI</h2>
      <p>Welcome to Akash AI! This application is designed to provide users with an interactive and engaging chatbot experience.</p>
      
      <section>
        <h3>Our Vision</h3>
        <p>
          Akash AI aims to make Decentralised Opensource AI-driven conversations accessible and enjoyable for everyone.
          By integrating intelligent features and an intuitive design, we want to bridge the gap between
          technology and human interaction.
        </p>
      </section>
      
      <section>
        <h3>Key Features</h3>
        <ul>
          <li>Seamless Chat Experience</li>
          <li>Personalized AI Assistance</li>
          <li>Responsive Mobile-First Design</li>
          <li>Easy Navigation and Chat History Management</li>
        </ul>
      </section>

      <section>
        <h3>Contact Us</h3>
        <p>Have questions or feedback? Reach out to us at:</p>
        <p><strong>Email:</strong> support@akashai.com</p>
      </section>
    </div>
  );
};

export default AboutPage;