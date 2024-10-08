import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className={css.card}>
            <Link state={location} to={`/movies/${movie.id}`}>
              {movie.title}
            </Link>
            <p className={css.rating}>Rating: {movie.vote_average}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
