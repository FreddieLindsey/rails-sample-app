require("./MovieList.scss");
import React from 'react';
import $ from 'jquery';
import MovieListAdd from './MovieListAdd';
import MovieListItem from './MovieListItem';

export default class MovieList extends React.Component {
  static displayName = 'Movie List';

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    $.ajax({
      url: 'http://localhost:3001/movies'
    }).done((result) => {
      this.setState({
        movies: result
      });
    }).fail((err) => {
      console.log(err);
    });
  }

  render() {
    let count = 0;
    return (
      <div className="movielist-container" >
        <div className="movielist-header" >
          Movie List
        </div>
        <MovieListAdd />
        {
          this.state.movies.length > 0 &&
          <div className="movielist-content" >
            { this.state.movies.map((m) => {
              count++;
              return (
                <MovieListItem key={ m.id } movie={ m } index={ count }
                               total={ this.state.movies.length }/>
              );
            })}
          </div>
        }
      </div>
    )
  };
};
