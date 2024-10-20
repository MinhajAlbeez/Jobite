"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import InfoModal from "./InfoModal";
import JobPostModal from "./JobPostModal";
import { LogOut } from "lucide-react";
import { ToastContainer, toast } from "react-toastify"; // Importing toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../redux/authSlice"; // Adjust the import based on your file structure
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPath, setCurrentPath] = useState(""); // Track current path
  const [isInfoModalVisible, setInfoModalVisible] = useState(false); // State for InfoModal
  const [isJobPostModalVisible, setJobPostModalVisible] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const userRole = useSelector((state) => state?.auth?.userRole);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);
  // const userRole = useSelector((state) => state?.auth?.userRole);
  const isHomePage = currentPath === "/";
  let buttonText = null;

  if (isHomePage && userRole !== "seeker") {
    buttonText = "Post a Job"; // Show "Post a Job" only if not a seeker
  } else if (!isHomePage && userRole !== "recruiter") {
    buttonText = "Upload your Resume"; // Show "Upload your Resume" if not a recruiter
  }


  const showModal = () => {
    if (isHomePage) {
      setIsJobPostModalOpen(true);
    } else {
      setIsInfoModalOpen(true);
    }
  };
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isJobPosrModalOpen, setIsJobPostModalOpen] = useState(false);

  const handleClose = () => {
    setIsInfoModalOpen(false);
    setIsJobPostModalOpen(false);
  };

  // const handleLogout = () => {
  //   console.log("Logout button clicked");
  //   toast.success("Logged in successfully!");
  //   setTimeout(() => {
  //     window.location.href = "/user-auth";
  //   }, 2000);
  // };

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/api/users/logout", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         refreshToken: localStorage.getItem("refreshToken"),
  //       }),
  //     });
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       // toast.error(errorData.message || "Logout failed. Please try again.");
  //       return;
  //     }
  //     dispatch(logout());
  //     toast.success("Logged out successfully!");
  //     setTimeout(() => {
  //       window.location.href = "/user-auth"; // Redirect to login page
  //     }, 2000);
  //   } catch (error) {
  //     toast.error("An error occurred during logout. Please try again.");
  //   }
  // };

  const handleLogout = async () => {
    if (typeof window === "undefined") {
        // Avoids accessing localStorage on the server side
        toast.error("Unable to logout. Please try again.");
        return;
    }

    try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await fetch("http://localhost:8000/api/users/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken: refreshToken,
            }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || "Logout failed. Please try again.");
            return;
        }
        dispatch(logout());
        toast.success("Logged out successfully!");
        setTimeout(() => {
            window.location.href = "/user-auth"; // Redirect to login page
        }, 2000);
    } catch (error) {
        toast.error("An error occurred during logout. Please try again.");
    }
};


  return (
    <>
      <InfoModal isVisible={isInfoModalOpen} onClose={handleClose} />
      <JobPostModal isVisible={isJobPosrModalOpen} onClose={handleClose} />
      <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center mb-12 p-4 ">
            <div className="text-2xl font-bold text-white">Jobite</div>
            <div className="flex items-center space-x-4 ml-auto">
              {/* <Link
                href="/"
                className="text-white hover:bg-white hover:text-black transition px-2 py-1"
                style={{ borderBottom: "1px solid white" }}
              >
                Home
              </Link> */}
              {isAuthenticated &&
                (userRole === "recruiter" || userRole === "superadmin") && (
                  <Link
                    href="/dashboard"
                    className="text-white hover:bg-white hover:text-black transition px-2 py-1"
                    style={{ borderBottom: "1px solid white" }}
                  >
                    Dashboard
                  </Link>
                )}

              <Link
                href="/"
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
              {buttonText && (
                <button
                  onClick={showModal}
                  className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
                >
                  {buttonText}
                </button>
              )}
              {/* Logout Button */}
              <button
                onClick={handleLogout} // This should be correctly set
                className="flex items-center bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
              >
                <LogOut className="w-5 h-5 mr-2" /> {/* Adjust icon size */}
                Logout
              </button>
            </div>
          </nav>
          <div className="text-center mb-8">
            {/* <div className="flex justify-center mb-8 space-x-4">
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
            </div> */}
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
