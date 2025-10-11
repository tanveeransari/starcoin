// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";

const App: React.FC = () => {
  return (
    <Router>
      <header
        style={{ padding: "1rem", background: "#282c34", color: "white" }}
      >
        <h1>StarCoin Savings</h1>
        <nav>
          <Link to="/" style={{ color: "white", marginRight: "1rem" }}>
            Home
          </Link>
          <Link to="/products" style={{ color: "white", marginRight: "1rem" }}>
            Products
          </Link>
          <Link to="/checkout" style={{ color: "white" }}>
            Checkout
          </Link>
        </nav>
      </header>
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "1px solid #eee",
        }}
      >
        &copy; 2025 StarCoin Savings
      </footer>
    </Router>
  );
};

export default App;
