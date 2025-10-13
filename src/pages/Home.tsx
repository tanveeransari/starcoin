// pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => (
  <div>
    {/* Hero Section */}
    <section className="hero-section">
      <div className="container">
        <div className="hero-content fade-in-up">
          <h1 className="hero-title">
            Welcome to <span className="text-gradient">DesiRider Savings</span>
          </h1>
          <p className="hero-subtitle">
            Your one-stop shop for discounted StarMaker coins. Save more, play
            more!
          </p>
          <div className="mt-4">
            <Link
              to="/products"
              className="btn btn-light btn-lg me-3 px-4 py-3"
            >
              <i className="fas fa-shopping-bag me-2"></i>
              Shop Now
            </Link>
            <Link to="/cart" className="btn btn-outline-light btn-lg px-4 py-3">
              <i className="fas fa-shopping-cart me-2"></i>
              Quick Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-5">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose DesiRider Savings?</h2>
          <p className="section-subtitle">
            We offer the best deals on StarMaker coins with guaranteed delivery
            and 24/7 support.
          </p>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <h3 className="mb-3">Ready to Start Saving?</h3>
            <p className="text-muted mb-0">
              Join thousands of satisfied customers who trust DesiRider Savings
              for their gaming needs.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end">
            <Link to="/products" className="btn btn-primary btn-lg px-4 py-3">
              <i className="fas fa-arrow-right me-2"></i>
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
