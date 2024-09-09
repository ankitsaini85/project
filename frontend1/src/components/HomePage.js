import React from 'react';
import './HomePage.css'; // Ensure your CSS file includes styles for the new content

const HomePage = () => (
  <div className="homepage">
    <header className="hero-section">
      <h1>Welcome to the Project Management Tool</h1>
      {/* <p>Please login or signup to continue.</p> */}
    </header>

    <section className="features">
      <h2>Features</h2>
      <div className="feature-item">
        <img src="/path/to/feature1.jpg" alt="Feature 1" className="feature-image" />
        <div className="feature-text">
          <h3>Task Management</h3>
          <p>Organize and track your tasks efficiently with our intuitive interface.</p>
        </div>
      </div>
      <div className="feature-item">
        <img src="/path/to/feature2.jpg" alt="Feature 2" className="feature-image" />
        <div className="feature-text">
          <h3>Team Collaboration</h3>
          <p>Collaborate with your team members in real-time to boost productivity.</p>
        </div>
      </div>
      <div className="feature-item">
        <img src="/path/to/feature3.jpg" alt="Feature 3" className="feature-image" />
        <div className="feature-text">
          <h3>Analytics & Reporting</h3>
          <p>Gain insights into your project’s progress with our comprehensive analytics.</p>
        </div>
      </div>
    </section>

    <section className="benefits">
      <h2>Benefits</h2>
      <div className="benefit-item">
        <img src="/path/to/benefit1.jpg" alt="Benefit 1" className="benefit-image" />
        <p>Boost your team's productivity and efficiency.</p>
      </div>
      <div className="benefit-item">
        <img src="/path/to/benefit2.jpg" alt="Benefit 2" className="benefit-image" />
        <p>Improve communication and collaboration among team members.</p>
      </div>
      <div className="benefit-item">
        <img src="/path/to/benefit3.jpg" alt="Benefit 3" className="benefit-image" />
        <p>Track progress and make data-driven decisions.</p>
      </div>
    </section>

    <section className="call-to-action">
      <h2>Get Started Today</h2>
      <p>Sign up now to start managing your projects more effectively.</p>
      <button className="cta-button">Sign Up</button>
    </section>
  </div>
);

export default HomePage;
