"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
} from "@mui/material";

const jobTypes = ["Full Time", "Part Time", "Remote", "Internship"];

const JobBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);

  const handleJobTypeChange = (type) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const jobListings = [
    {
      id: 1,
      company: "Microsoft",
      title: "Senior MERN Stack Developer",
      type: "Full Time",
      salary: "$90k - $130k",
      postedAgo: "12 hours ago",
    },
    {
      id: 2,
      company: "Google",
      title: "Frontend Engineer",
      type: "Part Time",
      salary: "$80k - $110k",
      postedAgo: "1 day ago",
    },
    {
      id: 3,
      company: "Amazon",
      title: "Backend Developer",
      type: "Full Time",
      salary: "$85k - $120k",
      postedAgo: "2 days ago",
    },
    {
      id: 4,
      company: "Apple",
      title: "iOS Developer",
      type: "Contract",
      salary: "$95k - $140k",
      postedAgo: "3 days ago",
    },
    {
      id: 5,
      company: "Meta",
      title: "Data Scientist",
      type: "Full Time",
      salary: "$100k - $150k",
      postedAgo: "5 days ago",
    },
    {
      id: 6,
      company: "Tesla",
      title: "Software Engineer",
      type: "Full Time",
      salary: "$110k - $160k",
      postedAgo: "7 hours ago",
    },
    {
      id: 7,
      company: "Netflix",
      title: "DevOps Engineer",
      type: "Part Time",
      salary: "$70k - $100k",
      postedAgo: "10 hours ago",
    },
    {
      id: 8,
      company: "Spotify",
      title: "Full Stack Developer",
      type: "Contract",
      salary: "$95k - $135k",
      postedAgo: "8 hours ago",
    },
    {
      id: 9,
      company: "Dropbox",
      title: "Senior Cloud Architect",
      type: "Full Time",
      salary: "$120k - $180k",
      postedAgo: "6 days ago",
    },
    {
      id: 10,
      company: "Twitter",
      title: "Machine Learning Engineer",
      type: "Full Time",
      salary: "$130k - $190k",
      postedAgo: "2 weeks ago",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center mb-12">
            <div className="text-2xl font-bold">Jobite</div>
            <div className="flex items-center space-x-4 ml-auto">
              <a
                href="#"
                className="text-white hover:bg-white hover:text-black transition px-2 py-1"
                style={{ borderBottom: "1px solid white" }}
              >
                Home
              </a>
              <a
                href="#"
                className="text-white hover:bg-white hover:text-black transition px-2 py-1"
                style={{ borderBottom: "1px solid white" }}
              >
                About
              </a>
              <a
                href="#"
                className="text-white hover:bg-white hover:text-black transition px-2 py-1"
                style={{ borderBottom: "1px solid white" }}
              >
                Find Job
              </a>
              <a
                href="#"
                className="text-white hover:bg-white hover:text-black transition px-2 py-1"
                style={{ borderBottom: "1px solid white" }}
              >
                Subscribe
              </a>
              <button className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
                Post a Job
              </button>
            </div>
          </nav>

          <div className="text-center mb-8">
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
                      className="pl-10 pr-24 py-3 w-full text-white bg-gray-800 border-none  "
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " />
                    <button className="absolute right-0 top-0 bottom-0 px-6 bg-blue-700 rounded-none text-white ">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4"></div>
        </div>
      </header> */}

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Job Type</CardTitle>
              </CardHeader>
              <CardContent>
                {jobTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={type}
                      checked={selectedJobTypes.includes(type)}
                      onCheckedChange={() => handleJobTypeChange(type)}
                    />
                    <label htmlFor={type}>{type}</label>
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">Advertisement</p>
              <p>You can place ads 300x360</p>
            </div>
          </aside>

          <section className="w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Latest Jobs</h3>
              <span className="text-gray-500">2,610 Result Found</span>
            </div>
            {jobListings.map((job) => (
              <Card key={job.id} className="mb-4 shadow-sm">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold">
                      M
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {job.company} • {job.type} • ${job.salary} •{" "}
                        {job.postedAgo}
                      </p>
                    </div>
                  </div>
                  <Link href="/viewJobs" passHref>
                    <button variant="outline" className="px-6">
                      View Job
                    </button>
                  </Link>
                </CardContent>
              </Card>
            ))}
            <button className="w-full mt-4">See All Jobs</button>
          </section>
        </div>
      </main>


    </div>
  );
};

export default JobBoard;
