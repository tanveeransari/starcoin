import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import CartDisplay from "./pages/CartDisplay";
import logo from "./assets/images/logo.jpg";
import OrderSuccess from "./pages/OrderSuccess";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

import "./assets/css/coloshop-theme.css";
import { CartProvider } from "./CartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import varg from "./assets/images/varg.jpg";

//const environment = process.env.ENVIRONMENT === "production" ? "production" : "sandbox";

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || ""; //|| "";
const initialOptions = {
  clientId: clientId,
  currency: "USD",
  intent: "capture",
};

const App: React.FC = () => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Router>
        <CartProvider>
          {/* Navigation */}
          <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container">
              <Link className="navbar-brand d-flex align-items-center" to="/">
                <img
                  src={logo}
                  alt={process.env.REACT_APP_SITE_NAME || "Site logo"}
                  style={{ height: 40, width: "auto", objectFit: "contain" }}
                  className="me-2"
                />
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      <i className="fas fa-home me-1"></i>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      <i className="fas fa-shopping-cart me-1"></i>
                      Cart
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main style={{ marginTop: "80px" }}>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/cart" element={<CartDisplay />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                  <h5>
                    <i className="fas fa-coins me-2"></i>
                    {process.env.REACT_APP_SITE_NAME}
                  </h5>
                  <p className="text-muted">
                    Your trusted partner for premium moto gear at unbeatable
                    prices. Save more, ride more!
                  </p>
                </div>
                <div className="col-lg-2 col-md-6 mb-4">
                  <h5>Quick Links</h5>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/cart">Cart</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <h5>Support</h5>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#help">Help Center</a>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="/faq">FAQ</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <img
                    src={varg}
                    alt="motorcycle"
                    style={{ height: 180, width: "auto", objectFit: "contain" }}
                  />
                </div>

                {/* <div className="col-lg-3 col-md-6 mb-4">
                  <h5>Connect With Us</h5>
                  <div className="d-flex">
                    <a href="#" className="me-3 text-muted">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#" className="me-3 text-muted">
                      <i className="fab fa-twitter fa-lg"></i>
                    </a>
                    <a href="#" className="me-3 text-muted">
                      <i className="fab fa-instagram fa-lg"></i>
                    </a>
                    <a href="#" className="text-muted">
                      <i className="fab fa-youtube fa-lg"></i>
                    </a>
                  </div>
                </div> */}
              </div>
              <hr className="my-4" />
              <div className="row align-items-center">
                <div className="col-md-6">
                  <p className="mb-0 text-muted">
                    &copy; 2025 {process.env.REACT_APP_SITE_NAME}. All rights
                    reserved.
                  </p>
                </div>
                <div className="col-md-6 text-md-end">
                  <a href="#privacy" className="text-muted me-3">
                    Privacy Policy
                  </a>
                  <a href="#terms" className="text-muted">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </CartProvider>
      </Router>
    </PayPalScriptProvider>
  );
};

export default App;
