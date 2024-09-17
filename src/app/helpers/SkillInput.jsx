// components/SkillInput.js
import { useState } from "react";

const SkillInput = ({ skillsList, skills, setSkills, skillInput, setSkillInput, darkMode }) => {
  const [filteredSkills, setFilteredSkills] = useState([]);

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);
    setFilteredSkills(
      skillsList.filter(
        (skill) =>
          skill.toLowerCase().includes(value.toLowerCase()) &&
          !skills.includes(skill)
      )
    );
  };

  const addSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSkillInput("");
    setFilteredSkills([]);
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div>
      <label htmlFor="skills" className="block text-sm font-medium mb-1">
        Skills and Expertise
      </label>
      <div className="relative">
        <input
          type="text"
          id="skills"
          value={skillInput}
          onChange={handleSkillInputChange}
          className={`w-full px-4 py-2 rounded-md border-2 ${
            darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
          } focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`}
          placeholder="Add your skills"
        />
        {filteredSkills.length > 0 && (
          <ul
            className={`absolute z-10 w-full mt-1 rounded-md shadow-lg max-h-60 overflow-auto ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            }`}
          >
            {filteredSkills.map((skill, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer ${
                  darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                }`}
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
          <span
            key={index}
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              darkMode ? "bg-blue-700 text-white" : "bg-blue-100 text-blue-800"
            }`}
          >
            {skill}
            <button
              type="button"
              className="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => removeSkill(skill)}
            >
              <span className="sr-only">Remove {skill} skill</span>×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillInput;
