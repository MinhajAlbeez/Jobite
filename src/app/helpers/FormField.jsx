// components/FormField.js
const FormField = ({ id, label, type = "text", value, onChange, placeholder, darkMode }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-md border-2 ${
          darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
        } focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`}
        placeholder={placeholder}
      />
    </div>
  );
  
  export default FormField;
  