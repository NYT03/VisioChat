// components/Satellite.js
import React from "react";

function Satellite() {
  return (
    <section className="px-10 py-20 bg-gray-800">
      <h2 className="text-4xl font-bold mb-4">Function - Satellite</h2>
      <p className="text-lg">
        Gives light at night. Affects the balance of sea water. Transmits
        television signals, cell phones, and the internet. Transmits and
        receives communication signals.
      </p>
      <div className="mt-8 flex space-x-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">View All</button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">Submit</button>
      </div>
    </section>
  );
}

export default Satellite;
