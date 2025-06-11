// Header.js
import React from "react";
import { FaImdb } from "react-icons/fa6";

const Header = ({ trendingMovie }) => {
  if (!trendingMovie) return <div>Loading...</div>;

  return (
    <div className="relative w-full h-[500px] bg-black rounded-xl overflow-hidden mb-10">
      <img
        src={`https://image.tmdb.org/t/p/original${trendingMovie.poster_path}`}
        alt={trendingMovie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      <div className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white">
        <div className="flex items-center mb-4">
          <FaImdb className="text-yellow-400 text-3xl" />
          <p className="p-2 text-yellow-400 font-semibold text-lg">6.0</p>
          <span className="p-2 font-bold flex items-center justify-center">
            {trendingMovie.original_language.toUpperCase()}
            <img
              src="https://www.worldometers.info/img/flags/uk-flag.gif"
              alt="English Flag"
              className="w-6 ml-1 mt-1"
            />
          </span>
        </div>
        <h2 className="text-4xl font-bold">{trendingMovie.title}</h2>
        <p className="text-sm mt-2 max-w-lg">{trendingMovie.overview}</p>
        <button className="mt-5 bg-red-600 text-white rounded px-6 py-2 hover:bg-white hover:text-red-600 transition duration-300">
          Watch Now
        </button>

        {/* Display the top 5 cast members */}
        <div className="mt-4">
          <h3 className="text-2xl font-semibold">Main Cast:</h3>
          <div className="flex gap-4 mt-2">
            {trendingMovie.cast?.map((actor) => (
              <div key={actor.id} className="flex flex-col items-center">
                <p className="text-white text-sm mt-2">{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
