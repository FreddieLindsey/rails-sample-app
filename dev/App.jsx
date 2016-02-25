import React from 'react';
import MovieList from './components/MovieList';

export default class App extends React.Component {
  static displayName = 'App';

  render() {
    return (
      <div>
        <MovieList />
      </div>
    );
  }
};
