import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    paypal: any;
  }
}

const Checkout: React.FC = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [selectedProduct, setSelectedProduct] = useState({
    name: "350 Coins",
    price: 3.99,
    coins: 350,
  });
  const [isLoading, setIsLoading] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically load PayPal SDK script
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=AUY9YGjtZTcqxGKpIGZJ8Ae06sVYZh8ktiL6fnnyZ-5BQhN-A8Cid8chdj-787FDRyCwpUDsRthqYp4P&currency=USD`;
    script.addEventListener("load", () => {
      if (window.paypal && paypalRef.current) {
        window.paypal
          .Buttons({
            createOrder: (data: any, actions: any) => {
              // Set up the transaction details
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedProduct.price.toFixed(2),
                    },
                    description: `${
                      selectedProduct.name
                    } - ${selectedProduct.coins.toLocaleString()} StarMaker Coins`,
                  },
                ],
              });
            },
            onApprove: (data: any, actions: any) => {
              // Capture the order after approval
              return actions.order.capture().then((details: any) => {
                alert(
                  `Transaction completed by ${details.payer.name.given_name}! Your coins will be delivered instantly.`
                );
                // Implement post-payment logic here
              });
            },
            onError: (err: any) => {
              console.error(err);
              alert("Payment could not be processed, please try again later.");
            },
          })
          .render(paypalRef.current);
      }
    });
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate form validation
    setTimeout(() => {
      setIsLoading(false);
      alert(
        "Form validated! Please complete payment using PayPal button below."
      );
    }, 1000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Secure Checkout</h1>
            <p className="section-subtitle">
              Complete your purchase safely and securely
            </p>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row">
          {/* Order Summary */}
          <div className="col-lg-4 mb-4">
            <div className="checkout-form">
              <h4 className="mb-4">
                <i className="fas fa-shopping-cart me-2"></i>
                Order Summary
              </h4>

              <div className="d-flex align-items-center mb-3 p-3 bg-light rounded">
                <div className="me-3">
                  <i className="fas fa-coins fa-2x text-primary"></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1">{selectedProduct.name}</h6>
                  <small className="text-muted">
                    {selectedProduct.coins.toLocaleString()} coins
                  </small>
                </div>
                <div className="text-end">
                  <strong className="text-primary">
                    ${selectedProduct.price.toFixed(2)}
                  </strong>
                </div>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${selectedProduct.price.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Processing Fee:</span>
                <span>$0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong className="text-primary">
                  ${selectedProduct.price.toFixed(2)}
                </strong>
              </div>
            </div>

            {/* Security Features */}
            <div className="checkout-form">
              <h5 className="mb-3">
                <i className="fas fa-shield-alt me-2"></i>
                Security Features
              </h5>
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-check-circle text-success me-2"></i>
                <small>SSL Encrypted</small>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-check-circle text-success me-2"></i>
                <small>PayPal Protected</small>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-check-circle text-success me-2"></i>
                <small>Instant Delivery</small>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="col-lg-8">
            <div className="checkout-form">
              <h4 className="mb-4">
                <i className="fas fa-user me-2"></i>
                Customer Information
              </h4>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="address" className="form-label">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter delivery address"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terms"
                      required
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the <a href="#terms">Terms of Service</a> and{" "}
                      <a href="#privacy">Privacy Policy</a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner me-2"></span>
                      Validating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check me-2"></i>
                      Validate Information
                    </>
                  )}
                </button>
              </form>

              {/* PayPal Payment */}
              <div className="text-center">
                <h5 className="mb-3">
                  <i className="fab fa-paypal me-2"></i>
                  Complete Payment with PayPal
                </h5>
                <p className="text-muted mb-4">
                  Secure payment processing by PayPal
                </p>
                <div ref={paypalRef}></div>
              </div>
            </div>

            {/* Back to Products */}
            <div className="text-center mt-4">
              <Link to="/products" className="btn btn-outline-primary">
                <i className="fas fa-arrow-left me-2"></i>
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
