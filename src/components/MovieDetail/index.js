import React, { Component } from "react";
import axios from "axios";
import MovieCredits from "../MovieCredits";
import { Jumbotron } from "reactstrap";
import { API_BASE_MOVIE_QUERY, LANG_STRING } from "../../config";
import "./moviedetail.module.css";
import { PulseLoader } from "react-spinners";

const POSTER_PATH = "http://image.tmdb.org/t/p/w342";
const BACKDROP_PATH = "http://image.tmdb.org/t/p/w1280";
/*
`https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }?api_key=1f26bed915752c6f47b95e86bd0dd4bc&language=en-US`,
*/
class MovieDetail extends Component {
  state = { movie: [], cast: [], crew: [], loading: true };
  componentDidMount() {
    this.getMovie();
    this.getCredits();
  }

  getMovie = () => {
    const movieRequest = `${API_BASE_MOVIE_QUERY}${
      this.props.match.params.id
    }?api_key=${process.env.REACT_APP_API_KEY}&${LANG_STRING}`;

    axios
      .get(movieRequest)
      .then(response => {
        this.setState({ movie: response.data, loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getCredits = () => {
    const creditsRequest = `${API_BASE_MOVIE_QUERY}${
      this.props.match.params.id
    }/credits?api_key=${process.env.REACT_APP_API_KEY}&${LANG_STRING}`;

    axios
      .get(creditsRequest)
      .then(response => {
        this.setState({ cast: response.data.cast, crew: response.data.crew });
      })
      .catch(error => {
        console.log(error);
      });
  };
  getImage = (poster, title) => {
    let src = poster
      ? `${POSTER_PATH}${poster}`
      : `https://fakeimg.pl/154x231/?font_size=16&text=${title}`;
    return <img src={src} alt={title} />;
  };
  render() {
    const { movie, cast, crew } = this.state;
    const year = movie ? movie.release_date : null;
    const releaseYear = year ? year.substring(0, 4) : null;
    if (this.state.loading)
      return (
        <div
          style={{
            textAlign: "center",
            marginTop: "10rem",
            padding: "3%",
            marginBottom: "15rem",
            color: "#123abc"
          }}
        >
          <h2>loading...</h2>
          <PulseLoader color={"#123abc"} loading={this.state.loading} />
        </div>
      );

    return (
      <div>
        {movie && (
          <div>
            <Jumbotron
              className="jumbo"
              style={{
                backgroundImage: `url(${BACKDROP_PATH}${movie.backdrop_path})`
              }}
            >
              <div className="movieDetailHeaderRow">
                <div className="movieDetailContainer">
                  <div className="moviePoster">
                    {this.getImage(movie.poster_path, movie.title)}
                  </div>
                  <div className="movieSummary">
                    <h2>
                      <a href={movie.homepage} target="_blank">
                        {`${movie.title} (${releaseYear})`}
                      </a>
                    </h2>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              </div>
            </Jumbotron>

            <MovieCredits cast={cast} crew={crew} />
          </div>
        )}
      </div>
    );
  }
}

export default MovieDetail;
