// components/HeroSection.js
import React from "react";

function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-[url('/path/to/your/image.jpg')] bg-cover bg-center h-screen">
      <h1 className="text-6xl font-bold mb-4">Orbit The Earth</h1>
      <p className="text-lg max-w-lg">
        Reporting from the NASA page, a satellite is an object that orbits or
        surrounds another object in space. 
      </p>
      <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg">Get Started</button>
    </section>
  );
}

export default HeroSection;
