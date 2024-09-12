/* eslint-disable react/prop-types */
// ApiContext.js
import { createContext, useState, useEffect } from "react";

// Create context
export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies data
  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=1218ed0aec5ef5e169ede8abbe7ace3d&language=en-US&page=1"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setMovies(result.results);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch TV shows data
  const fetchTvShows = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=1218ed0aec5ef5e169ede8abbe7ace3d&language=en-US&page=1"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setTvShows(result.results);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch Upcoming Movies data
  const fetchUpcomingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=1218ed0aec5ef5e169ede8abbe7ace3d&language=en-US&page=1"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setUpcomingMovies(result.results);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch People data
  const fetchPeople = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/person/popular?api_key=1218ed0aec5ef5e169ede8abbe7ace3d&language=en-US&page=1"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setPeople(result.results);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      await Promise.all([
        fetchMovies(),
        fetchTvShows(),
        fetchUpcomingMovies(),
        fetchPeople()
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <ApiContext.Provider value={{ movies, tvShows, upcomingMovies, people, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
};
