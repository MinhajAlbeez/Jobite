// components/Button.js
const Button = ({ type = "button", onClick, className, children }) => (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 border-2 rounded-md text-sm font-medium transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
  
  export default Button;
  