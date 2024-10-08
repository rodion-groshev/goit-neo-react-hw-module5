import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movie }) => {
  const location = useLocation();
  return (
    <div className={css.card}>
      <Link state={location} to={`/${movie.id}`}>
        {movie.title}
      </Link>
      <p className={css.rating}>Rating: {movie.vote_average}</p>
    </div>
  );
};

export default MovieList;
