require("./MovieList.scss");
import React from 'react';
import $ from 'jquery';

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
    let count = 1;
    return (
      <div className="movielist-container" >
        <div className="movielist-header">
          Movie List
        </div>
        { this.state.movies.map((m) => {
          return (
            <div key={ m.id } >
              <div className="movielist-row" >
                Movie { count } - id { m.id }, title { m.title }
              </div>
              {
                count++ != this.state.movies.length &&
                <hr /> // List separator
              }
            </div>
          );
        })}
      </div>
    )
  };
};
