import React from "react";
import { useCart } from "./CartContext";

declare global {
  interface Window {
    paypal: any;
  }
}

const CartDisplay: React.FC = () => {
  const { cart, removeItem, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

                <div className="d-flex gap-2">
                  <button className="btn btn-buy" onClick={clearCart}>
                    Empty Cart
                  </button>
                  <button className="btn btn-primary">Proceed to Cart</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDisplay;
