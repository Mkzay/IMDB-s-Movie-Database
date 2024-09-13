import { useState } from "react";
import Infobar from "./Components/Infobar";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import Home from "./Pages/Home";
import TvShows from "./Pages/TvShows";
import Movies from "./Pages/Movies";
import People from "./Pages/People";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApiProvider } from "./Contexts/ApiContext";
import MovieDetail from "./Components/MovieDetail";
import TvShowDetail from "./Components/TvShowDetail";
import UpcomingMovieDetail from "./Components/UpcomingMovieDetail";
import SearchResults from "./Pages/SearchResults";

const App = () => {
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);
  const openSearchBar = () => {
    setIsOpenSearchBar(!isOpenSearchBar);
  };

  return (
    <ApiProvider>
      <Router>
        <Navbar />
        <SearchBar
          isOpenSearchBar={isOpenSearchBar}
          setIsOpenSearchBar={setIsOpenSearchBar}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/people" element={<People />} />
          <Route
            path="/upcoming-movies/:id"
            element={<UpcomingMovieDetail />}
          />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/tvshows/:id" element={<TvShowDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Infobar openSearchBar={openSearchBar} />
      </Router>
    </ApiProvider>
  );
};

export default App;
