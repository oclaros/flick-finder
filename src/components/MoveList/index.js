import React, { Component } from 'react';
import Movie from '../Movie';
import './movielist.module.css';
import moment from 'moment';
import {sortBy} from 'lodash';

class MovieList extends Component {
  render() {
    const list = sortBy(this.props.movieList, movie => {
      return new moment(movie.release_date);
    })
    return (
      <div>
      <h1>{this.props.listTitle}</h1>
      <div className={this.props.containerClass} >
        {list.map(movie => {
          return (
            <Movie key={movie.id} movie={movie} listType={this.props.listType} />              
          );
        })}
      </div>
      </div>
    );
  }
}

export default MovieList;