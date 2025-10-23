import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CartDisplay from "./pages/CartDisplay";

import "./coloshop-theme.css";
import { CartProvider } from "./CartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalCheckout from "./pages/PaypalCheckout";

//const environment = process.env.ENVIRONMENT === "production" ? "production" : "sandbox";

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || "";
const initialOptions = {
  clientId: clientId,
  currency: "USD",
  intent: "capture",
  //environment: environment,
  // clientSecret: clientSecret1, // For server-side use only
  // endpoint_url: "https://api-m.sandbox.paypal.com", //https://api-m.paypal.com for live
};

//console.log(initialOptions);
// if (initialOptions.environment === "production") {
//   initialOptions.endpoint_url = "https://api-m.paypal.com";
// }

const App: React.FC = () => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Router>
        <CartProvider>
          {/* Navigation */}
          <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container">
              <Link className="navbar-brand" to="/">
                <i className="fas fa-coins me-2"></i>
                {process.env.REACT_APP_SITE_NAME}
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
                    <Link className="nav-link" to="/products">
                      <i className="fas fa-shopping-bag me-1"></i>
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      <i className="fas fa-shopping-cart me-1"></i>
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/checkout">
                      <i className="fas fa-shopping-cart me-1"></i>
                      Paypal checkout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main style={{ marginTop: "80px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<CartDisplay />} />
              {/* <Route path="/checkout" element={<PayPalButtons />} /> */}
              <Route path="/checkout" element={<PaypalCheckout />} />
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
                      <Link to="/products">Products</Link>
                    </li>
                    <li>
                      <Link to="/cart">Cart</Link>
                    </li>
                    <li>
                      <Link to="/checkout">Paypal</Link>
                    </li>
                    <li>
                      <Link to="/checkout2">Paypal No React</Link>
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
                      <a href="#contact">Contact Us</a>
                    </li>
                    <li>
                      <a href="#faq">FAQ</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <h5>Connect With Us</h5>
                  {/* <div className="d-flex">
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
                  </div> */}
                </div>
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
