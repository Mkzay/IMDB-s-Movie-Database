import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeLink = "text-white text-base";
  const hoverLink = "hover:text-white";

  return (
    <ul className="z-50 flex items-center justify-center gap-3 fixed top-8 right-0 left-0 text-gray-400 font-normal text-sm">
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? activeLink : hoverLink)}
          to="/"
        >
          Home
        </NavLink>
      </li>
      <FontAwesomeIcon icon={faCaretRight} />
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? activeLink : hoverLink)}
          to="/TvShows"
        >
          Tv Shows
        </NavLink>
      </li>
      <FontAwesomeIcon icon={faCaretRight} />
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? activeLink : hoverLink)}
          to="/Movies"
        >
          Movies
        </NavLink>
      </li>
      <FontAwesomeIcon icon={faCaretRight} />
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? activeLink : hoverLink)}
          to="/People"
        >
          People
        </NavLink>
      </li>
      <FontAwesomeIcon icon={faCaretRight} />
    </ul>
  );
};

export default Navbar;
