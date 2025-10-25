import React, { useId } from "react";
import { useState } from "react";
import { useCart } from "../CartContext";
import PaypalCheckoutNoReact from "./PaypalCheckout";

const CartDisplay: React.FC = () => {
  const orderId = useId(); // Generate a unique order ID for this session. In a real application, you would likely want to generate this on the server side when the order is created
  const { cart, removeItem, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearMyCart = () => {
    clearCart();
    setFormData({
      orderId: "",
      productIds: "",
      productNames: "",
      productQuantities: "",
      productPrices: "",
      totalAmount: "",
      name: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });
  };

  const [formData, setFormData] = useState({
    orderId: orderId,
    productIds: cart.map((item) => item.id).join(","),
    productNames: cart.map((item) => item.name).join(","),
    productQuantities: cart.map((item) => item.quantity).join(","),
    productPrices: cart.map((item) => item.price.toFixed(2)).join(","),
    totalAmount: total.toFixed(2),
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic front-end validation
    if (
      !formData.orderId ||
      !formData.name ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.zip ||
      !formData.email
    ) {
      setStatus("Please fill in all required fields.");
      return;
    }

    setStatus("Sending...");

    try {
      const response = await fetch("https://formspree.io/f/mqagzpzj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("✅ Thank you! Your information was sent successfully.");
        // setFormData({
        //   orderId: orderId,
        // });
      } else {
        setStatus("❌ There was an error sending your information.");
      }
    } catch (error) {
      setStatus("⚠️ Network error. Please try again later.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10">
          <div className="checkout-form p-4 border-radius-lg shadow-soft">
            <h2 className="section-title text-center">Shopping Cart</h2>

            {cart.length === 0 ? (
              <p className="text-center">Your cart is empty</p>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <div className="product-title">{item.name}</div>
                        <small className="text-muted">
                          Qty: {item.quantity}
                        </small>
                      </div>
                      <div className="text-end">
                        <div className="product-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="mt-2">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Total:</h5>
                  <h4 className="text-gradient mb-0">${total.toFixed(2)}</h4>
                </div>

                <div className="d-flex gap-5 mb-4">
                  <form
                    onSubmit={handleSubmit}
                    className="p-4 border rounded shadow-sm bg-white"
                  >
                    <h2 className="mb-3">Shipping Information</h2>

                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />

                    <input
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone (optional)"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                    />

                    <button type="submit" className="btn btn-primary w-100">
                      Continue to Checkout
                    </button>

                    <p className="text-sm mt-2 text-gray-700">{status}</p>
                  </form>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-buy" onClick={clearMyCart}>
                    Empty Cart
                  </button>
                </div>
                <PaypalCheckoutNoReact addressInfo={formData} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDisplay;
