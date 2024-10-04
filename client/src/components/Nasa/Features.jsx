// components/Features.js
import React from "react";

function Features() {
  return (
    <section className="flex justify-around px-10 py-20 bg-gray-800">
      <div className="text-center">
        <div className="text-3xl font-bold mb-2">LEO</div>
        <div className="text-sm">300–1500 KM</div>
        <div className="text-sm">Low Earth Orbit</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold mb-2">H - Speed</div>
        <div className="text-sm">22,236 ML</div>
        <div className="text-sm">Orbit Geostation</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold mb-2">Earth</div>
        <div className="text-sm">365 DAY</div>
        <div className="text-sm">Orbit Period</div>
      </div>
    </section>
  );
}

export default Features;
