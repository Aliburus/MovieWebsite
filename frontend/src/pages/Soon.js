import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { IoLanguageOutline } from "react-icons/io5";
import { BiTime } from "react-icons/bi";

const API_KEY = process.env.REACT_APP_API_KEY;

const Soon = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUpcomingMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
      );
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-700 mt-20">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">
        Upcoming Movies
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

              {/* Film Detayları */}
              <div className="mt-4 space-y-2">
                {/* Çıkış Tarihi (Yıl Olarak) */}
                <div className="flex items-center text-sm text-gray-400">
                  <span className="mr-2">📅</span>
                  {movie.release_date
                    ? movie.release_date.split("-")[0]
                    : "Tarih Bilgisi Yok"}
                </div>

                {/* Dil */}
                <div className="flex items-center text-sm text-gray-400">
                  <IoLanguageOutline className="mr-2" />
                  {movie.original_language.toUpperCase()}
                </div>
              </div>

              {/* İzleme Butonu */}
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

export default Soon;
