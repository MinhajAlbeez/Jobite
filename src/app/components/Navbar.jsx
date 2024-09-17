// components/Navbar.js
import { Sun, Moon } from "lucide-react";

const Navbar = ({ darkMode, setDarkMode }) => (
  <nav
    className={`${
      darkMode ? "bg-gray-800" : "bg-white"
    } text-white p-4 shadow-md`}
  >
    <div className="container mx-auto flex justify-between items-center">
      <h1
        className={`text-xl font-bold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Resume Portal
      </h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  </nav>
);

export default Navbar;
