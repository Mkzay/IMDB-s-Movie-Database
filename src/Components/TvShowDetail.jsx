import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

const TvShowDetail = () => {
  const { id } = useParams(); // Get TV show ID from URL
  const [tvShowDetails, setTvShowDetails] = useState(null);
  const [trailer, setTrailer] = useState(null); // State for trailer key and platform
  const [platform, setPlatform] = useState(null); // Platform (YouTube or Vimeo)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch TV show details and trailer
    const fetchTvShowDetails = async () => {
      try {
        const [detailsResponse, videosResponse] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/tv/${id}?api_key=1218ed0aec5ef5e169ede8abbe7ace3d&language=en-US`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/${id}/videos?api_key=1218ed0aec5ef5e169ede8abbe7ace3d&language=en-US`
          ),
        ]);

        if (!detailsResponse.ok || !videosResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const tvShowData = await detailsResponse.json();
        const videoData = await videosResponse.json();

        setTvShowDetails(tvShowData);

        // Find the official trailer (YouTube or Vimeo)
        const trailerVideo = videoData.results.find(
          (video) =>
            video.type === "Trailer" &&
            (video.site === "YouTube" || video.site === "Vimeo")
        );
        if (trailerVideo) {
          setTrailer(trailerVideo.key);
          setPlatform(trailerVideo.site); // Set platform
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTvShowDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {tvShowDetails && (
        <div className="tvshow-detail-container bg-black text-white flex flex-col justify-between">
          {trailer && platform === "YouTube" && (
            <iframe
              className="w-full h-screen absolute top-0"
              src={`https://www.youtube.com/embed/${trailer}`}
              title={tvShowDetails.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          {trailer && platform === "Vimeo" && (
            <iframe
              className="w-full h-screen absolute top-0"
              src={`https://player.vimeo.com/video/${trailer}`}
              title={tvShowDetails.name}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          {!trailer && (
            <img
              className="w-full h-screen absolute top-0 object-fill"
              src={`https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`}
              alt={tvShowDetails.original_name}
            />
          )}
          <div className="text-white relative flex flex-col items-center gap-12 md:gap-48 lg:gap-80 pt-20 p-5 md:flex-row">
            <h1 className="text-5xl font-bold flex-1">{tvShowDetails.name}</h1>
            <div className="flex-1">
              <p className="text-sm">
                {tvShowDetails.overview}{" "}
                <span>IMDB {tvShowDetails.vote_average}</span>
              </p>
            </div>
          </div>
          <div className="text-white font-semibold relative top-0 md:top-96 lg:top-60 py-2 px-5 bg-[#272323] w-9/12 md:w-5/12 lg:w-3/12">
            <p>Title: {tvShowDetails.name}</p>
            <p>Language: {tvShowDetails.original_language}</p>
            <p>Popularity: {tvShowDetails.popularity}</p>
            <p>Vote count: {tvShowDetails.vote_count}</p>
            <p>First air date: {tvShowDetails.first_air_date}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TvShowDetail;
