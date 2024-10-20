import React from "react";
import {
  User,
  DollarSign,
  MapPin,
  Building,
  Briefcase,
  FileText,
  Download,
  Code,
} from "lucide-react";

const ViewEmployee = () => {
  // Sample skills data
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Git",
    "Docker",
    "AWS",
    "TypeScript",
    "GraphQL",
  ];

  return (
    <div className="bg-white min-h-screen py-12">
      <main className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 bg-gray-100 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-black p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">John Doe</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  <h3 className="text-xl">Senior Software Engineer</h3>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-8 bg-gray-100">
              <section>
                <h4 className="text-xl font-semibold mb-4 text-black flex items-center">
                  <User className="w-6 h-6 mr-2 text-gray-700" />
                  About
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  John is a passionate software engineer with over 8 years of experience in full-stack development. He specializes in building scalable web applications using modern technologies and best practices. John is a team player with excellent communication skills and a drive for continuous learning and improvement.
                </p>
              </section>

              <section>
                <h4 className="text-xl font-semibold mb-4 text-black flex items-center">
                  <Code className="w-6 h-6 mr-2 text-gray-700" />
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-xl font-semibold mb-4 text-black flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-gray-700" />
                  Resume
                </h4>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <iframe
                    //   src="/path/to/resume.pdf"
                      className="w-full h-full"
                      title="Resume PDF Viewer"
                    ></iframe>
                  </div>
                  <a
                    href="/path/to/resume.pdf"
                    download
                    className="flex items-center justify-center bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </a>
                </div>
              </section>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-gray-100 p-6 rounded-xl shadow-lg sticky top-8">
              <h4 className="text-xl font-semibold mb-6 text-black">
                Employee Details
              </h4>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-700">
                  <DollarSign className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Expected Salary:</span>
                  <span className="ml-2">$120,000 - $150,000</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">San Francisco, USA</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Building className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Current Employer:</span>
                  <span className="ml-2">TechCorp Inc.</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Briefcase className="w-5 h-5 mr-3 text-black" />
                  <span className="font-medium">Current Position:</span>
                  <span className="ml-2">Senior Software Engineer</span>
                </div>
              </div>

              <button className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                Contact John
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                By clicking "Contact", you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewEmployee;