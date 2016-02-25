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
      <div>
        <h1>Movie List</h1>
        { this.state.movies.map((m) => {
          return (<div key={ m.id }>
            Movie { count++ } id { m.id }, title { m.title }
          </div>);
        })}
      </div>
    )
  };
};
