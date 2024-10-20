"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@mui/material";
import { Tooltip } from "antd";
import { EyeIcon } from "lucide-react";
import { fetchJobPost } from "../../redux/JobPostSlice";
import { useSelector, useDispatch } from "react-redux";
// import FilterSidebar from "./FilterSidebar";
import JobsFitered from "../components/JobsFitered"; // Ensure correct filename

// Sample locations array - you can modify this based on your needs
const LOCATIONS = [
  "New York",
  "San Francisco",
  "Chicago",
  "Miami",
  "Austin",
  "Seattle",
  "Boston",
  "Los Angeles",
  "Denver",
  "Portland",
];

const JobBoard = () => {
  const dispatch = useDispatch();
  const jobPosts = useSelector((state) => state.jobPost.data?.jobPosts);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState([0, 150000]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const jobTypes = ["Full Time", "Part Time", "Remote", "Internship"];
  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "₨0"; // Handle invalid or missing numbers
    return amount.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' }).replace("PKR", "₨");
  };
  

  useEffect(() => {
    dispatch(fetchJobPost());
  }, [dispatch]);

  const handleJobTypeChange = (type) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Filter jobs based on selected filters
  const filteredJobs = jobPosts?.filter((job) => {
    const matchesJobType =
      selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobType);
    const matchesSalary =
      job.salaryRange.min >= salaryRange[0] &&
      job.salaryRange.max <= salaryRange[1];
    const matchesLocation =
      !selectedLocation ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesJobType && matchesSalary && matchesLocation;
  });

  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-1/4">
            <JobsFitered
              jobTypes={jobTypes}
              selectedJobTypes={selectedJobTypes}
              onJobTypeChange={handleJobTypeChange}
              salaryRange={salaryRange}
              onSalaryRangeChange={(_, newValue) => setSalaryRange(newValue)}
              locations={LOCATIONS}
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
            />
          </aside>

          <section className="w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-black">Latest Jobs</h3>
              <span className="text-gray-500">
                {filteredJobs ? filteredJobs.length : 0} Result Found
              </span>
            </div>
            {filteredJobs && filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card key={job._id} className="mb-4 shadow-sm">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold">
                        {job.companyName[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {job.jobTitle}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {job.companyName} • {job.jobType} • 
                          {/* {job.salaryRange.min} - ${job.salaryRange.max} •{" "} */}
                          {formatCurrency(job?.salaryRange?.min)} - {formatCurrency(job?.salaryRange?.max)} •{" "}
                          {new Date(job.postedAt).toLocaleDateString()} <br />
                          <span className="font-semibold">{job.location}</span>
                        </p>
                      </div>
                    </div>
                    <Tooltip title="View Job Details">
                      <Link href={`/viewJobs/${job._id}`} passHref>
                        <button className="px-6 flex items-center space-x-2">
                          <EyeIcon className="w-4 h-4 text-blue-700" />
                          <span className="text-blue-500">View Job</span>
                        </button>
                      </Link>
                    </Tooltip>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No job listings available.</p>
            )}
            <button className="w-full mt-4">See All Jobs</button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default JobBoard;
