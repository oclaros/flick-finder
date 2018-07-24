import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./movie.module.css";

// define poster path. This is specific to themovedb.com api.
const POSTER_PATH = "http://image.tmdb.org/t/p/w185";

const Movie = ({ movie }) => (
  <div className={"movieContainer"}>
  <Link to={`/${movie.id}`}>
      { movie.poster_path ?
      <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} /> :
      <img src={`https://fakeimg.pl/154x231/?font_size=16&text=${movie.title}`} alt={movie.title} />
      }
  </Link>
  </div>
);

Movie.propTypes = {
  movie: PropTypes.shape({ title: PropTypes.string.isRequired,}).isRequired,
}

export default Movie;
