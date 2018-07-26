import React, { Component } from "react";
import moment from "moment";
import { Button} from "reactstrap";
import {
  API_NOW_PLAYING,
  LANG_STRING,
  API_BASE_SEARCH_MOVIE,
  API_UPCOMING_MOVIES
} from "../../config";
import axios from "axios";
import MovieList from "../MoveList";
import "./home.module.css";

class Home extends Component {
  state = {
    movieList: [],
    searchList: [],
    movieSearchText: "star   wars"
  };

  handleMovieSearchTextChange = e => {
    e.preventDefault();
    let curVal = e.target.value;
    this.setState({ movieSearchText: curVal });
  };
  handleFindMovie = e => {
    e.preventDefault();

    if (!this.state.movieSearchText) return;
    const searchText = encodeURI(
      this.state.movieSearchText.replace(/\s+/g, " ").trim()
    );

    const findMovieRequest = `${API_BASE_SEARCH_MOVIE}?api_key=${
      process.env.REACT_APP_API_KEY
    }&query=${searchText}`;
    axios
      .get(findMovieRequest)
      .then(response => {
        this.setState({
          searchList: response.data.results
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getUpcomingMovies = e => {
    e.preventDefault();
    const currentMoviesRequest = `${API_UPCOMING_MOVIES}api_key=${
      process.env.REACT_APP_API_KEY
    }&${LANG_STRING}page=1&region=US&include_adult=false`;
    console.log("currentMoviesRequest", currentMoviesRequest);
    axios
      .get(currentMoviesRequest)
      .then(response => {
        this.setState({
          searchList: response.data.results
        });
        console.log("upcoming List", response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleGetMovies = () => {
    this.getCurrentMoviesInTheaters();
  };

  getCurrentMoviesInTheaters = () => {
    const currentMoviesRequest = `${API_NOW_PLAYING}api_key=${
      process.env.REACT_APP_API_KEY
    }&${LANG_STRING}`;
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
  test = e => {
    e.preventDefault();

    if (!this.state.movieSearchText) return;

    this.props.history.push({
      pathname: "/MovieSearch",
      state: { searchText: this.state.movieSearchText }
    });
  };
  render() {
    return (
      <div>
        <p>the time was {moment().format("YYYY-MM-DD")}</p>
        <Button color="danger" onClick={this.getCurrentMoviesInTheaters}>
          Get latest movies
        </Button>
        <Button color="primary" onClick={this.handleFindMovie}>
          find movie
        </Button>
        <Button color="info" onClick={this.getUpcomingMovies}>
          upcoming movies
        </Button>
        <Button color="secondary" onClick={this.test}>
          find movie (maybe?)
        </Button>
        <form
          className="movieSearchContainer"
          onSubmit={this.handleFindMovie}
        />
        {this.state.movieList && (
          <MovieList
            containerClass="now-playing-container"
            movieList={this.state.movieList}
            listTitle="Now Playing"
          />
        )}
      </div>
    );
  }
}

export default Home;
