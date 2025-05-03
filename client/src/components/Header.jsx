import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const {isAuth,userName,logout} = useContext(AuthContext)
  console.log('name: ', userName);
  
  console.log('isAuth: ', isAuth);

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
          <Link to={"/properties"} className="relative group ">
            Explore Listings
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
         
          {isAuth ? (
  <div className="relative group">
    <button className="flex items-center space-x-2 focus:outline-none">
      <span className="text-white font-medium bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-full transition-all">
        {userName}
      </span>
    </button>
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
    
      <button
        onClick={logout}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
      >
        Logout
      </button>
    </div>
  </div>
) : (
  <div className="flex space-x-4">
    <Link to="/login">
      <Button variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600">
        Login
      </Button>
    </Link>
    <Link to="/signup">
      <Button variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600">
        SignUp
      </Button>
    </Link>
  </div>
)}

         
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
