import React, { Component } from "react";
import moment from "moment";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/fontawesome-free-solid";
import { API_BASE_STRING, API_NOW_PLAYING, LANG_STRING } from "../../config";
import axios from "axios";
import MovieList from '../MoveList';

class Home extends Component {
  state = {
    movieList: [],
    loading:false,
  };

  handleGetMovies = () => {
    this.getCurrentMoviesInTheaters();
  };

  getCurrentMoviesInTheaters = () => {
    const currentMoviesRequest = `${API_BASE_STRING}${API_NOW_PLAYING}&api_key=${process.env.REACT_APP_API_KEY}&${LANG_STRING}`;
    axios
      .get(currentMoviesRequest)
      .then(response => {
        this.setState({ movieList: response.data.results, 
          isLoading: false, });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <small>
          You are running this application in <b>{process.env.NODE_ENV}</b>{" "}
          mode.
        </small>
        <p>the time was {moment().format("YYYY-MM-DD")}</p>
        <Button color="danger" onClick={this.handleGetMovies}>
          Danger!!!
        </Button>
        <div>
          <FontAwesomeIcon icon={faCoffee} />I love coffee
        </div>
          <MovieList containerClass='now-playing-container' movieList={this.state.movieList} listTitle='Now Playing'/>
      </div>
    );
  }
}

export default Home;
