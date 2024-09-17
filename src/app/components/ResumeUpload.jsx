// components/ResumeUpload.js
import { Upload } from "lucide-react";

const ResumeUpload = ({ fileName, fileInputRef, handleFileUpload, darkMode }) => (
  <div>
    <label htmlFor="resume" className="block text-sm font-medium mb-1">
      Upload Resume (PDF)
    </label>
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
        className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
          darkMode ? "border-gray-600 text-white hover:bg-gray-700" : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        <Upload className="mr-2 h-5 w-5 text-gray-400" />
        Upload PDF
      </button>
      {fileName && <span className="ml-3 text-sm">{fileName}</span>}
    </div>
  </div>
);

export default ResumeUpload;
