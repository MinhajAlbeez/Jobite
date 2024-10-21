import React, { useState, useRef, useEffect } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import FormField from "../helpers/FormField";
import SkillInput from "../helpers/SkillInput";
import ResumeUpload from "../components/ResumeUpload";
import CitySelector from "../components/CitySelector";
import TextField from "../helpers/TextField";
import { toast } from "react-toastify"; // Import toast
import Grid from '@mui/material/Grid'; // Import MUI Grid

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

const JobApplyModal = ({ isVisible, onClose }) => {
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [jobtype, setJobType] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [fileName, setFileName] = useState("");
  // const [salary, setSalary] = useState(25000);
  const [darkMode, setDarkMode] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const fileInputRef = useRef(null);
  const [aboutUsValue, setAboutUsValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");




  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("city", city);
    // formData.append("expectedSalary", Number(salary));
    formData.append("jobType", jobtype);
    skills.forEach((skill) => formData.append("skills[]", skill));
    formData.append("aboutUs", aboutUsValue);
    formData.append("resume", fileInputRef.current.files[0]); // File upload

    try {
      const response = await axios.post(
        // "http://localhost:8000/jobapply/create",
        "http://jobite-backend.vercel.app/jobapply/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("response",formData)
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

  // const handleSalaryChange = (e) => {
  //   setSalary(e.target.value);
  // };

  return (
    <Modal
      title="Resume Submission"
      open={isVisible}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      width={800} // Set modal width
      bodyStyle={{ overflowY: "auto", maxHeight: "70vh", paddingRight: '20px' }} // Make it scrollable
      >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {" "}
          <Grid item xs={12}>
            {" "}
            <FormField
              id="name"
              label="Full Name"
              placeholder="Enter your full name"
              darkMode={darkMode}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <CitySelector
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedProvince={selectedProvince}
              setSelectedProvince={setSelectedProvince}
              filteredCities={filteredCities}
              setCity={setCity}
              darkMode={darkMode}
            />
          </Grid>
          {/* <Grid item xs={12}>
            {" "}
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
              onChange={handleSalaryChange}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm mt-1">
              <span>25,000 PKR</span>
              <span className="font-medium">
                {Number(salary).toLocaleString()} PKR
              </span>
              <span>5,000,000 PKR</span>
            </div>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            {" "}
            {/* Half width for Current Employer */}
            <FormField
              id="employer"
              label="Current Employer"
              placeholder="Enter your current employer"
              darkMode={darkMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            {/* Half width for Current Position */}
            <FormField
              id="position"
              label="Current Position"
              placeholder="e.g. Software Engineer, Backend Developer"
              darkMode={darkMode}
            />
          </Grid>
          <Grid item xs={12}>
            {" "}
            {/* Job Type Radio Buttons */}
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
          </Grid>
          <Grid item xs={12}>
            {" "}
            {/* Skills Input */}
            <SkillInput
              skillsList={skillsList}
              skills={skills}
              setSkills={setSkills}
              skillInput={skillInput}
              setSkillInput={setSkillInput}
              darkMode={darkMode}
            />
          </Grid>
          <Grid item xs={12}>
            {" "}
            {/* About Us TextArea */}
            <TextField
              id="aboutUs"
              label="About Us"
              value={aboutUsValue}
              onChange={(e) => setAboutUsValue(e.target.value)}
              placeholder="Write about yourself"
              darkMode={darkMode}
              isTextarea={true}
            />
          </Grid>
          <Grid item xs={12}>
            {" "}
            {/* Resume Upload */}
            <ResumeUpload
              fileName={fileName}
              fileInputRef={fileInputRef}
              handleFileUpload={handleFileUpload}
              darkMode={darkMode}
            />
          </Grid>
          <Grid item xs={12} className="flex justify-between pt-6">
            {" "}
            {/* Buttons */}
            <Button
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back
            </Button>
            <Button
              type="primary"
              className="bg-blue-600 text-white hover:bg-blue-700"
              htmlType="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};

export default JobApplyModal;
