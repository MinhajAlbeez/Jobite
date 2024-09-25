import React from "react";

const Page = () => {
  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="flex">
          <div className="w-2/3 bg-white p-8 rounded-lg shadow-lg mr-4">
            {" "}
            {/* Changed from w-3/4 to w-2/3 */}
            <h2 className="text-2xl font-bold mb-4">
              Need Senior MERN Stack Developer
            </h2>
            <h3 className="text-lg font-semibold mb-4">Microsoft</h3>
            <h4 className="text-lg font-bold mb-2">Description</h4>
            <p className="text-gray-600 mb-4">
              Here is a sample job description for a social media manager...
              Here is a sample job description for a social media manager...
              Here is a sample job description for a social media manager...
              Here is a sample job description for a social media manager...
              Here is a sample job description for a social media manager...
              Here is a sample job description for a social media manager...
              Here is a sample job description for a social media manager...
            </p>
            <h4 className="text-lg font-bold mb-2">Overview</h4>
            <p className="text-gray-600 mb-4">
              Are you passionate about creating engaging and creative content...
              Are you passionate about creating engaging and creative content...
              Are you passionate about creating engaging and creative content...
              Are you passionate about creating engaging and creative content...
              {/* Content truncated for brevity */}
            </p>
            <h4 className="text-lg font-bold mb-2 mt-4">Requirements</h4>
            <ul className="list-disc list-inside">
              <li>You have at least 4 years of experience...</li>
              <li>Solid experience as a UI designer in SaaS...</li>
              <li>Solid experience as a UI designer in SaaS...</li>
              <li>Solid experience as a UI designer in SaaS...</li>
              <li>Solid experience as a UI designer in SaaS...</li>
              <li>Solid experience as a UI designer in SaaS...</li>

              <li>
                Additional requirement for longer content to check height
                adjustment...
              </li>
            </ul>
          </div>

          <div
            className="w-1/4 bg-white p-4 rounded-lg shadow-lg"
            style={{ height: "300px" }}
          >
            <h4 className="text-lg font-semibold mb-4">
              Apply for this position
            </h4>
            <div className="mb-2">
              <span className="font-bold">Date Posted:</span> Apr 04, 2023
            </div>
            <div className="mb-2">
              <span className="font-bold">Job Type:</span> Full Time
            </div>
            <div className="mb-2">
              <span className="font-bold">Job Role:</span> Product Designer
            </div>
            <div className="mb-2">
              <span className="font-bold">Salary:</span> $5k - $7k
            </div>
            <button className="bg-blue-600 text-white w-full py-1 rounded-lg hover:bg-blue-500 transition">
              Apply for this position
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
