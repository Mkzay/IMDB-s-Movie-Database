import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import Loader from "../Components/Loader";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // For navigating results
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=1218ed0aec5ef5e169ede8abbe7ace3d&language=en-US&query=${encodeURIComponent(
              query
            )}`
          );
          const data = await response.json();
          setResults(data.results || []);
        } catch (err) {
          setError("Failed to fetch search results.");
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [query]);

  const handlePrevClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(results.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex === results.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <button
        onClick={handlePrevClick}
        className="absolute left-5 text-white p-2"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {results && results.length > 0 ? (
        <ul className="flex items-center justify-center my-auto gap-4 flex-wrap">
          {results.slice(currentIndex, currentIndex + 9).map((result) => (
            <li key={result.id} className="">
              <Link to={`/movies/${result.id}`}>
                <img
                  className="w-[100px] h-[350px] object-cover grayscale hover:h-[430px] hover:w-[250px] hover:grayscale-0 hover:delay-150 hover:duration-200"
                  src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                  alt={result.title || result.name}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search results available.</p>
      )}
      <button
        onClick={handleNextClick}
        className="absolute right-5 text-white p-2"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default SearchResults;
