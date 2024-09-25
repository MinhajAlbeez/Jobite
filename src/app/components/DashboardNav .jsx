import React from 'react';
import Link from 'next/link'; // Adjust import based on your routing library
import { Search, MapPin, Bell, User, X, Upload } from "lucide-react";

const DashboardNav = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg
            className="w-8 h-8 text-blue-500 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2" />
          </svg>
          <span className="font-bold text-xl text-gray-800">Jobite</span>
        </div>
        <Link href="/information" passHref>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Upload your resume
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default DashboardNav;
