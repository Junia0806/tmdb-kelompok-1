import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "570c36d75740509c00d865a804d826a5";
const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing";

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Now Playing Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              className="w-full object-cover rounded-t-lg"
              style={{ height: "30rem" }}
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <p className="text-gray-500 mb-4">{movie.release_date}</p>
              <p className="text-gray-700 mb-4">{movie.overview}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rating: {movie.vote_average}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowPlaying;
