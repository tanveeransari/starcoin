import React, { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    paypal: any;
  }
}

const Checkout: React.FC = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
  });
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
                      value: "10.00", // Replace with actual order amount
                    },
                  },
                ],
              });
            },
            onApprove: (data: any, actions: any) => {
              // Capture the order after approval
              return actions.order.capture().then((details: any) => {
                alert(
                  `Transaction completed by ${details.payer.name.given_name}`
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
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Typically, you can create your order on backend before PayPal payment or validate form.
    alert("Please complete payment using PayPal button below.");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>
          Full Name
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit" style={{ marginTop: "1rem" }}>
          Proceed to PayPal Payment
        </button>
      </form>
      <div ref={paypalRef} style={{ marginTop: "20px" }}></div>
    </div>
  );
};

export default Checkout;
