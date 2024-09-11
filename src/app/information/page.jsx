"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Upload, Moon, Sun } from 'lucide-react';

const pakistaniCities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala'
];

const skillsList = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL',
  'Machine Learning', 'Data Analysis', 'Project Management', 'Agile',
  'UI/UX Design', 'DevOps', 'Cloud Computing', 'Cybersecurity'
];

const ResumePortal = () => {
  const [city, setCity] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [fileName, setFileName] = useState('');
  const [salary, setSalary] = useState(25000);
  const [darkMode, setDarkMode] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setFilteredCities(
      pakistaniCities.filter(c => c.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
    } else {
      alert('Please upload a PDF file.');
      e.target.value = '';
    }
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);
    setFilteredSkills(
      skillsList.filter(skill => 
        skill.toLowerCase().includes(value.toLowerCase()) && !skills.includes(skill)
      )
    );
  };

  const addSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSkillInput('');
    setFilteredSkills([]);
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} flex flex-col transition-colors duration-200`}>
      {/* Top Navigation Bar */}
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-black'} text-white p-4`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Resume Portal</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Centered Content */}
      <div className="flex-grow flex items-center justify-center p-8">
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-xl p-8 w-full max-w-2xl transition-colors duration-200`}>
          <h2 className="text-3xl font-semibold mb-8 text-center">Personal Information</h2>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" id="name" className={`w-full px-4 py-2 rounded-md border-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`} placeholder="Enter your full name" />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
              <div className="relative">
                <input 
                  type="text" 
                  id="city" 
                  value={city}
                  onChange={handleCityChange}
                  className={`w-full px-4 py-2 rounded-md border-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`}
                  placeholder="Search for a city"
                />
                {filteredCities.length > 0 && (
                  <ul className={`absolute z-10 w-full mt-1 rounded-md shadow-lg max-h-60 overflow-auto ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}>
                    {filteredCities.map((city, index) => (
                      <li 
                        key={index}
                        className={`px-4 py-2 cursor-pointer ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                        onClick={() => {
                          setCity(city);
                          setFilteredCities([]);
                        }}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium mb-1">Expected Salary (PKR)</label>
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
                <span className="font-medium">{Number(salary).toLocaleString()} PKR</span>
                <span>5,000,000 PKR</span>
              </div>
            </div>

            <div>
              <label htmlFor="employer" className="block text-sm font-medium mb-1">Current Employer</label>
              <input type="text" id="employer" className={`w-full px-4 py-2 rounded-md border-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`} placeholder="Enter your current employer" />
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium mb-1">Current Position</label>
              <input type="text" id="position" className={`w-full px-4 py-2 rounded-md border-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`} placeholder="e.g. Software Engineer, Backend Developer" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job Type</label>
              <div className="flex space-x-4">
                {['Full Time', 'Part Time', 'Contract'].map((type) => (
                  <label key={type} className="inline-flex items-center">
                    <input type="radio" name="jobType" value={type} className="form-radio text-blue-600" />
                    <span className="ml-2">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium mb-1">Skills and Expertise</label>
              <div className="relative">
                <input 
                  type="text" 
                  id="skills" 
                  value={skillInput}
                  onChange={handleSkillInputChange}
                  className={`w-full px-4 py-2 rounded-md border-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`}
                  placeholder="Add your skills"
                />
                {filteredSkills.length > 0 && (
                  <ul className={`absolute z-10 w-full mt-1 rounded-md shadow-lg max-h-60 overflow-auto ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}>
                    {filteredSkills.map((skill, index) => (
                      <li 
                        key={index}
                        className={`px-4 py-2 cursor-pointer ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                        onClick={() => addSkill(skill)}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800'}`}>
                    {skill}
                    <button
                      type="button"
                      className="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => removeSkill(skill)}
                    >
                      <span className="sr-only">Remove {skill} skill</span>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium mb-1">Upload Resume (PDF)</label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  id="resume"
                  ref={fileInputRef}
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  <Upload className="mr-2 h-5 w-5 text-gray-400" />
                  Upload PDF
                </button>
                {fileName && <span className="ml-3 text-sm">{fileName}</span>}
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button className={`px-6 py-2 border-2 rounded-md text-sm font-medium ${darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200`}>
                Back
              </button>
              <button className="px-6 py-2 border-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumePortal;
