// components/Container.js
const Container = ({ children, darkMode }) => (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } flex flex-col transition-colors duration-200`}
    >
      {children}
    </div>
  );
  
  export default Container;
  