"use client"
import React from 'react';
import { useParams } from 'next/navigation';

const ViewUser = () => {
  const { viewUsersId } = useParams();

  // Here you would typically fetch the user data based on the ID
  // For demonstration, we'll use a placeholder
  const userData = {
    id: viewUsersId,
    fullName: 'John Doe',
    expectedSalary: 100000,
    aboutUs: 'Experienced software developer',
    skills: ['React', 'Node.js', 'Python'],
    city: 'Karachi',
    jobType: 'Full-time'
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold">{userData.fullName}</h2>
        <p className="text-gray-600">{userData.city}, Pakistan • {userData.jobType}</p>
        <p className="mt-2">Expected Salary: {userData.expectedSalary.toLocaleString()} PKR per month</p>
        <p className="mt-2">{userData.aboutUs}</p>
        <div className="mt-4">
          <h3 className="font-semibold">Skills:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {userData.skills.map((skill) => (
              <span key={skill} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;