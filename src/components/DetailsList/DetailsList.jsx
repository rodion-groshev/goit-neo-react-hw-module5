import css from "./DetailsList.module.css";

const DetailsList = ({ movie }) => {
  return (
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
  );
};

export default DetailsList;
