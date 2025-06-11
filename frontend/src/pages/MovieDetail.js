import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaImdb, FaPlay, FaArrowLeft } from "react-icons/fa";
import { IoLanguageOutline } from "react-icons/io5";
import { MdSubtitles } from "react-icons/md";
import { BsFillVolumeUpFill, BsStarFill } from "react-icons/bs";
const API_KEY = process.env.REACT_APP_API_KEY;

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        setMovie(movieResponse.data);

        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        setCast(creditsResponse.data.cast.slice(0, 6));

        const similarResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
        );
        setSimilarMovies(similarResponse.data.results.slice(0, 6));

        // Trailer fetch
        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        const trailer = videosResponse.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : null);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-600 text-2xl">Film bulunamadı</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-all"
        >
          <FaArrowLeft size={24} />
        </button>

        {/* Content */}
        <div className="relative h-full flex items-end pb-20">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              {/* Poster */}
              <div className="hidden md:block">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Movie Info */}
              <div className="md:col-span-2 text-white">
                <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center">
                    <FaImdb className="text-yellow-400 text-3xl mr-2" />
                    <span className="text-xl">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <IoLanguageOutline className="text-2xl mr-2" />
                    <span className="text-xl">
                      {movie.original_language.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xl">
                    {movie.release_date.split("-")[0]}
                  </span>
                  <span className="text-xl">{movie.runtime} min</span>
                </div>

                <p className="text-gray-300 text-lg mb-8 max-w-3xl">
                  {movie.overview}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-red-600 text-white px-4 py-2 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <button
                  className="bg-red-600 text-white rounded-full py-4 px-8 text-xl font-semibold hover:bg-white hover:text-red-600 transition duration-300 flex items-center"
                  onClick={() => setShowTrailer(true)}
                >
                  <FaPlay className="mr-2" /> İzle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="container mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">Oyuncular</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {cast.map((actor) => (
            <div
              key={actor.id}
              className="text-center group cursor-pointer"
              onClick={() => navigate(`/actor/${actor.id}`)}
            >
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">{actor.name}</p>
                    <p className="text-gray-300 text-sm">{actor.character}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="container mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">Benzer Filmler</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {similarMovies.map((movie) => (
            <div
              key={movie.id}
              className="text-center group cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">{movie.title}</p>
                    <div className="flex items-center justify-center text-yellow-400 mt-2">
                      <BsStarFill className="mr-1" />
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showTrailer && trailerKey && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-8 right-8 text-white text-3xl z-50"
          >
            ✕
          </button>
          <div className="w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
