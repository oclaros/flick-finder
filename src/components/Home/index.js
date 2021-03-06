import React, { Component } from "react";
import {
  API_NOW_PLAYING,
  LANG_STRING,
  API_BASE_SEARCH_MOVIE,
  API_UPCOMING_MOVIES,
  MOVIE_CONTAINER_LAYOUT_TYPE,
  MOVIE_LIST_TYPE
} from "../../config";
import { Button, InputGroup, InputGroupAddon, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import axios from "axios";
import MovieList from "../MoveList";
import "./home.module.css";

class Home extends Component {
  state = {
    movieList: [],
    searchList: [],
    upcomingList: [],
    movieSearchText: "",
  };

  componentDidMount() {
    this.getCurrentMovies();
    this.getUpcomingMovies(null);
  }

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
    if (e) e.preventDefault();
    const currentMoviesRequest = `${API_UPCOMING_MOVIES}api_key=${
      process.env.REACT_APP_API_KEY
    }&${LANG_STRING}page=1&region=US&include_adult=false`;
    axios
      .get(currentMoviesRequest)
      .then(response => {
        this.setState({
          upcomingList: response.data.results
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleGetMovies = () => {
    this.getCurrentMovies();
  };

  getCurrentMovies = () => {
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
        <div>
        <div className="movieSearchContainer">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroupAddon>
            <Input
              placeholder="Enter the name of the movie"
              onChange={this.handleMovieSearchTextChange}
              value={this.state.movieSearchText}
            />
          </InputGroup>
          <Button
            outline
            color="primary"
            onClick={e => this.test( e)}
          >
            search
          </Button>
        </div>

        </div>
        <div className="movieCollectionContainer">
          <div className="upcomingCollectionContainer">
            {this.state.upcomingList && (
              <MovieList
                containerClass={MOVIE_CONTAINER_LAYOUT_TYPE.movieContainerDuo}
                movieList={this.state.upcomingList}
                listTitle="Upcoming Movies"
                listType={MOVIE_LIST_TYPE.upcoming}
              />
            )}
          </div>
          <div className="nowPlayingCollectionContainer">
            {this.state.movieList && (
              <MovieList
                containerClass={MOVIE_CONTAINER_LAYOUT_TYPE.movieContainerDuo}
                movieList={this.state.movieList}
                listTitle="Now Playing"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
