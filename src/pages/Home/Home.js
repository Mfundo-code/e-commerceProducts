import React from "react";
import HeroSection from "./HomeComponents/HeroSection";
import CallToActionSection from "./HomeComponents/CallToActionSection";
import ProductsSection from "./HomeComponents/ProductsSection";
import AboutMe from "./HomeComponents/AboutMe"

const Home = () => {
  return (
    <main>
      <HeroSection />
      <AboutMe />
      <ProductsSection />
      <CallToActionSection />
    </main>
  );
};

export default Home;
