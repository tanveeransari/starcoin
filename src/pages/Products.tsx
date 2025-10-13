// pages/Products.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";
//export type { Product } from "../types";

type ProductsData = {
  products: Product[];
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/data/products.json");

        if (!response.ok) {
          throw new Error(`Failed to load products: ${response.statusText}`);
        }

        const data: ProductsData = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleBuyNow = (product: Product) => {
    // In a real app, this would add to cart or redirect to checkout
    alert(`Added ${product.name} to cart! Redirecting to checkout...`);
  };

  if (loading) {
    return (
      <div>
        {/* Hero Section */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="section-header">
              <h1 className="section-title">Our Products</h1>
              <p className="section-subtitle">
                Choose from our wide selection of StarMaker coin packages at
                unbeatable prices
              </p>
            </div>
          </div>
        </section>

        {/* Loading State */}
        <section className="py-5">
          <div className="container">
            <div className="text-center">
              <div
                className="loading-spinner mb-3"
                style={{ width: "50px", height: "50px", margin: "0 auto" }}
              ></div>
              <h4>Loading Products...</h4>
              <p className="text-muted">
                Please wait while we fetch our latest offerings
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {/* Hero Section */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="section-header">
              <h1 className="section-title">Our Products</h1>
              <p className="section-subtitle">
                Choose from our wide selection of StarMaker coin packages at
                unbeatable prices
              </p>
            </div>
          </div>
        </section>

        {/* Error State */}
        <section className="py-5">
          <div className="container">
            <div className="text-center">
              <div
                className="bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: "80px", height: "80px" }}
              >
                <i className="fas fa-exclamation-triangle fa-2x"></i>
              </div>
              <h4 className="text-danger">Error Loading Products</h4>
              <p className="text-muted mb-4">{error}</p>
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                <i className="fas fa-refresh me-2"></i>
                Try Again
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Our Products</h1>
            <p className="section-subtitle">
              Choose from our wide selection of StarMaker coin packages at
              unbeatable prices
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6">
                <div className="product-card h-100">
                  {product.popular && (
                    <div className="product-badge">
                      <i className="fas fa-star me-1"></i>
                      Popular
                    </div>
                  )}

                  <div className="position-relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-image"
                    />
                    {product.discount && (
                      <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge bg-danger fs-6">
                          -{product.discount}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="product-title">{product.name}</h5>
                    <p className="product-coins">
                      <i className="fas fa-coins me-1"></i>
                      {product.coins.toLocaleString()} coins
                    </p>

                    <div className="mt-auto">
                      <div className="d-flex align-items-center mb-3">
                        <span className="product-price">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-muted text-decoration-line-through ms-2">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        className="btn btn-buy"
                        onClick={() => handleBuyNow(product)}
                      >
                        <i className="fas fa-shopping-cart me-2"></i>
                        Buy Now
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
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h5>Instant Delivery</h5>
                <p className="text-muted small">
                  Get your coins delivered instantly after payment
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="text-center">
                <div
                  className="bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="fas fa-lock"></i>
                </div>
                <h5>Secure Payment</h5>
                <p className="text-muted small">
                  All transactions are protected with SSL encryption
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="text-center">
                <div
                  className="bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="fas fa-headset"></i>
                </div>
                <h5>24/7 Support</h5>
                <p className="text-muted small">
                  Our support team is always here to help you
                </p>
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
              <p className="text-muted mb-0">
                Select your preferred package and proceed to secure checkout.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/checkout" className="btn btn-primary btn-lg px-4 py-3">
                <i className="fas fa-credit-card me-2"></i>
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
