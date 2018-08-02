import React, { Component } from "react";
import {
  LANG_STRING,
  API_NOW_PLAYING,
  MOVIE_LIST_TYPE,
  MOVIE_CONTAINER_LAYOUT_TYPE
} from "../../config";
import axios from "axios";
import MovieList from "../MoveList";

class NowPlaying extends Component {
  state = {
    movieList: []
  };
  componentDidMount() {
    this.getNowPlaying(null);
  }
  getNowPlaying = e => {
    if (e) e.preventDefault();
    const currentMoviesRequest = `${API_NOW_PLAYING}api_key=${
      process.env.REACT_APP_API_KEY
    }&${LANG_STRING}page=1&region=US&include_adult=false`;
    axios
      .get(currentMoviesRequest)
      .then(response => {
        this.setState({
          movieList: response.data.results
        });
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
            containerClass={MOVIE_CONTAINER_LAYOUT_TYPE.movieContainerSolo}
            movieList={this.state.movieList}
            listTitle="Now Playing"
            listType={MOVIE_LIST_TYPE.default}
          />
        )}
      </div>
    );
  }
}

export default NowPlaying;
