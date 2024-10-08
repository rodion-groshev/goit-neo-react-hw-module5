import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWQ5MDk5NDhiNzI2NWFkNjEwNjc2N2IxNDAwN2Y1NSIsIm5iZiI6MTcyNzg5NDY2MC4zMTc3MDMsInN1YiI6IjY2ZjkwZDk3MGY2ZmEyY2ZjZTVmNjNlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eaAPCieOIkjWR3igElfS8Q-XQ5tOCWJ4F2FbOIFLqsI",
  },
};

export const fetchMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  );
  return response.data.results;
};

export const fetchMovie = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}`,
    options
  );
  return response.data;
};

export const fetchCast = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
    options
  );
  return response.data.cast;
};

export const fetchReviews = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews`,
    options
  );
  return response.data.results;
};

export const fetchSearchingMovies = async (query) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    options
  );
  return response.data.results;
};
