/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// CARA BUAT API KEY TMDB
// https://www.themoviedb.org/settings/api
// const API_KEY = "52b2a50250de0b7306b76a36c51029e8";
const ACC_ID = "21134706";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmIyYTUwMjUwZGUwYjczMDZiNzZhMzZjNTEwMjllOCIsInN1YiI6IjY2MDEyMzEyN2Y2YzhkMDE2MzZmZDQ4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.owhLgAWxk1jrcJHXp2KuqjPgImpP1fch2iCpz-dOLj8";

const FavMovies = () => {
  const [selectLanguage, setSelectLanguage] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const favMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/${ACC_ID}/favorite/movies?language=${selectLanguage}&page=1&sort_by=created_at.asc`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data ", response.data);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    favMovies();
  };

  const handleLanguage = (event) => {
    setSelectLanguage(event.target.value);
  };

  return (
    <div>
      <h1 className="text-center my-10 font-bold text-2xl">Favorite Movie</h1>
      <div className="max-w-8xl mx-auto flex flex-col justify-center items-center gap-8 pb-24">
        <form onSubmit={handleSubmit}>
          <div className="mx-10 ml-14 mb-8">
            <select
              onChange={handleLanguage}
              defaultValue=""
              className="p-2 mr-4 border outline-none focus:border-blue-600 rounded-sm hover:shadow-lg"
            >
              <option value="" disabled hidden>
                Language
              </option>
              <option value="ar-SA">Arabic</option>
              <option value="en-US">English</option>
              <option value="id-ID">Indonesian</option>
            </select>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 text-black hover:text-white me-4 p-2 rounded-md border-double border-[3px]"
            >
              Submit
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 pb-2">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col gap-y-3 max-w-[380px] min-w-[300px] max-sm:min-w-[250px] shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center"
                onClick={() => {
                  navigate("/movie-detail", { state: { id: movie.id } });
                }} >
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
                </div>
                <h2 className="font-bold px-8 pt-2">ID : {movie.id}</h2>
                <h2>{movie.original_title}</h2>
                <h2 className="font-light m-1 mb-3 mx-4 text-justify">
                  {movie.overview}
                </h2>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FavMovies;
