import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../Contexts/ApiContext";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Discover = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { upcomingMovies, loading, error } = useContext(ApiContext);

  const handlePrevClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(upcomingMovies.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex === upcomingMovies.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex items-center justify-center h-fit lg:h-screen">
      <button
        onClick={handlePrevClick}
        className="absolute left-5 text-white p-2 hidden lg:block"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {upcomingMovies && upcomingMovies.length > 0 ? (
        <ul className="flex items-center justify-center my-auto gap-4 flex-col md:flex-row md:flex-wrap">
          {upcomingMovies.slice(currentIndex, currentIndex + 9).map((movie) => (
            <li key={movie.id} className="flex items-center justify-center">
              <Link to={`/upcoming-movies/${movie.id}`}>
                <img
                  className="w-7/12 md:w-4/12 lg:w-[100px] lg:h-[350px] object-cover grayscale lg:hover:h-[430px] lg:hover:w-[250px] hover:grayscale-0 hover:delay-150 hover:duration-200"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movie suggestions available.</p>
      )}
      <button
        onClick={handleNextClick}
        className="absolute right-5 text-white p-2 hidden lg:block"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Discover;
