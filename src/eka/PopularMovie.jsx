/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const API_KEY = "d0ae83de32a46c56ef37b5365b3cb76e";

export default function PopularMovie() {
  const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState("");
  const [page, setPage] = useState("");
  const [region, setRegion] = useState("");

  const moviesPopular = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}&page=${page}&region=${region}`,
        { headers: { accept: "application/json" } }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handlePageChange = (event) => {
    setPage(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleShowPopularMovies = () => {
    moviesPopular();
  };

  // Memanggil function moviesPopular saat komponen pertama kali dirender
  useEffect(() => {
    moviesPopular();
  }, []);

  return (
    <div
      className="font-poppins"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="mx-auto p-4">
        <h1 className="text-3xl text-center font-bold mt-7 mb-4">
          Popular Movies
        </h1>
        <div className="flex justify-center items-center mt-7 mb-4">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 mr-4"
            onChange={handleLanguageChange}
          >
            <option selected disabled>
              Language
            </option>
            <option value="en-US">English</option>
            <option value="id-ID">Indonesian</option>
            <option value="ar-SA">Arabic</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 mr-4"
            onChange={handlePageChange}
          >
            <option selected disabled>
              Page
            </option>
            <option value="1">Page 1</option>
            <option value="2">Page 2</option>
            <option value="3">Page 3</option>
            <option value="3">Page 4</option>
            <option value="3">Page 5</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 mr-4"
            onChange={handleRegionChange}
          >
            <option selected disabled>
              All Regions
            </option>
            <option value="SA">Saudi Arabia</option>
            <option value="ID">Indonesia</option>
            <option value="EN">EN</option>
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-2 rounded-md focus:outline-none focus:ring"
            onClick={handleShowPopularMovies}
          >
            Show
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="mt-2 rounded-lg flex flex-col gap-y-3 max-w[380px] max-w[300px] max-sm:min-w-[250px] items-center shadow-[0_0_2px_1px_rgb(0,0,0,0.3)]"
              style={{ height: "100%" }}
            >
              <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative">
                <img
                  className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                />
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="max-w-44 rounded-sm"
                />
                <h2 className="font-bold px-5 text-xl mt-3 mb-2">
                  {movie.title}
                </h2>
                <h2 className="px-5 mb-2">
                  Release date: {movie.release_date}
                </h2>
                <h2 className="font-thin px-5 mb-2 text-justify">
                  {movie.overview.slice(0, 150)}...
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
