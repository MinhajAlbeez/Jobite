import React from "react";
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

const ViewJobs = () => {
  return (
    <div className="bg-white min-h-screen py-12">
      <main className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 bg-gray-100 rounded-xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-black p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">
                Senior MERN Stack Developer
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  <h3 className="text-xl">Microsoft</h3>
                </div>
                <a
                  href="https://www.microsoft.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  <span className="text-sm">Company Website</span>
                </a>
              </div>
            </div>

            {/* Quick Info Section */}
            {/* <div className="bg-white p-6 flex flex-wrap gap-4 text-sm text-gray-700 border-b border-gray-200">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-black" />
                Seattle, WA (Hybrid)
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-black" />
                Full Time
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-black" />
                Posted: Apr 04, 2023
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-black" />
                $120k - $160k / year
              </div>
            </div> */}

            {/* Main Content */}
            <div className="p-6 space-y-8 bg-gray-100">
              {/* Job Description */}
              <section>
                <h4 className="text-xl font-semibold mb-4 text-black flex items-center">
                  <Code className="w-6 h-6 mr-2 text-gray-700" />
                  Job Description
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  We are seeking a talented and experienced Senior MERN Stack
                  Developer to join our dynamic team. In this role, you will be
                  responsible for developing and maintaining high-performance
                  web applications using MongoDB, Express.js, React, and
                  Node.js. You will work closely with our product and design
                  teams to deliver exceptional user experiences and drive
                  innovation in our tech stack.
                </p>
              </section>

              {/* Key Responsibilities */}
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

              {/* Requirements */}
              <section>
                <h4 className="text-xl font-semibold mb-4 text-black flex items-center">
                  <Users className="w-6 h-6 mr-2 text-gray-700" />
                  Requirements
                </h4>
                <ul className="space-y-2 text-gray-700">
                  {[
                    "5+ years of experience with the MERN stack (MongoDB, Express, React, Node.js)",
                    "Strong understanding of JavaScript, including ES6+ features",
                    "Experience with state management libraries (e.g., Redux, MobX)",
                    "Familiarity with RESTful API design and implementation",
                    "Knowledge of version control systems (Git) and CI/CD pipelines",
                    "Excellent problem-solving and communication skills",
                    "Bachelor's degree in Computer Science or related field (or equivalent experience)",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-black mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Application Card */}
          <div className="lg:w-1/3">
            <div className="bg-gray-100 p-6 rounded-xl shadow-lg sticky top-8">
              <h4 className="text-xl font-semibold mb-6 text-black">
                Job Details
              </h4>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Posted:</span>
                  <span className="ml-2">Apr 04, 2023</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Job Type:</span>
                  <span className="ml-2">Full Time</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Briefcase className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Role:</span>
                  <span className="ml-2">Senior Developer</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <DollarSign className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Salary:</span>
                  <span className="ml-2">$120k - $160k / year</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">Seattle, WA (Hybrid)</span>
                </div>
              </div>

              <button className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                Apply for this position
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                By clicking "Apply", you agree to our terms of service and
                privacy policy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewJobs;
