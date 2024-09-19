"use client";
import axios from "axios";
import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import FilterSidebar from "../app/components/FilterSidebar";
import SearchBar from "../app/helpers/SearchBar";
import CandidateCard from "../app/components/CandidateCard";
import Link from "next/link";
import { Search, MapPin, Bell, User, X, Upload } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfo } from "../redux/InfoSlicer";
import CountryData from "../data/CountryData.json";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

const JobiteDashboard = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    experience: [],
    locations: [],
    employmentType: [],
    skills: [],
  });
  const [locationSearch, setLocationSearch] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 5000000]);
  const [value, setValue] = useState(30);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const info = useSelector((state) => state.info.data);
  const isLoading = useSelector((state) => state.info.isLoading); // Get loading state

  const [selectedProvince, setSelectedProvince] = useState(""); // Added state for selected province
  const [cities, setCities] = useState([]); // State for cities based on selected province
  const [page, setPage] = useState(1); // Pagination page state
  const [itemsPerPage] = useState(10);
  useEffect(() => {
    dispatch(fetchInfo());
    console.log("ddddddd", dispatch);
  }, [dispatch]);

  useEffect(() => {
    console.log("Infodtaaa", info);
  }, [info]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const allLocations = [
  //   "Karachi",
  //   "Lahore",
  //   "Islamabad",
  //   "Rawalpindi",
  //   "Faisalabad",
  //   "Multan",
  //   "Peshawar",
  //   "Quetta",
  // ];
  // const filteredLocations = useMemo(
  //   () =>
  //     allLocations.filter((loc) =>
  //       loc.toLowerCase().includes(locationSearch.toLowerCase())
  //     ),
  //   [locationSearch]
  // );

  useEffect(() => {
    const provinceData = CountryData.Pakistan.Provinces.find(
      (data) => data.name === selectedProvince
    );
    setCities(provinceData ? provinceData.cities : []);
  }, [selectedProvince]);

  const filteredLocations = useMemo(() => {
    return CountryData.Pakistan.Provinces.map((data) => data.name).filter(
      (loc) => loc.toLowerCase().includes(locationSearch.toLowerCase())
    );
  }, [locationSearch]);

  const availabilityOptions = ["Full Time", "Part Time", "Contract"];

  const skillOptions = [
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "Ruby",
    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Django",
    "Flask",
    "ASP.NET",
    "Spring Boot",
    "Express.js",
    "PHP",
    "Laravel",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Oracle",
    "SQL Server",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud",
    "Git",
    "CI/CD",
    "Agile",
    "Scrum",
  ];

  const handleFilterToggle = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };
  const clearAllFilters = () => {
    setFilters({
      experience: [],
      locations: [],
      employmentType: [],
      skills: [],
    });
    setSalaryRange([0, 5000000]);
    setLocationSearch("");
    setSearchTerm("");
  };

  const allCandidates = [
    {
      id: 1,
      name: "Ali Khan",
      expectedSalary: 100000,
      intro:
        "Full-stack developer with 5 years of experience in MERN stack. Passionate about building scalable web applications and mentoring junior developers.",
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "Express.js",
        "AWS",
      ],
      city: "Lahore",
      availability: "Full Time",
    },
    {
      id: 2,
      name: "Fatima Zahra",
      expectedSalary: 120000,
      intro:
        "Senior Python developer specializing in machine learning and data analysis. Experienced in building AI-powered solutions for various industries.",
      skills: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "Django",
        "PostgreSQL",
      ],
      city: "Karachi",
      availability: "Contract",
    },
    // Add more mock candidates as needed
  ];

  const filteredCandidates = useMemo(() => {
    if (!info || !Array.isArray(info)) return [];
    
    return info.filter((candidate) => {
      const matchesSearch =
        (candidate.fullName &&
          candidate.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (candidate.aboutUs &&
          candidate.aboutUs.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (candidate.skills &&
          candidate.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          ));
      
      const matchesLocation =
        filters.locations.length === 0 ||
        filters.locations.includes(candidate.city);
      
      const matchesEmploymentType =
        filters.employmentType.length === 0 ||
        filters.employmentType.includes(candidate.jobType);
      
      const matchesSkills =
        filters.skills.length === 0 ||
        filters.skills.some(
          (skill) => candidate.skills && candidate.skills.includes(skill)
        );
      
      const matchesSalary =
        candidate.expectedSalary >= salaryRange[0] &&
        candidate.expectedSalary <= salaryRange[1];
      
      return (
        matchesSearch &&
        matchesLocation &&
        matchesEmploymentType &&
        matchesSkills &&
        matchesSalary
      );
    });
  }, [info, searchTerm, filters, salaryRange]);
  

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const paginatedCandidates = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredCandidates.slice(start, end);
  }, [page, filteredCandidates, itemsPerPage]);
  
  useEffect(() => {
    setPage(1);
  }, [filteredCandidates]);
  useEffect(() => {
    console.log("Page:", page);
    console.log("Items Per Page:", itemsPerPage);
    console.log("Total Pages:", totalPages);
    console.log("Filtered Candidates Length:", filteredCandidates.length);
  }, [page, itemsPerPage, totalPages, filteredCandidates]);
  
  
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  

  useEffect(() => {
    console.log("Filtered Candidates:", filteredCandidates);
  }, [filteredCandidates]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 text-blue-500 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2" />
            </svg>
            <span className="font-bold text-xl text-gray-800">Jobite</span>
          </div>
          <Link href="/information" passHref>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Upload your resume
            </button>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <FilterSidebar
            locationSearch={locationSearch}
            setLocationSearch={setLocationSearch}
            filteredLocations={filteredLocations}
            filters={filters}
            handleFilterToggle={handleFilterToggle}
            availabilityOptions={availabilityOptions}
            skillOptions={skillOptions}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
            clearAllFilters={clearAllFilters}
            setSelectedProvince={setSelectedProvince}
            cities={cities}
          />

          {/* Main Content */}
          <div className="flex-1">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Candidate Cards */}
            {/* Show loading spinner while fetching data */}
            {isLoading ? (
              <Box className="flex justify-center items-center h-full">
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <div className="space-y-4">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            )}
          </div>
        </div>
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </main>
    </div>
  );
};

export default JobiteDashboard;
