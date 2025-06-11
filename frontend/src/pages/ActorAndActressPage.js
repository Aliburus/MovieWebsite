import React, { useEffect, useState } from "react";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

const ActorAndActressPage = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setActors(response.data.results);
        setLoading(false);
      } catch (err) {
        setError("Error fetching actors");
        setLoading(false);
      }
    };

    fetchActors();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-700 mt-20">
        Loading actors...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-600 mt-20">{error}</div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Popular Actors & Actresses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {actors.map((actor) => (
          <div
            key={actor.id}
            className="cursor-pointer bg-black text-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform transition-all hover:scale-105"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white truncate">
                {actor.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorAndActressPage;
