/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ isOpenSearchBar, setIsOpenSearchBar }) => {
  const [query, setQuery] = useState(""); // State to store the search query
  const searchBarRef = useRef(null); // Ref for the search bar container
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`); // Navigate to the search results page with the query
      setQuery(""); // Clear the search bar after navigating
      setIsOpenSearchBar(false); // Close the search bar after search
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      handleSearch();
    }
  };

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsOpenSearchBar(false); // Close search bar if clicked outside
      }
    };

    if (isOpenSearchBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener on unmount
    };
  }, [isOpenSearchBar, setIsOpenSearchBar]);

  return (
    <div
      ref={searchBarRef} // Assign the ref to the search bar container
      className={`${
        isOpenSearchBar
          ? "translate-y-100 opacity-100 delay-500 duration-200"
          : "-translate-y-[400%] opacity-0 delay-500 duration-200"
      } fixed top-16 left-0 right-0 mx-auto flex items-center justify-center z-50`}
    >
      <div className="flex items-center justify-center relative w-full">
        <input
          className="w-11/12 md:w-7/12 lg:w-4/12 py-1 px-3 outline-none border border-purple-800"
          type="text"
          value={query}
          onChange={handleInputChange} // Update query state
          onKeyDown={handleKeyPress} // Allow search on "Enter"
        />
        <button
          className="absolute text-purple-800 right-8 lg:right-[470px] md:right-[190px]"
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
