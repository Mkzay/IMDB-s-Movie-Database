/* eslint-disable react/prop-types */
import {
  faBookmark,
  faMagnifyingGlass,
  faUser,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Infobar = ({ openSearchBar }) => {
  return (
    <div className="flex items-center justify-center gap-3 fixed bottom-4 left-0 right-0 mx-auto bg-black text-white font-bold w-fit p-1 rounded-md border border-[#272323]">
      <img className="w-16 md:w-24 h-12 rounded-md" src="/IMDB.png" alt="IMDB Logo" />
      <ul className="flex items-center justify-center gap-2 md:gap-7 lg:gap-12 px-2.5 lg:px-5 text-xs bg-[#272323] h-12 rounded">
        <li className="flex items-center justify-center gap-1">
          <div className="text-sm">
            <FontAwesomeIcon icon={faEllipsisVertical} />
            <FontAwesomeIcon icon={faEllipsisVertical} />
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
          Menu
        </li>
        <li className="hidden md:block">Actors</li>
        <li className="hidden md:block">Description</li>
        <li className="hidden md:block">Title</li>
      </ul>
      <ul className="flex gap-2 lg:gap-3 text-xs">
        <li className=" bg-[#272323] rounded w-12 md:w-16 h-12 flex items-center justify-center gap-1 flex-col">
          <FontAwesomeIcon icon={faBookmark} />
          <span className="hidden md:block">Save</span>
        </li>
        <button
          onClick={openSearchBar}
          className=" bg-[#272323] rounded w-12 md:w-16 h-12  flex items-center justify-center gap-1  flex-col"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span className="hidden md:block">Search</span>
        </button>
        <li className=" bg-[#272323] rounded w-12 md:w-16 h-12 flex items-center justify-center gap-1  flex-col">
          <FontAwesomeIcon icon={faUser} />
          <span className="hidden md:block">Sign In</span>
        </li>
      </ul>
    </div>
  );
};

export default Infobar;
