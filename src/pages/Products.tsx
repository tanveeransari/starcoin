// pages/Products.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { useCart } from "../CartContext";

import PhonePouchImage from "../images/UniversalPhonePouch.jpg";
import ThreeDPrintedImg from "../images/keychain.jpg";

const productsList: Product[] = [
  {
    id: 1,

    name: "EMoto TrakPak/PhonePouch",
    price: 10.0,
    imageUrl: PhonePouchImage,
    originalPrice: 15.99,
    discount: 31,
  },
  {
    id: 2,
    name: "3D Printed Emoto Keychain - pack of 3",
    price: 20.0,
    originalPrice: 29.99,
    discount: 33,
    popular: true,
    imageUrl: ThreeDPrintedImg,
  },
];

const Products: React.FC = () => {
  //const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleQuantityChange = (productId: number, delta: number) => {
    const newQty = (quantities[productId] || 1) + delta;
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(1, newQty) }));
  };
  const handleBuyNow = (prd: Product) => {
    const quantity = quantities[prd.id] || 1;
    addItem({ ...prd, quantity });
    //navigate("/cart");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Our Products</h1>
            <p className="section-subtitle">Choose from our wide selection of moto products at unbeatable prices</p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {productsList.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6">
                <div className="product-card h-100">
                  {product.popular && (
                    <div className="product-badge">
                      <i className="fas fa-star me-1"></i>
                      Popular
                    </div>
                  )}

                  <div className="position-relative">
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                    {product.discount && (
                      <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge bg-danger fs-6">-{product.discount}%</span>
                      </div>
                    )}
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="product-title">{product.name}</h5>

                    <div className="mt-auto">
                      <div className="d-flex align-items-center mb-3">
                        <span className="product-price">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-muted text-decoration-line-through ms-2">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Selector */}
                      <div className="d-flex align-items-center justify-content-right mb-3">
                        <label className="form-label me-2 mb-0">Quantity:</label>
                        <div className="input-group" style={{ width: "120px" }}>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            onClick={() => handleQuantityChange(product.id, -1)}>
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control text-center"
                            value={quantities[product.id] || 1}
                            min="1"
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              setQuantities((prev) => ({
                                ...prev,
                                [product.id]: Math.max(1, value),
                              }));
                            }}
                          />
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            onClick={() => handleQuantityChange(product.id, 1)}>
                            +
                          </button>
                        </div>
                      </div>

                      <button className="btn btn-buy" onClick={() => handleBuyNow(product)}>
                        <i className="fas fa-shopping-cart me-2"></i>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="text-center">
                <div
                  className="bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}>
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h5>Instant Delivery</h5>
                <p className="text-muted small">Get your items delivered speedily after payment</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="text-center">
                <div
                  className="bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}>
                  <i className="fas fa-lock"></i>
                </div>
                <h5>Secure Payment</h5>
                <p className="text-muted small">All transactions are protected with SSL encryption</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="text-center">
                <div
                  className="bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}>
                  <i className="fas fa-headset"></i>
                </div>
                <h5>24/7 Support</h5>
                <p className="text-muted small">Our support team is always here to help you</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="mb-3">Ready to Make a Purchase?</h3>
              <p className="text-muted mb-0">Select your preferred package and proceed to secure checkout.</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/cart" className="btn btn-primary btn-lg px-4 py-3">
                <i className="fas fa-credit-card me-2"></i>
                Proceed to Cart
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
