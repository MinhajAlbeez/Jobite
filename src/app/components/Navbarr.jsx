"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import InfoModal from "./InfoModal";
import JobPostModal from "./JobPostModal";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPath, setCurrentPath] = useState(""); // Track current path
  const [isInfoModalVisible, setInfoModalVisible] = useState(false); // State for InfoModal
  const [isJobPostModalVisible, setJobPostModalVisible] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const isHomePage = currentPath === "/";
  const buttonText = isHomePage ? "Upload your Resume" : "Post a Job";
  const showModal = () => {
    if (isHomePage) {
      setIsInfoModalOpen(true); // Open InfoModal on Home page
    } else {
      setIsJobPostModalOpen(true);
    }
  };
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isJobPosrModalOpen, setIsJobPostModalOpen] = useState(false);

  const handleClose = () => {
    setIsInfoModalOpen(false);
    setIsJobPostModalOpen(false);
  };

  return (
    <>
      <InfoModal isVisible={isInfoModalOpen} onClose={handleClose} />
      <JobPostModal isVisible={isJobPosrModalOpen} onClose={handleClose} />
      <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center mb-12">
            <div className="text-2xl font-bold">Jobite</div>
            <div className="flex items-center space-x-4 ml-auto">
              <Link
                href="/"
                className="text-white hover:bg-white hover:text-black transition px-2 py-1"
                style={{ borderBottom: "1px solid white" }}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:bg-white hover:text-black transition px-2 py-1"
                style={{ borderBottom: "1px solid white" }}
              >
                About
              </Link>
              <Link
                href="/find-job"
                className="text-white hover:bg-white hover:text-black transition px-2 py-1"
                style={{ borderBottom: "1px solid white" }}
              >
                Find Job
              </Link>
              <Link
                href="/subscribe"
                className="text-white hover:bg-white hover:text-black transition px-2 py-1"
                style={{ borderBottom: "1px solid white" }}
              >
                Subscribe
              </Link>
              <button
                onClick={showModal}
                className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
              >
                {buttonText}
              </button>
            </div>
          </nav>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-8 space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative w-full max-w-md bg-gray-900 rounded-md overflow-hidden">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-24 py-3 w-full text-white bg-gray-800 border-none"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative w-full max-w-md bg-gray-900 rounded-md overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search Location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-24 py-3 w-full text-white bg-gray-800 border-none"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button className="absolute right-0 top-0 bottom-0 px-6 bg-blue-700 rounded-none text-white">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <InfoModal
          isVisible={isInfoModalVisible}
          onClose={() => setInfoModalVisible(false)}
        />
        <JobPostModal
          isVisible={isJobPostModalVisible}
          onClose={() => setJobPostModalVisible(false)}
        /> */}
        </div>
      </header>
    </>
  );
};

export default Navbar;
