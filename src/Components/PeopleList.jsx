import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../Contexts/ApiContext";
import Loader from "./Loader";

const PeopleList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { people, loading, error } = useContext(ApiContext);
  const handlePrevClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(people.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex === people.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex items-center justify-center pt-20 pb-10 lg:p-0 lg:h-screen">
      <button
        onClick={handlePrevClick}
        className="absolute left-5 text-white p-2 hidden lg:block"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {people && people.length > 0 ? (
        <ul className="flex items-center justify-center my-auto gap-4 flex-wrap">
          {people.slice(currentIndex, currentIndex + 9).map((person) => (
            <li key={person.id} className="">
              <img
                className="w-[170px] lg:w-[100px] h-[350px] object-cover grayscale lg:hover:h-[430px] lg:hover:w-[250px] hover:grayscale-0 hover:delay-150 hover:duration-200"
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No people suggestions available.</p>
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

export default PeopleList;
