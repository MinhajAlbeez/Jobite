import Link from "next/link";
import React from "react";
import { Tooltip } from "antd";
import { EyeIcon } from "lucide-react";
import { useSelector } from "react-redux";

const CandidateCard = ({ candidate }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
const userRole = useSelector((state) => state?.auth?.userRole);
  return (
    <div className="bg-white rounded-lg shadow p-6 relative">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-900">
          {candidate.fullName}
        </h3>
        <button className="text-gray-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        {candidate.expectedSalary.toLocaleString()} PKR per month
      </p>
      <p className="text-sm mb-4 text-black">{candidate.aboutUs}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {candidate.skills.map((skill) => (
          <span
            key={skill}
            className="bg-gray-100 text-black text-xs px-2 py-1 rounded"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-500">
        {candidate.city}, Pakistan • {candidate.jobType}
      </div>
      <div className="absolute bottom-4 right-4 text-blue-700 cursor-pointer">
        {isAuthenticated &&
          (userRole === "recruiter" || userRole === "superadmin") && (
            <Tooltip title="View Employee Details">
              <Link href={`/viewUsers/${candidate.id}`} passHref>
                <button
                  variant="outline"
                  className="px-6 flex items-center space-x-2"
                >
                  <span>View</span>
                  <EyeIcon className="w-4 h-4" />
                </button>
              </Link>
            </Tooltip>
          )}
      </div>
    </div>
  );
};

export default CandidateCard;
