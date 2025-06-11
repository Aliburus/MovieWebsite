import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { IoLanguageOutline } from "react-icons/io5";
import { MdSubtitles } from "react-icons/md";
import { BsFillVolumeUpFill } from "react-icons/bs";
const API_KEY = process.env.REACT_APP_API_KEY;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const moviesData = response.data.results;

      // Fetching translations for each movie
      const moviesWithTranslations = await Promise.all(
        moviesData.map(async (movie) => {
          const translationsResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/translations?api_key=${API_KEY}`
          );
          movie.translations = translationsResponse.data.translations;
          return movie;
        })
      );

      setMovies(moviesWithTranslations);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading)
    return (
      <div className="text-center text-xl text-gray-700 mt-20">Loading...</div>
    );

  const getSubtitles = (translations) => {
    return translations.filter(
      (translation) =>
        translation.iso_639_1 === "en" && translation.data?.subtitles
    );
  };

  const getDubbedLanguages = (translations) => {
    return translations.filter(
      (translation) =>
        translation.iso_639_1 !== "en" && translation.data?.dubbed
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">
        Popular Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
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

              {/* Movie Details Section */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-400">
                  <IoLanguageOutline className="mr-2" />
                  {movie.original_language.toUpperCase()}
                </div>

                {/* Subtitles */}
                {getSubtitles(movie.translations).length > 0 && (
                  <div className="flex items-center text-sm text-gray-400">
                    <MdSubtitles className="mr-2" />
                    Subtitles Available
                  </div>
                )}

                {/* Dubbing */}
                {getDubbedLanguages(movie.translations).length > 0 && (
                  <div className="flex items-center text-sm text-gray-400">
                    <BsFillVolumeUpFill className="mr-2" />
                    Dubbing Available
                  </div>
                )}
              </div>

              {/* Watch Now Button */}
              <div className="mt-4">
                <button className="bg-red-600 text-white rounded-full py-2 px-6 flex items-center justify-center w-full hover:bg-white hover:text-red-600 transition duration-300">
                  <FaPlay className="mr-2" />
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

export default Movies;
