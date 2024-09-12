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
    <div className="hidden lg:flex items-center justify-center gap-3 fixed bottom-4 left-0 right-0 mx-auto bg-black text-white font-bold w-fit p-1 rounded-md border border-[#272323]">
      <img className="w-24 h-12 rounded-md" src="/IMDB.png" alt="IMDB Logo" />
      <ul className="flex items-center justify-center gap-12 px-5 text-xs bg-[#272323] h-12 rounded">
        <li className="flex items-center justify-center gap-1">
          <div className="text-sm">
            <FontAwesomeIcon icon={faEllipsisVertical} />
            <FontAwesomeIcon icon={faEllipsisVertical} />
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
          Menu
        </li>
        <li>Actors</li>
        <li>Description</li>
        <li>Title</li>
      </ul>
      <ul className="flex gap-3 text-xs">
        <li className=" bg-[#272323] rounded w-16 h-12 flex items-center justify-center gap-1 flex-col">
          <FontAwesomeIcon icon={faBookmark} />
          Save
        </li>
        <button
          onClick={openSearchBar}
          className=" bg-[#272323] rounded w-16 h-12  flex items-center justify-center gap-1  flex-col"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Search
        </button>
        <li className=" bg-[#272323] rounded w-16 h-12 flex items-center justify-center gap-1  flex-col">
          <FontAwesomeIcon icon={faUser} />
          Sign in
        </li>
      </ul>
    </div>
  );
};

export default Infobar;
