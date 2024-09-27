import React, { useState } from "react";
import { Button, Modal } from "antd";
import TextField from "../helpers/TextField";
import CitySelector from "./CitySelector";
import TextAreaInput from '../helpers/TextAreaInput';
import SliderInput from '../helpers/SliderInput ';
import DateInput from '../helpers/DateInput';
import { Grid } from '@mui/material';

const JobPostModal = ({ isVisible, onClose }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [city, setCity] = useState("");
  const [jobtype, setJobType] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    jobTitle: "",
    department: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    salaryRange: [50000, 150000],
    description: "",
    jobRole: "",
    Requirements: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    applicationDeadline: "",
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSalaryChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      salaryRange: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <Modal
      // title="Post a Job"
      open={isVisible}
      onOk={handleSubmit}
      onCancel={onClose}
      okText="Post Job"
      cancelText="Cancel"
      width={800} 
      bodyStyle={{ overflowY: "auto", maxHeight: "70vh", paddingRight: '20px' }}
    >
      <Grid container spacing={2}>
        {/* Company Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </Grid>

        {/* Company Website */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Company Website"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
          />
        </Grid>

        {/* Job Title */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </Grid>

        {/* Job Role */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Job Role"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
          />
        </Grid>

        {/* City Selector */}
        <Grid item xs={12}>
          <CitySelector
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            setCity={setCity}
          />
        </Grid>

        {/* Job Type (Radio Buttons) */}
        <Grid item xs={12}>
          <div>
            <label className="block text-sm font-medium mb-2">Job Type</label>
            <div className="flex space-x-4">
              {["Full Time", "Part Time", "Contract", "Internship"].map((type) => (
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
        </Grid>

        {/* Salary Range Slider */}
        <Grid item xs={12}>
          <SliderInput
            label="Salary Range"
            value={formData.salaryRange}
            onChange={handleSalaryChange}
            min={30000}
            max={200000}
            step={1000}
          />
        </Grid>

        {/* Job Description */}
        <Grid item xs={12}>
          <TextAreaInput
            label="Job Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextAreaInput
            label="Requirements"
            name="Requirements"
            value={formData.Requirements}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <DateInput
            label="Application Deadline"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};

export default JobPostModal;
