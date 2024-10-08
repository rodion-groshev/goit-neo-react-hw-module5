import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovie } from "../../api/MovieApi";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backPath = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getMovie = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const result = await fetchMovie(movieId);
        setMovie(result);
      } catch (error) {
        setMovie([]);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  return (
    <>
      <Link to={backPath.current}>Back</Link>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <div>
          <ul className={css.detailsList}>
            <li>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                width={275}
                height={400}
                alt={movie.title}
              ></img>
            </li>
            <div className={css.textWrapper}>
              <li className={css.title}>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </li>
              <li>
                <a href={movie.homepage}>Official website</a>
              </li>
              <li className={css.subTitle}>Overview</li>
              <li>{movie.overview}</li>
              <li className={css.subTitle}>Genres</li>
              <li>{movie.genres.map((item) => item.name + " ")}</li>
            </div>
          </ul>
          <ul className={css.additionalList}>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
          <Suspense fallback="">
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
