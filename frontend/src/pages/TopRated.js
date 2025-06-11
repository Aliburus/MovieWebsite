import React, { useEffect, useState } from "react";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

const TopRated = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );
      setTopRatedMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-700 mt-20">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">
        Top Rated Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topRatedMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-black text-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform transition-all hover:scale-105"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white truncate">
                {movie.title}
              </h2>
              <p className="text-gray-300 text-sm mt-2 line-clamp-3">
                {movie.overview}
              </p>

              {/* Additional Movie Details */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-400">
                  Release Year: {new Date(movie.release_date).getFullYear()}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  Rating: {movie.vote_average.toFixed(1)} / 10
                </div>
              </div>

              {/* Watch Now Button */}
              <div className="mt-4">
                <button className="bg-red-600 text-white rounded-full py-2 px-6 flex items-center justify-center w-full hover:bg-white hover:text-red-600 transition duration-300">
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
