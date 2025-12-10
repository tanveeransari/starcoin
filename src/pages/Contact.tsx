import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://formspree.io/f/mqagzpzj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _replyto: formData.email,
          _subject: `Contact Form: ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setStatus("✅ Thank you! Your message was sent successfully. We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("❌ There was an error sending your message. Please try again.");
      }
    } catch (error) {
      setStatus("⚠️ Network error. Please try again later.");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in-up">
            <h1 className="hero-title">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="hero-subtitle">Have a question or need assistance? We're here to help!</p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-4">
                {/* Contact Form */}
                <div className="col-lg-8">
                  <div className="p-4 border rounded shadow-sm bg-white">
                    <h2 className="section-title mb-4">Send us a Message</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="subject" className="form-label">
                          Subject <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="Order Inquiry">Order Inquiry</option>
                          <option value="Product Question">Product Question</option>
                          <option value="Sizing Help">Sizing Help</option>
                          <option value="Returns & Exchanges">Returns & Exchanges</option>
                          <option value="Shipping Question">Shipping Question</option>
                          <option value="Collaboration">Collaboration</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="message" className="form-label">
                          Message <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell us how we can help..."
                        ></textarea>
                      </div>

                      <button type="submit" className="btn btn-primary w-100">
                        <i className="fas fa-paper-plane me-2"></i>
                        Send Message
                      </button>

                      {status && (
                        <div className={`mt-3 p-3 rounded ${status.includes("✅") ? "bg-success bg-opacity-10 text-success" : status.includes("❌") || status.includes("⚠️") ? "bg-danger bg-opacity-10 text-danger" : "bg-info bg-opacity-10 text-info"}`}>
                          {status}
                        </div>
                      )}
                    </form>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="col-lg-4">
                  <div className="p-4 border rounded shadow-sm bg-white h-100">
                    <h3 className="section-title mb-4">Contact Information</h3>
                    
                    <div className="mb-4">
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px", minWidth: "50px" }}>
                          <i className="fas fa-envelope"></i>
                        </div>
                        <div>
                          <h5 className="mb-1">Email</h5>
                          <a href={`mailto:dirtriderroblox@gmail.com`} className="text-muted text-decoration-none">
                            dirtriderroblox@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px", minWidth: "50px" }}>
                          <i className="fas fa-clock"></i>
                        </div>
                        <div>
                          <h5 className="mb-1">Response Time</h5>
                          <p className="text-muted mb-0">We typically respond within 24-48 hours</p>
                        </div>
                      </div>

                      <div className="d-flex align-items-start">
                        <div className="bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px", minWidth: "50px" }}>
                          <i className="fas fa-headset"></i>
                        </div>
                        <div>
                          <h5 className="mb-1">Support</h5>
                          <p className="text-muted mb-0">Rider-focused assistance, not call center scripts</p>
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <div>
                      <h5 className="mb-3">Common Questions?</h5>
                      <p className="text-muted small mb-3">Check out our FAQ page for quick answers to common questions about orders, sizing, shipping, and more.</p>
                      <Link to="/faq" className="btn btn-outline-primary w-100">
                        <i className="fas fa-question-circle me-2"></i>
                        View FAQ
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h5>Order Support</h5>
                <p className="text-muted small">Questions about your order status, shipping, or delivery? We're here to help.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
                  <i className="fas fa-ruler-combined"></i>
                </div>
                <h5>Sizing Help</h5>
                <p className="text-muted small">Not sure about sizing? Our team can help you find the perfect fit for your gear.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
                  <i className="fas fa-handshake"></i>
                </div>
                <h5>Collaborations</h5>
                <p className="text-muted small">Interested in collaborating? Reach out to discuss partnerships and creative projects.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

