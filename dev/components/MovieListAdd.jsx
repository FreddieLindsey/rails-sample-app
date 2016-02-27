require("./MovieListAdd.scss");
import React from 'react';

export default class MovieListAdd extends React.Component {
  static displayName = 'Movie List Add Item';
  static propTypes = {
    switchParam: React.PropTypes.string.isRequired,
    handleSwitch: React.PropTypes.func.isRequired,
    handleAdd: React.PropTypes.func.isRequired,
    handleAddError: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  handleAdd = () => {
    this.props.handleAdd(this.state.inputValue);
    this.setState({
      inputValue: ''
    });
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      inputValue: e.currentTarget.value
    });
  }

  handleSwitchId = () => {
    console.log('Using id for adding items.');
    this.props.handleSwitch('id');
  }

  handleSwitchTitle = () => {
    console.log('Using title for adding items.');
    this.props.handleSwitch('title');
  }

  render() {
    let buttonClass = (param) => {
      return this.props.switchParam == param ?
      "movielist-add-item-switcher-selected" :
      "movielist-add-item-switcher" ;
    }
    return (
      <div className="movielist-add-container">
        <div className="movielist-add-switcher">
          <button className={ buttonClass('id') } onClick={ this.handleSwitchId }>
            ID
          </button>
          <button className={ buttonClass('title') } onClick={ this.handleSwitchTitle }>
            Title
          </button>
        </div>
        <div className="movielist-add-input-container">
          <input value={ this.state.inputValue } onChange={ this.handleInput } className="movielist-add-input" />
        </div>
        <button onClick={ this.handleAdd } className="movielist-add-button fa fa-2x fa-plus-square-o" />
      </div>
    );
  }
};
