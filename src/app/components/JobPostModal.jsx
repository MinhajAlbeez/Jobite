import React, { useState } from "react";
import { Button, Modal } from "antd";
import TextField from "../helpers/TextField";
import CitySelector from "./CitySelector";
import TextAreaInput from "../helpers/TextAreaInput";
import SliderInput from "../helpers/SliderInput ";
import DateInput from "../helpers/DateInput";
import { Grid } from "@mui/material";
import axios from "axios";
import SimpleSalaryRange from "../helpers/JobFilterSidebar";

const JobPostModal = ({ isVisible, onClose }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [city, setCity] = useState("");
  const [jobType, setJobType] = useState(""); // Consistent naming
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [salaryRange, setSalaryRange] = useState([]); // Initialize as an array
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([]); // Change to an array
  const [applicationDeadline, setApplicationDeadline] = useState("");

  const handleSalaryChange = (newSalary) => {
    console.log("Selected salary range:", newSalary);
    setSalaryRange(newSalary); // Update the state with the new salary object
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!companyName || !jobTitle || !city || !jobType) {
      console.error("Please fill in all required fields.");
      return; // Prevent submission if required fields are empty
    }

    const formData = {
      companyName,
      companyWebsite,
      jobTitle,
      contactEmail: companyEmail,
      position: jobRole,
      location: city,
      jobType, // Consistent naming
      salaryRange,
      description,
      requirements, // Ensure this is an array of requirements
      applicationDeadline,
    };

    console.log("Payload", formData);

    try {
      const response = await axios.post(
        // "http://localhost:8000/jobposts/create",
        "http://jobite-backend.vercel.app/jobposts/create",
        formData
      );
      console.log("Job Post Created:", response.data);
      onClose();
    } catch (error) {
      console.error("Error creating job post:", error);
      // You can also handle displaying an error message to the user here
    }
  };

  return (
    <Modal
      open={isVisible}
      onOk={handleSubmit}
      onCancel={onClose}
      okText="Post Job"
      cancelText="Cancel"
      width={800}
      // style={{ overflowY: "auto", maxHeight: "70vh", paddingRight: "20px" }} // Use style instead of bodyStyle
    >
      <Grid container spacing={2}>
        {/* Company Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Company Name"
            name="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Company Email"
            name="CompanyEmail"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
          />
        </Grid>

        {/* Company Website */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Company Website"
            name="companyWebsite"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
          />
        </Grid>

        {/* Job Title */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Job Title"
            name="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Job Position"
            name="jobRole"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <CitySelector
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            setCity={setCity}
          />
        </Grid>

        {/* Job Type */}
        <Grid item xs={12}>
          <div>
            <label className="block text-sm font-medium mb-2">Job Type</label>
            <div className="flex space-x-4">
              {["Full Time", "Part Time", "Contract", "Internship"].map(
                (type) => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="jobType"
                      value={type}
                      onChange={(e) => setJobType(e.target.value)}
                      checked={jobType === type} // Consistent naming
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2">{type}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </Grid>

        {/* Salary Range */}
        <Grid item xs={12}>
          <SimpleSalaryRange
            name="Salary Range"
            label="Select Your Salary Range"
            value={salaryRange}
            // Example additional name prop
            onSalaryChange={handleSalaryChange}
          />
        </Grid>

        {/* Job Description */}
        <Grid item xs={12}>
          <TextAreaInput
            label="Job Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextAreaInput
            label="Requirements"
            name="requirements"
            value={requirements.join(", ")} // Change to display as comma-separated
            onChange={(e) =>
              setRequirements(
                e.target.value.split(",").map((req) => req.trim())
              )
            } // Convert input to array
          />
        </Grid>

        <Grid item xs={12}>
          <DateInput
            label="Application Deadline"
            name="applicationDeadline"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};

export default JobPostModal;
