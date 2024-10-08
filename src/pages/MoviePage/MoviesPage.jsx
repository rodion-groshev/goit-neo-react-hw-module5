import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchingMovies } from "../../api/MovieApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MoviePage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [params, setParams] = useSearchParams();

  const paramsMovieName = params.get("query");

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!query) return setParams({});

    params.set("query", query.toLowerCase());
    setParams(params);
    setQuery("");
  };

  useEffect(() => {
    if (!paramsMovieName) return;

    const getSearchingMovies = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const result = await fetchSearchingMovies(paramsMovieName);
        setMovies(result);
      } catch (error) {
        setMovies([]);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getSearchingMovies();
  }, [paramsMovieName]);

  return (
    <>
      <form className={css.movieForm} onSubmit={handleSubmit}>
        <input
          className={css.movieInput}
          type="text"
          placeholder="Enter the film name"
          value={query}
          onChange={handleChange}
        ></input>
        <button type="submit">Search</button>
      </form>

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies && <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
