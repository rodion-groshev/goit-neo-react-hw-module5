import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovie } from "../../api/MovieApi";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import DetailsList from "../../components/DetailsList/DetailsList";
import AdditionalList from "../../components/AdditionalList/AdditionalList";

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
      {movie && <DetailsList movie={movie} />}
      {movie && <AdditionalList />}

      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
