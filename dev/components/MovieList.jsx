require("./MovieList.scss");
import React from 'react';
import $ from 'jquery';
import MovieListAdd from './MovieListAdd';
import MovieListItem from './MovieListItem';

// Strip param of url-unfriendliness
let strip = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to   = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  return str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '%20') // collapse whitespace and replace by -
};

export default class MovieList extends React.Component {
  static displayName = 'Movie List';

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      switchParam: 'id'
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

  handleAdd = (param) => {
    // Request information from omdb.com's api
    let urlQuery;
    switch(this.state.switchParam) {
    case 'id':
      urlQuery = `http://omdbapi.com/?i=${strip(param)}`;
    case 'title':
      urlQuery = `http://omdbapi.com/?t=${strip(param)}`;
    }

    let addToServer = (m) => {
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3001/movie/create',
        data: m
      }).done((res) => {
        let movies = this.state.movies;
        movies.unshift(res);
        this.setState({
          movies: movies
        });
      });
    }

    $.ajax({
      url: urlQuery
    }).done((result) => {
      let m = {};
      m.title = result.Title;
      m.imdb_id = result.imdbID;
      m.poster_url = result.Poster;
      m.released = result.Released;
      addToServer(m);
    }).fail((err) => {
      console.log('Error\n' + err);
    });
  }

  handleDelete = (id) => {
    $.ajax({
      type: 'DELETE',
      url: `http://localhost:3001/movie/destroy/${id}`
    }).done((res) => {
      let movies = this.state.movies;
      movies = movies.filter((e) => {
        return e.id != res.destroyed.id;
      });
      this.setState({
        movies: movies
      });
    }).fail((err) => {
      console.log(err);
    })
  }

  handleSwitch = (param) => {
    let allowedParams = [ 'id', 'title' ];
    if (allowedParams.indexOf(this.state.switchParam) === -1) {
      console.log('There was an error with the function handleSwitch. Please inform the site\'s administrator. Your param was ' + param);
      return;
    }
    this.setState({
      switchParam: param
    });
  }

  render() {
    let count = 0;
    return (
      <div className="movielist-container" >
        <div className="movielist-header" >
          Movie List
        </div>
        <MovieListAdd switchParam={ this.state.switchParam } handleSwitch={ this.handleSwitch } handleAdd={ this.handleAdd } />
        {
          this.state.movies.length > 0 &&
          <div className="movielist-content" >
            { this.state.movies.map((m) => {
              count++;
              return (
                <MovieListItem key={ m.id } movie={ m } index={ count }
                               total={ this.state.movies.length }
                               handleDelete={ this.handleDelete } />
              );
            })}
          </div>
        }
      </div>
    )
  };
};
