"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import FormField from "../helpers/FormField";
import SkillInput from "../helpers/SkillInput";
import ResumeUpload from "../components/ResumeUpload";
import Button from "../helpers/Button";
import CitySelector from "../components/CitySelector";
import Link from "next/link";
import TextField from "../helpers/TextField";
import { toast } from "react-toastify"; // Import toast

const pakistaniCities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
];

const skillsList = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "SQL",
  "Machine Learning",
  "Data Analysis",
  "Project Management",
  "Agile",
  "UI/UX Design",
  "DevOps",
  "Cloud Computing",
  "Cybersecurity",
];

const ResumePortal = () => {
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [jobtype, setJobType] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [fileName, setFileName] = useState("");
  const [salary, setSalary] = useState(25000);
  const [darkMode, setDarkMode] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const fileInputRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aboutUsValue, setAboutUsValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("city", city);
    formData.append("expectedSalary", Number(salary));
    formData.append("jobType", jobtype);
    skills.forEach((skill) => formData.append("skills[]", skill));
    formData.append("aboutUs", aboutUsValue);
    formData.append("resume", fileInputRef.current.files[0]); // File upload
    try {
      const response = await axios.post(
        // "http://localhost:8000/info/createInfo",
        "https://jobite-server.vercel.app/info/createInfo",

        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Submission successful!");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("There was an error!", error);
      toast.error("Submission failed. Please try again.");
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setFilteredCities(
      pakistaniCities.filter((c) =>
        c.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
    } else {
      alert("Please upload a PDF file.");
      e.target.value = "";
    }
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  return (
    <Container darkMode={darkMode}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-grow flex items-center justify-center p-8">
        <div
          className={`${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } rounded-lg shadow-xl p-8 w-full max-w-2xl transition-colors duration-200`}
        >
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Personal Information
          </h2>
          <FormField
            id="name"
            label="Full Name"
            placeholder="Enter your full name"
            darkMode={darkMode}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CitySelector
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            filteredCities={filteredCities}
            setCity={setCity}
            darkMode={darkMode}
          />
          <div>
            <label htmlFor="salary" className="block text-sm font-medium mb-1">
              Expected Salary (PKR)
            </label>
            <input
              type="range"
              id="salary"
              min="25000"
              max="5000000"
              step="5000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm mt-1">
              <span>25,000 PKR</span>
              <span className="font-medium">
                {Number(salary).toLocaleString()} PKR
              </span>
              <span>5,000,000 PKR</span>
            </div>
          </div>
          <FormField
            id="employer"
            label="Current Employer"
            placeholder="Enter your current employer"
            darkMode={darkMode}
          />
          <FormField
            id="position"
            label="Current Position"
            placeholder="e.g. Software Engineer, Backend Developer"
            darkMode={darkMode}
          />
          <div>
            <label className="block text-sm font-medium mb-2">Job Type</label>
            <div className="flex space-x-4">
              {["Full Time", "Part Time", "Contract"].map((type) => (
                <label key={type} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="jobType"
                    value={type}
                    onChange={(e) => setJobType(e.target.value)}
                    checked={jobtype === type}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>
          </div>
          <SkillInput
            skillsList={skillsList}
            skills={skills}
            setSkills={setSkills}
            skillInput={skillInput}
            setSkillInput={setSkillInput}
            darkMode={darkMode}
          />
          <TextField
            id="aboutUs"
            label="About Us"
            value={aboutUsValue}
            onChange={(e) => setAboutUsValue(e.target.value)}
            placeholder="Write about yourself"
            darkMode={false}
            isTextarea={true}
          />
          <ResumeUpload
            fileName={fileName}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
            darkMode={darkMode}
          />
          <div className="flex justify-between pt-6">
            <Link href="/">
              <Button
                className={`${
                  darkMode
                    ? "border-gray-600 text-white hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Back
              </Button>
            </Link>
            <Button
              className="border-transparent bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ResumePortal;
