// components/Header.js
import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center px-10 py-5">
      <div className="text-3xl font-bold">A-Space</div>
      <nav className="space-x-5">
        <a href="#about" className="hover:text-gray-300">About</a>
        <a href="#technology" className="hover:text-gray-300">Technology</a>
        <a href="#galaxy" className="hover:text-gray-300">Galaxy</a>
        <a href="#satellite" className="hover:text-gray-300">Satellite</a>
      </nav>
      <div className="text-sm">Agus Salman</div>
    </header>
  );
}

export default Header;
