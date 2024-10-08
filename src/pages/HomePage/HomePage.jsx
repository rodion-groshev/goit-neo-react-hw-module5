import { useEffect, useState } from "react";
import { fetchMovies } from "../../api/MovieApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const result = await fetchMovies();
        setMovies(result);
      } catch (error) {
        setMovies([]);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieList movie={movie} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
