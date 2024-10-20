import React from 'react';
import CircularLoader from './Loaders';

const LoginButton = ({ loading }) => {
  return (
    <div className="flex items-center justify-between">
      <button
        className="w-full px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        type="submit"
        disabled={loading} // Disable the button when loading
      >
        {loading ? <CircularLoader /> : 'Login'}
      </button>
    </div>
  );
};

export default LoginButton;
