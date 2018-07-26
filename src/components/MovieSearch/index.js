import React, { Component } from "react";
import { Button, InputGroup, InputGroupAddon, Input } from "reactstrap";
import { LANG_STRING, API_BASE_SEARCH_MOVIE } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import axios from "axios";
import "./moviesearch.module.css";
import MovieList from "../MoveList";

class MovieSearch extends Component {
  state = {
    movieSearchText: "",
    movieList: []
  };
  componentDidMount() {
    this.handleMovieSearch(this.props.location.state.searchText, null);
  }

  handleMovieSearch = (searchText, e) => {
    if (e) e.preventDefault();
    if (!searchText) return;
    const text = encodeURI(searchText.replace(/\s+/g, " ").trim());
    this.setState({ movieList: [], movieSearchText : searchText.replace(/\s+/g, " ").trim() });
    const findMovieRequest = `${API_BASE_SEARCH_MOVIE}?query=${text}&api_key=${
      process.env.REACT_APP_API_KEY
    }&${LANG_STRING}&page=1&include_adult=false`;
    axios
      .get(findMovieRequest)
      .then(response => {
        this.setState({ movieList: response.data.results });
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleMovieSearchTextChange = e => {
    e.preventDefault();
    let curVal = e.target.value;
    this.setState({ movieSearchText: curVal });
  };

  render() {
    return (
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
            onClick={e => this.handleMovieSearch(this.state.movieSearchText, e)}
          >
            search
          </Button>
        </div>
        {this.state.movieList && (
          <MovieList
            containerClass="now-playing-container"
            movieList={this.state.movieList}
            listTitle={`Results`}
          />
        )}
      </div>
    );
  }
}

export default MovieSearch;
