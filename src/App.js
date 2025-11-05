import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./GlobalComponents/Header";
import Footer from "./GlobalComponents/Footer";
import ScrollToTop from "./GlobalComponents/ScrollToTop"; 
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Products from "./pages/Products/Products";
import Contacts from "./pages/Contacts/Contacts";
import Cart from "./pages/Cart/Cart";
import FloatingButtons from "./GlobalComponents/FloatingButtons";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <main style={{ padding: 0, margin: 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;