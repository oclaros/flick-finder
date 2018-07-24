import React, { Component } from 'react';
import Movie from '../Movie';
import './movielist.module.css';

class MoviList extends Component {
  render() {
    return (
      <div>
      <h1>{this.props.listTitle}</h1>
      <div className={this.props.containerClass} >
        {this.props.movieList.map(movie => {
          return (
            <Movie key={movie.id} movie={movie} />              
          );
        })}
      </div>
      </div>
    );
  }
}

export default MoviList;