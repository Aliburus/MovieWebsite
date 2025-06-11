// SearchModal.js
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ searchResults, closeModal }) => {
  const navigate = useNavigate();
  const handleCardClick = (item) => {
    if (item.media_type === "movie" && item.id) {
      closeModal();
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === "person" && item.id) {
      closeModal();
      navigate(`/actor/${item.id}`);
    } else if (item.media_type === "tv" && item.id) {
    }
  };

  return (
    <div
      className="fixed left-0 right-0 top-20 bottom-0 bg-black bg-opacity-90 z-50 flex justify-center items-center"
      style={{ zIndex: 9999 }}
    >
      <button
        onClick={closeModal}
        className="absolute top-5 right-5 text-white text-2xl"
      >
        ✕
      </button>

      {/* Modal Content */}
      <div className="flex flex-wrap justify-center max-h-full w-[90%] md:w-[80%] lg:w-[60%] overflow-y-auto p-4">
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div
              key={item.id}
              className="p-2 w-1/2 md:w-1/4 lg:w-1/6 xl:w-1/8 cursor-pointer"
              onClick={() => handleCardClick(item)}
            >
              <div className="flex flex-col items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${
                    item.poster_path || item.profile_path
                  }`}
                  alt={item.title || item.name}
                  className="h-[250px] object-cover rounded-lg"
                />
                <h3 className="text-white text-center mt-2 text-sm md:text-base">
                  {item.title || item.name}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
