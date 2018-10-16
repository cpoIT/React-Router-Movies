import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: []
    };
  }

  clickHandler = (event) => {
    event.preventDefault();
  }

  addToSavedList = movie => {
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({ savedList });
  };

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        {/* <Route exact path="/" component={MovieList} /> */}
        <Route exact path="/" render={props => <MovieList {...props} />} /> 
        <Route path='/movies/:id' render={(props) => <Movie  {...props} addToSavedList={(movie) => {this.addToSavedList(movie)}}/>}/>
      </div>
    );
  }
}

// props in MovieList comes from its Route (History Location Match) not from the App Component
