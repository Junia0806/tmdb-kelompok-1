/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const API_KEY = "3d46ebf198dce59fc5e125d9ec59e72a";

export default function MovieDetail() {
  const location = useLocation();
  const [detail, setDetail] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        console.log("responsen data id detail", response.data.id);
        setDetail(response.data);
      } catch (error) {
        console.error("Error fetching detail data: ", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${location.state.id}/reviews?language=en-US&page=1&api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchDetail();
    fetchReviews();
  }, [location.state.id]);

  return (
    <div className="mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex p-10">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{detail?.title}</h2>
            <h2 className="text-lg text-gray-600 mb-2">
              {detail?.release_date}
            </h2>
            <p className="text-gray-800 mb-4">{detail?.overview}</p>
            <h2 className="mb-2">Popularity: {detail?.popularity}</h2>
            <h2 className="mb-2">Status: {detail?.status}</h2>
            <Link
              to={"/movie"}
              className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-72 text-center"
            >
              BACK TO SEARCH MOVIE
            </Link>
          </div>
          <div className="flex-1">
            <img
              src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
              alt={detail?.title}
              className="w-auto h-82 rounded-lg max-w-full"
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Reviews {detail?.title}</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-700 italic">
              Belum ada review pada film {detail?.title}{" "}
            </p>
          ) : (
            <div className="flex flex-wrap">
              {reviews.map((review, index) => (
                <div key={index} className="w-full mb-4 md:px-2">
                  <div className="bg-gray-100 rounded-lg shadow-md p-4">
                    <h4 className="text-xl font-semibold">
                      Author: {review.author}
                    </h4>
                    <p className="text-l">
                      Rating: {review.author_details.rating} / 10
                    </p>
                    <p className="text-l">Created at: {review.created_at}</p>
                    <p className="text-gray-700 mt-2">{review.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
