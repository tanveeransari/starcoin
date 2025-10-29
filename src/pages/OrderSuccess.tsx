import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  // PayPal details passed via navigate state
  const details: any = (location.state as any)?.details || null;

  if (!details) {
    return (
      <div className="container my-5">
        <div className="checkout-form p-4 border-radius-lg shadow-soft text-center">
          <h2 className="section-title">Thank you for your order</h2>
          <p className="text-muted">
            We couldn't find the order details. If you just completed payment, try refreshing this page from the link in
            your email.
          </p>
          <Link to="/" className="btn btn-primary mt-3">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const payer = details.payer || {};
  const pu = details.purchase_units && details.purchase_units[0];
  const shipping = pu?.shipping;

  return (
    <div className="container my-5">
      <div className="checkout-form p-4 border-radius-lg shadow-soft">
        <h2 className="section-title text-center">Thank you for your order</h2>

        <div className="mt-3">
          <h5>Order Summary</h5>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>Transaction ID:</strong> {details.id}
            </li>
            <li className="list-group-item">
              <strong>Payer:</strong> {payer.name?.given_name} {payer.name?.surname} ({payer.email_address})
            </li>
            <li className="list-group-item">
              <strong>Amount:</strong> {pu?.amount?.currency_code} {pu?.amount?.value}
            </li>
            <li className="list-group-item">
              <strong>Shipping:</strong>
              <div>{shipping?.name?.full_name}</div>
              <div>
                {shipping?.address?.address_line_1}, {shipping?.address?.admin_area_2},{" "}
                {shipping?.address?.admin_area_1} {shipping?.address?.postal_code}
              </div>
            </li>
          </ul>

          <h5>Items</h5>
          <div className="mb-3">
            {pu?.items && pu.items.length > 0 ? (
              <ul className="list-group">
                {pu.items.map((it: any, idx: number) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <div className="product-title">{it.name}</div>
                      <small className="text-muted">Qty: {it.quantity}</small>
                    </div>
                    <div className="product-price">
                      {it.unit_amount?.currency_code} {it.unit_amount?.value}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No items found in the order data.</p>
            )}
          </div>

          <div className="text-center mt-4">
            <Link to="/" className="btn btn-primary me-2">
              Back to Home
            </Link>
            <Link to="/products" className="btn btn-outline-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
