import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilm, FaUserCircle, FaHeart } from "react-icons/fa";
import SearchModal from "./SearchModal";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim()) {
      await fetchSearchResults(search);
      setIsModalOpen(true);
    }
  };

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsModalOpen(false);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&language=tr-TR`
      );
      setSearchResults(response.data.results);
      setIsModalOpen(true);
    } catch (error) {
      setSearchResults([]);
      setIsModalOpen(true);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      await fetchSearchResults(value);
    } else {
      setSearchResults([]);
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearch("");
    setSearchResults([]);
  };

  return (
    <nav className="w-full bg-black shadow-lg py-4 px-8 flex items-center justify-between z-50">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaFilm className="text-red-600 text-3xl" />
        <span className="text-white text-2xl font-bold tracking-wide">
          MovieZone
        </span>
      </div>
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-full px-4 py-2 w-72 max-w-full shadow-md"
      >
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder="Film ara..."
          className="bg-transparent outline-none text-black placeholder-gray-500 flex-1 px-2"
        />
        <button
          type="submit"
          className="text-red-500 hover:text-black transition-colors"
        >
          <FaSearch />
        </button>
      </form>
      <div className="flex items-center space-x-6">
        <FaHeart
          className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors"
          title="Favoriler"
        />
        <FaUserCircle
          className="text-white text-2xl cursor-pointer hover:text-blue-400 transition-colors"
          title="Hesabım"
        />
      </div>
      {isModalOpen && (
        <SearchModal searchResults={searchResults} closeModal={closeModal} />
      )}
    </nav>
  );
};

export default Navbar;
