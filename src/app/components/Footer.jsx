import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4"> {/* Changed from py-8 to py-4 */}
      <div className="container mx-auto px-4">
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6"> */}
          {/* <div>
            <h3 className="text-lg font-bold mb-2">Company Name</h3>
            <p className="text-gray-400 text-sm">Connecting talents with opportunities</p>
          </div> */}
          {/* <div>
            <h4 className="text-md font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">Jobs</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">Contact</a></li>
            </ul>
          </div> */}
          {/* <div>
            <h4 className="text-md font-semibold mb-2">Contact Us</h4>
            <p className="text-gray-400 text-sm">123 Job Street, Career City</p>
            <p className="text-gray-400 text-sm">Email: info@company.com</p>
            <p className="text-gray-400 text-sm">Phone: (123) 456-7890</p>
          </div> */}
          {/* <div>
            <h4 className="text-md font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-gray-300 transition-colors duration-300"><Facebook size={20} /></a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300"><Twitter size={20} /></a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300"><Instagram size={20} /></a>
            </div>
          </div> */}
        {/* </div> */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Jobite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
