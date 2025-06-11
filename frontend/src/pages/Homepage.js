import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaImdb,
  FaPlay,
  FaFire,
  FaCalendarAlt,
  FaStar,
  FaUser,
} from "react-icons/fa";

const API_KEY = process.env.REACT_APP_API_KEY;

const Homepage = () => {
  const navigate = useNavigate();
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState(null);
  const [collections, setCollections] = useState([]);
  const [weeklyTrends, setWeeklyTrends] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [popularActors, setPopularActors] = useState([]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=tr-TR`
      );
      setPopularMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=tr-TR`
      );
      setTopRatedMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  };

  const fetchTrendingMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=tr-TR`
      );
      setTrendingMovie(response.data.results[0]);
    } catch (error) {
      console.error("Error fetching trending movie:", error);
    }
  };

  const fetchUpcomingMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=tr-TR`
      );
      setUpcomingMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };

  const fetchCollections = async () => {
    try {
      const marvelKeywords = [
        "Avengers",
        "Spider-Man",
        "Iron Man",
        "Kaptan Amerika",
        "Thor",
        "Hulk",
        "Karınca Adam",
        "Black Panther",
        "Doctor Strange",
        "Marvel",
      ];
      const dcKeywords = [
        "Batman",
        "Superman",
        "Wonder Woman",
        "Aquaman",
        "Joker",
        "Adalet Birliği",
        "DC",
      ];
      const marvelMovies = popularMovies.filter((m) =>
        marvelKeywords.some(
          (keyword) =>
            (m.title &&
              m.title.toLowerCase().includes(keyword.toLowerCase())) ||
            (m.original_title &&
              m.original_title.toLowerCase().includes(keyword.toLowerCase()))
        )
      );
      const dcMovies = popularMovies.filter((m) =>
        dcKeywords.some(
          (keyword) =>
            (m.title &&
              m.title.toLowerCase().includes(keyword.toLowerCase())) ||
            (m.original_title &&
              m.original_title.toLowerCase().includes(keyword.toLowerCase()))
        )
      );
      const collections = [
        { id: 1, name: "Marvel Koleksiyonu", movies: marvelMovies },
        { id: 2, name: "DC Koleksiyonu", movies: dcMovies },
        {
          id: 3,
          name: "Oscar Ödüllü Filmler",
          movies: topRatedMovies.filter((m) => m.vote_average > 8),
        },
      ];
      setCollections(collections);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const fetchWeeklyTrends = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=tr-TR`
      );
      setWeeklyTrends(response.data.results);
    } catch (error) {
      console.error("Error fetching weekly trends:", error);
    }
  };

  const fetchRandomMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=tr-TR`
      );
      const movies = response.data.results;
      setRandomMovie(movies[Math.floor(Math.random() * movies.length)]);
    } catch (error) {
      console.error("Error fetching random movie:", error);
    }
  };

  const fetchPopularActors = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=tr-TR`
      );
      setPopularActors(response.data.results.slice(0, 8));
    } catch (error) {
      console.error("Error fetching popular actors:", error);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchTrendingMovie();
    fetchUpcomingMovies();
    fetchCollections();
    fetchWeeklyTrends();
    fetchRandomMovie();
    fetchPopularActors();
  }, []);

  if (!trendingMovie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${trendingMovie.backdrop_path}`}
            alt={trendingMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>

        <div className="relative h-full flex items-end pb-20">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              <div className="hidden md:block">
                <img
                  src={`https://image.tmdb.org/t/p/w500${trendingMovie.poster_path}`}
                  alt={trendingMovie.title}
                  className="w-full rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="md:col-span-2 text-white">
                <h1 className="text-5xl font-bold mb-4">
                  {trendingMovie.title}
                </h1>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center">
                    <FaImdb className="text-yellow-400 text-3xl mr-2" />
                    <span className="text-xl">
                      {trendingMovie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl">
                      {trendingMovie.original_language.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xl">
                    {trendingMovie.release_date.split("-")[0]}
                  </span>
                </div>
                <p className="text-gray-300 text-lg mb-8 max-w-3xl">
                  {trendingMovie.overview}
                </p>
                <button
                  onClick={() => handleMovieClick(trendingMovie.id)}
                  className="bg-red-600 text-white rounded-full py-4 px-8 text-xl font-semibold hover:bg-white hover:text-red-600 transition duration-300 flex items-center"
                >
                  <FaPlay className="mr-2" /> İzle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Movies Section */}
      <div className="container mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">Popüler Filmler</h2>
        <Slider {...sliderSettings}>
          {popularMovies.map((movie) => (
            <div
              key={movie.id}
              className="px-2 cursor-pointer group"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">{movie.title}</p>
                    <div className="flex items-center text-yellow-400 mt-2">
                      <FaImdb className="mr-1" />
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Top Rated Movies Section */}
      <div className="container mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">
          En Yüksek Puanlı Filmler
        </h2>
        <Slider {...sliderSettings}>
          {topRatedMovies.map((movie) => (
            <div
              key={movie.id}
              className="px-2 cursor-pointer group"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">{movie.title}</p>
                    <div className="flex items-center text-yellow-400 mt-2">
                      <FaImdb className="mr-1" />
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Upcoming Movies Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="flex items-center mb-8">
          <FaCalendarAlt className="text-red-600 text-3xl mr-4" />
          <h2 className="text-3xl font-bold text-white">
            Yakında Çıkacak Filmler
          </h2>
        </div>
        <Slider {...sliderSettings}>
          {upcomingMovies.map((movie) => (
            <div
              key={movie.id}
              className="px-2 cursor-pointer group"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">{movie.title}</p>
                    <div className="flex items-center text-yellow-400 mt-2">
                      <FaCalendarAlt className="mr-1" />
                      <span>
                        {new Date(movie.release_date).toLocaleDateString(
                          "tr-TR"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Haftalık Trend Filmler */}
      <div className="container mx-auto px-8 py-16">
        <div className="flex items-center mb-8">
          <FaFire className="text-orange-500 text-3xl mr-4" />
          <h2 className="text-3xl font-bold text-white">
            Haftalık Trend Filmler
          </h2>
        </div>
        <Slider {...sliderSettings}>
          {weeklyTrends.map((movie) => (
            <div
              key={movie.id}
              className="px-2 cursor-pointer group"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">{movie.title}</p>
                    <div className="flex items-center text-yellow-400 mt-2">
                      <FaImdb className="mr-1" />
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Rastgele Film Önerisi */}
      {randomMovie && (
        <div className="container mx-auto px-8 py-16">
          <div className="flex items-center mb-8">
            <FaStar className="text-yellow-400 text-3xl mr-4" />
            <h2 className="text-3xl font-bold text-white">
              Rastgele Film Önerisi
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center bg-gray-900 rounded-lg p-6">
            <img
              src={`https://image.tmdb.org/t/p/w300/${randomMovie.poster_path}`}
              alt={randomMovie.title}
              className="w-40 h-60 object-cover rounded-lg mb-4 md:mb-0 md:mr-8"
            />
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">{randomMovie.title}</h3>
              <p className="mb-4 text-gray-300">{randomMovie.overview}</p>
              <div className="flex items-center text-yellow-400 mb-2">
                <FaImdb className="mr-1" />
                <span>{randomMovie.vote_average?.toFixed(1)}</span>
              </div>
              <button
                onClick={() => handleMovieClick(randomMovie.id)}
                className="bg-red-600 text-white rounded-full py-2 px-6 text-lg font-semibold hover:bg-white hover:text-red-600 transition duration-300 flex items-center"
              >
                <FaPlay className="mr-2" /> İzle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popüler Aktörler/Aktrisler */}
      <div className="container mx-auto px-8 py-16">
        <div className="flex items-center mb-8">
          <FaUser className="text-blue-400 text-3xl mr-4" />
          <h2 className="text-3xl font-bold text-white">
            Popüler Aktörler / Aktrisler
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {popularActors.map((actor) => (
            <div
              key={actor.id}
              className="flex flex-col items-center bg-gray-900 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate(`/actor/${actor.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                alt={actor.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-white font-semibold text-lg text-center">
                {actor.name}
              </p>
              <p className="text-gray-400 text-sm text-center">
                {actor.known_for_department}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
