import { NavLink } from "react-router-dom";
import css from "./AdditionalList.module.css";

const AdditionalList = () => {
  return (
    <ul className={css.additionalList}>
      <li>
        <NavLink to="cast">Cast</NavLink>
      </li>
      <li>
        <NavLink to="reviews">Reviews</NavLink>
      </li>
    </ul>
  );
};

export default AdditionalList;
