import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaImdb, FaArrowLeft } from "react-icons/fa";
const API_KEY = process.env.REACT_APP_API_KEY;

const ActorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=tr-TR`
        );
        setActor(res.data);
      } catch (err) {
        setActor(null);
      }
    };
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=tr-TR`
        );
        setMovies(res.data.cast || []);
      } catch (err) {
        setMovies([]);
      }
    };
    fetchActor();
    fetchMovies();
  }, [id]);

  if (!actor) {
    return <div className="text-white text-center py-20">Yükleniyor...</div>;
  }

  const bio = actor.biography || "";
  const shortBio = bio.length > 300 ? bio.slice(0, 300) + "..." : bio;

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-0">
      <div className="container mx-auto py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-gray-300 hover:text-white"
        >
          <FaArrowLeft className="mr-2" /> Geri
        </button>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <img
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            alt={actor.name}
            className="w-64 h-80 object-cover rounded-lg shadow-lg mb-6 md:mb-0"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{actor.name}</h1>
            <p className="text-gray-400 mb-2">{actor.known_for_department}</p>
            <p className="mb-2">
              <span className="font-semibold">Doğum Tarihi:</span>{" "}
              {actor.birthday || "Bilinmiyor"}
            </p>
            {actor.place_of_birth && (
              <p className="mb-2">
                <span className="font-semibold">Doğum Yeri:</span>{" "}
                {actor.place_of_birth}
              </p>
            )}
            {bio && (
              <p className="mb-4 text-gray-300 max-w-2xl">
                {showFullBio ? bio : shortBio}
                {bio.length > 300 && !showFullBio && (
                  <button
                    className="ml-2 text-blue-400 underline"
                    onClick={() => setShowFullBio(true)}
                  >
                    Devamını Gör
                  </button>
                )}
                {bio.length > 300 && showFullBio && (
                  <button
                    className="ml-2 text-blue-400 underline"
                    onClick={() => setShowFullBio(false)}
                  >
                    Kısalt
                  </button>
                )}
              </p>
            )}
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Oynadığı Filmler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2">
                    <p className="text-white font-semibold text-sm truncate">
                      {movie.title}
                    </p>
                    <div className="flex items-center text-yellow-400 text-xs mt-1">
                      <FaImdb className="mr-1" />
                      <span>{movie.vote_average?.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-full">Film bulunamadı.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetail;
