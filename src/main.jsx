import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./junia/homeMovie";
import MovieSearch from "./junia/searchMovie";
import MovieDetail from "./junia/detailMovie";
import TrendingMovie from "./Hilzi/trendingMovies";
import PopularMovie from "./eka/PopularMovie";
import FavMovies from "./caca/FavMovies";
import NowPlaying from "./andika-branch/movie";


//mengisiasi object router 
const router = createBrowserRouter([
  {
    path: "/", //menentukan url
    element: <Home/>, //komponen yang akan ditampilkan
  },
  {
    path: "/movie",
    element: <MovieSearch/>,
  },
  {
    path: "/movie-detail",
    element: <MovieDetail/>,
  },
  {
    path: "/movie-trending",
    element: <TrendingMovie/>,
  },
  {
    path: "/movie-popular",
    element: <PopularMovie/>,
  },
  {
    path: "/movie-favorite",
    element: <FavMovies/>,
  },
  {
    path: "/movie-now",
    element: <NowPlaying/>,
  }, 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);