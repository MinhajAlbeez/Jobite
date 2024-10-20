"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation"; // useParams for getting dynamic route params
import { useSelector } from "react-redux";
import {
  Calendar,
  Clock,
  Briefcase,
  DollarSign,
  MapPin,
  Building,
  Users,
  Code,
  CheckCircle,
  Globe,
} from "lucide-react";
import { toast } from "react-toastify";
import JobApplyModal from "@/app/components/JobApply";

const ViewJobs = () => {
  const { viewJobsId } = useParams();
  const jobPosts = useSelector((state) => state.jobPost.data?.jobPosts); // Fetch jobPosts from Redux
  const job = jobPosts?.find((job) => job._id === viewJobsId);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const userRole = useSelector((state) => state?.auth?.userRole); // Access userRole from Redux state
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log("Job Posts:", jobPosts);
  console.log("View Jobs ID:", viewJobsId);
  console.log("Found Job:", job); // Log the found job
  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "₨0"; // Handle invalid or missing numbers
    return amount.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' }).replace("PKR", "₨");
  };
  
  // Usage in your component
  <p>
    {formatCurrency(job?.salaryRange?.min)} - {formatCurrency(job?.salaryRange?.max)}
  </p>
  

  // if (!job) {
  //   return <p>Job not found!</p>; // Fallback if no job is found with the given ID
  // }

  // const handleClick = () => {
  //   console.log('User Role:', role); // Check the userRole value
  //   if (!isAuthenticated) {
  //     toast.error("You need to log in to apply for this position.");
  //     setTimeout(() => {
  //       window.location.href = "/user-auth";
  //     }, 2000);
  //     return;
  //   }
  //   if (role !== "recruiter" && role !== "superadmin") {
  //     alert("You do not have permission to apply for this position.");
  //     return;
  //   }
  //   alert("Applying for the position...");
  // };

  console.log("Job Posts:", jobPosts);
  console.log("View Jobs ID:", viewJobsId);
  console.log("Found Job:", job);
  const handleClick = () => {
    console.log('User Role:', userRole); // Check the userRole value

    if (!isAuthenticated) {
      toast.error("You need to log in to apply for this position.");
      setTimeout(() => {
        window.location.href = "/user-auth";
      }, 2000);
      return;
    }

    if (userRole !== "seeker" && userRole !== "superadmin") {
      toast.error("You do not have permission to apply for this position.");
      return;
    }

    setIsModalVisible(true);
  };
  
  
  

  return (
    <> 
     <JobApplyModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)} // Close modal
      />
    <div className="bg-white min-h-screen py-12">
      <main className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 bg-gray-100 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-black p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{job?.companyName}</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  <h3 className="text-xl">{job?.position}</h3>{" "}
                  {/* Display Position */}
                </div>
                <a
                  href={job?.companyWebsite} // Use dynamic company website link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  <span className="text-sm">{job?.companyWebsite}</span>{" "}
                  {/* Display the URL as the name */}
                </a>
              </div>
            </div>
            <div className="p-6 space-y-8 bg-gray-100">
              <section>
                <h4 className="text-xl font-semibold mb-4 text-black flex items-center">
                  <Code className="w-6 h-6 mr-2 text-gray-700" />
                  Job Description
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {job?.description} {/* Display Job Description */}
                </p>
              </section>
              <section>
                <h4 className="text-xl font-semibold mb-4 text-black flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-gray-700" />
                  Key Responsibilities
                </h4>
                <ul className="space-y-2 text-gray-700">
                  {[
                    "Design and implement scalable backend services using Node.js and Express",
                    "Develop responsive and interactive front-end interfaces using React",
                    "Work with MongoDB to design efficient database schemas and queries",
                    "Collaborate with cross-functional teams to define and implement new features",
                    "Optimize application performance and ensure high-quality code standards",
                    "Mentor junior developers and contribute to the team's technical growth",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-black mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="text-xl font-semibold mb-4 text-black flex items-center">
                  <Users className="w-6 h-6 mr-2 text-gray-700" />
                  Requirements
                </h4>
                <ul className="space-y-2 text-gray-700">
                  {job?.requirements.map(
                    (
                      requirement,
                      index // Map requirements from the job object
                    ) => (
                      <li key={index} className="flex items-start">
                        <span className="text-black mr-2">•</span>
                        {requirement}
                      </li>
                    )
                  )}
                </ul>
              </section>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-gray-100 p-6 rounded-xl shadow-lg sticky top-8">
              <h4 className="text-xl font-semibold mb-6 text-black">
                Job Details
              </h4>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Posted:</span>
                  <span className="ml-2">
                    {new Date(job?.postedAt).toLocaleDateString()}
                  </span>{" "}
                  {/* Display Posted Date */}
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Job Type:</span>
                  <span className="ml-2">{job?.jobType}</span>{" "}
                  {/* Display Job Type */}
                </div>
                <div className="flex items-center text-gray-700">
                  <Briefcase className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Role:</span>
                  <span className="ml-2">{job?.position}</span>{" "}
                  {/* Display Position */}
                </div>
                <div className="flex items-center text-gray-700">
                  <DollarSign className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Salary:</span>
                  <span className="ml-2">
                  {formatCurrency(job?.salaryRange?.min)} - {formatCurrency(job?.salaryRange?.max)}
                  </span>{" "}
                  {/* Display Salary Range */}
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">{job?.location}</span>{" "}
                  {/* Display Location */}
                </div>
              </div>

              <button
                className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                onClick={handleClick}
              >
                Apply for this position
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                By clicking &quot;Apply&quot;, you agree to our terms of service
                and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default ViewJobs;
