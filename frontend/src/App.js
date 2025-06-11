import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MovieDetail from "./pages/MovieDetail";
import ActorDetail from "./pages/ActorDetail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="w-full h-full bg-[#1b1a1a]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/actor/:id" element={<ActorDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
