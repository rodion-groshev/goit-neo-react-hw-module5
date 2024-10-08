import { useEffect, useState } from "react";
import { fetchCast } from "../../api/MovieApi";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const { movieId } = useParams();

  const [casts, setCasts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const result = await fetchCast(movieId);
        setCasts(result);
      } catch (error) {
        setCasts([]);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);
  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {casts && (
        <ul className={css.castList}>
          {casts.map((cast) => (
            <li key={cast.id} className={css.castItem}>
              <img
                className={css.castImg}
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                width={275}
                height={375}
                alt={cast.name}
              ></img>
              <p>{cast.name}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
