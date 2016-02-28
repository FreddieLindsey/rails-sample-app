require("./MovieListItem.scss");
import React from 'react';

export default class MovieListItem extends React.Component {
  static displayName = 'Movie List Item';
  static propTypes = {
    movie: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      imdb_id: React.PropTypes.string,
      title: React.PropTypes.string.isRequired,
      poster_url: React.PropTypes.string,
      released: React.PropTypes.date,
      watched: React.PropTypes.bool
    }).isRequired,
    index: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired,
    handleDelete: React.PropTypes.func.isRequired
  };

  getDate(date) {
    let year = date.getFullYear();
    let months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    let month = months[date.getMonth()];
    let day = date.getDate()
    return `${day} ${month} ${year}`;
  }

  handleDelete = () => {
    this.props.handleDelete(this.props.movie.id);
  }

  render() {
    let m = this.props.movie;
    let i = this.props.index;
    let t = this.props.total;
    let r = new Date(m.released)
    let wStyleDefault = "movielist-item-watched-icon fa fa-2x"
    let wStyle = m.watched ?
      `${wStyleDefault} fa-times-circle-o` :
      `${wStyleDefault} fa-check-circle-o`;
    return (
      <div key={ m.id } className="movielist-item-row" >
        <div className="movielist-item-poster" >
          <img src={ m.poster_url } />
        </div>
        <div className="movielist-item-header" >
          <div className="movielist-item-title" >
            { `${ m.title }` }
          </div>
          {
            m.released &&
            <div className="movielist-item-released" >
              { `Released ${ this.getDate(r) }` }
            </div>
          }
        </div>
        <button className={ wStyle } onClick={ this.handleDelete } />
      </div>
    )
  }
};
