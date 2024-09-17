import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-4 flex">
        <input
          type="text"
          placeholder="Search by Name, Skills or any keyword..."
          className="flex-1 p-2 border rounded-l-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
