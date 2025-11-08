import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery, placeholder = "Search..." }) => {
  return (
    <div className="w-full flex justify-center mb-2 sm:mb-4 px-2 sm:px-0">
      <div
        className="
          relative w-full 
          max-w-[90%] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[400px]
        "
      >
        {/* Search Icon */}
        <Search
          className="
            absolute left-3 top-1/2 -translate-y-1/2 
            text-blue-500
          "
          size={18}
        />

        {/* Input Field */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="
            w-full pl-10 pr-10 py-2.5 rounded-xl 
            bg-white shadow-sm
            border border-transparent
            focus:border-blue-400 focus:ring-2 focus:ring-blue-200
            outline-none
            text-gray-700 placeholder-gray-400
            font-medium transition-all
            text-[0.75rem] sm:text-[0.8rem] md:text-[0.9rem]
          "
        />

        {/* Clear Icon (only when there's a search value) */}
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="
              absolute right-3 top-1/2 -translate-y-1/2 
              text-gray-400 hover:text-gray-600 
              transition-colors
            "
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
