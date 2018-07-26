import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MOVIE_LIST_TYPE, MOVIE_CONTAINER_TYPE } from "../../config";
import moment from "moment";
import "./movie.module.css";

// define poster path. This is specific to themovedb.com api.
const POSTER_PATH = "http://image.tmdb.org/t/p/w185";

const Movie = ({ movie, listType, movieContainerClass }) => (
  <div>
    <Link to={`/${movie.id}`}>
      <div className={movieContainerClass}>
        {movie.poster_path ? (
          <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
        ) : (
          <img
            src={`https://fakeimg.pl/154x231/?font_size=16&text=${movie.title}`}
            alt={movie.title}
          />
        )}

        {listType === MOVIE_LIST_TYPE.upcoming && (
          <div className="movieReleaseDate">
            <p>{moment(movie.release_date).format("MMM DD YYYY")}</p>
          </div>
        )}
      </div>
    </Link>
  </div>
);

Movie.defaultProps = {
  listType: MOVIE_LIST_TYPE.default,
  movieContainerClass : MOVIE_CONTAINER_TYPE.movieContainer
};

Movie.propTypes = {
  movie: PropTypes.shape({ title: PropTypes.string.isRequired }).isRequired
};

export default Movie;
