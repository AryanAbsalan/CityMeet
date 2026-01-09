// src/components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchText: string;
  cityFilter: string;
  onSearchChange: (text: string) => void;
  onCityChange: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    searchText, 
    cityFilter, 
    onSearchChange, 
    onCityChange 
}) => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <input
        type="text"
        placeholder="Search by event title..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full md:w-2/3 p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 "
      />
      <input
        type="text"
        placeholder="Filter by city (e.g., Berlin)"
        value={cityFilter}
        onChange={(e) => onCityChange(e.target.value)}
        className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
      />
    </div>
  );
};

export default SearchBar;