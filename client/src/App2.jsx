// App.js
import React from "react";
import Header from "./components/Nasa/Header.jsx";
import HeroSection from "./components/Nasa/HeroSection.jsx";
import Features from "./components/Nasa/Features";
import Mission from "./components/Nasa/Mission";
import Satellite from "./components/Nasa/Satellite";
import Footer from "./components/Nasa//Footer";

function App() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen">
      <Header />
      <HeroSection />
      <Features />
      <Mission />
      <Satellite />
      <Footer />
    </div>
  );
}

export default App;
