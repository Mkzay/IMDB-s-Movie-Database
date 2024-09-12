/* eslint-disable react/prop-types */
import { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ isOpenSearchBar }) => {
  const [query, setQuery] = useState(""); // State to store the search query
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`); // Navigate to the search results page with the query
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      handleSearch();
    }
  };

  return (
    <div
      className={`${
        isOpenSearchBar
          ? "translate-y-100 opacity-100 delay-500 duration-200"
          : "-translate-y-[400%] opacity-0 delay-500 duration-200"
      } fixed top-16 left-0 right-0 mx-auto flex items-center justify-center`}
    >
      <div className="flex items-center justify-center relative w-full">
        <input
          className="w-4/12 py-1 px-3 outline-none border border-purple-800"
          type="text"
          value={query}
          onChange={handleInputChange} // Update query state
          onKeyDown={handleKeyPress} // Allow search on "Enter"
        />
        <button
          className="absolute text-purple-800 right-[470px]"
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
