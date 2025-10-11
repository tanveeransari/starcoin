// pages/Products.tsx
import React from "react";

type Product = {
  id: number;
  name: string;
  coins: number;
  price: number;
  imageUrl: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "350 Coins",
    coins: 350,
    price: 3.99,
    imageUrl: "/images/350-coins.png",
  },
  {
    id: 2,
    name: "1410 Coins",
    coins: 1410,
    price: 14.99,
    imageUrl: "/images/1410-coins.png",
  },
  {
    id: 3,
    name: "29000 Coins",
    coins: 29000,
    price: 299.99,
    imageUrl: "/images/29000-coins.png",
  },
  {
    id: 4,
    name: "7000 Coins",
    coins: 7000,
    price: 69.99,
    imageUrl: "/images/7000-coins.png",
  },
  {
    id: 5,
    name: "5000 Coins",
    coins: 5000,
    price: 49.99,
    imageUrl: "/images/5000-coins.png",
  },
  {
    id: 6,
    name: "10000 Coins",
    coins: 10000,
    price: 99.99,
    imageUrl: "/images/10000-coins.png",
  },
];

const Products: React.FC = () => {
  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              width: "180px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: "100%", height: "auto", borderRadius: "5px" }}
            />
            <h3 style={{ margin: "10px 0 5px" }}>{product.name}</h3>
            <p>{product.coins.toLocaleString()} coins</p>
            <p style={{ fontWeight: "bold" }}>${product.price.toFixed(2)}</p>
            <button
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#0070f3",
                border: "none",
                borderRadius: "5px",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => alert(`Selected ${product.name} for purchase`)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
