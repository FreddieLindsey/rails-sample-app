require("./MovieListAdd.scss");
import React from 'react';

export default class MovieListAdd extends React.Component {
  static displayName = 'Movie List Add Item';

  render() {
    return (
      <div className="movielist-add-container">
        <div className="movielist-add-switcher">
          Switcher
        </div>
        <div className="movielist-add-input-container">
          <input className="movielist-add-input" />
        </div>
        <button className="movielist-add-button fa fa-2x fa-plus-square-o" />
      </div>
    );
  }
};
