import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link to={"/"}>
        <h1 className="text-2xl font-bold">Rentify</h1>
        </Link>
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            className="text-white focus:outline-none transition-transform duration-300 hover:scale-110"
          >
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        <nav className="hidden sm:flex space-x-4 items-center">
          <Link to={"/"} className="relative group ">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
          <Link to={"/allproperties"} className="relative group ">
            Explore Listings
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
         
          <Link to={"/login"}>
          <Button variant="outline" className="text-white cursor-pointer border-white hover:bg-white hover:text-indigo-600">
            Login
          </Button>
          </Link>

          <Link to={"/signup"}>
          <Button variant="outline" className="text-white cursor-pointer border-white hover:bg-white hover:text-indigo-600">
            SignUp
          </Button>
          </Link>
        </nav>
      </div>

      {/* Improved mobile menu with better animation */}
      <div
        className={`sm:hidden bg-indigo-700 px-4 overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ maxHeight: menuOpen ? "500px" : "0" }} // Add maxHeight for smooth transition
      >
        <div className="space-y-4 pb-2">
          <Link
            to={"/"} 
            className="block text-white py-2 hover:underline transition-all duration-300 hover:pl-2 hover:bg-indigo-600 rounded"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to={"/"} 
            className="block text-white py-2 hover:underline transition-all duration-300 hover:pl-2 hover:bg-indigo-600 rounded"
            onClick={() => setMenuOpen(false)}
          >
            Browse
          </Link>
         
          <Button 
            variant="outline" 
            className="w-full text-white border-white hover:bg-white hover:text-indigo-600 mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
