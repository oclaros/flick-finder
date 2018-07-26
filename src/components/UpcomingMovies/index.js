import React, { Component } from "react";
import {
  LANG_STRING,
  API_UPCOMING_MOVIES,
  MOVIE_LIST_TYPE
} from "../../config";
import axios from "axios";
import MovieList from "../MoveList";

class UpcomingMovies extends Component {
  state = {
    movieList: []
  };
  componentDidMount() {
    this.getUpcomingMovies(null);
  }
  getUpcomingMovies = e => {
    if (e) e.preventDefault();
    const currentMoviesRequest = `${API_UPCOMING_MOVIES}api_key=${
      process.env.REACT_APP_API_KEY
    }&${LANG_STRING}page=1&region=US&include_adult=false`;
    console.log("currentMoviesRequest", currentMoviesRequest);

    axios
      .get(currentMoviesRequest)
      .then(response => {
        this.setState({
          movieList: response.data.results
        });
        console.log("upcoming List", response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        {this.state.movieList && (
          <MovieList
            containerClass="now-playing-container"
            movieList={this.state.movieList}
            listTitle="Upcoming Movies"
            listType={MOVIE_LIST_TYPE.upcoming}
          />
        )}
      </div>
    );
  }
}

export default UpcomingMovies;
