import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;  
    this.fetchMovie(id);
    // if there were a data set => import Movies from './movies'
    // const id = this.props.match.params.id;  // is a string
    // const foundId = Movies.find(movie => movie.id === Number(id));
    //  if (!foundId) return;
    //  this.setState({ movie: foundId})
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };
  // Uncomment this code when you're ready for the stretch problems
  componentWillReceiveProps(newProps){
    if(this.props.match.params.id !== newProps.match.params.id){
      this.fetchMovie(newProps.match.params.id);
    }
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard {...this.state.movie}/>
        <div onClick={this.saveMovie} className="save-button">Save</div>
      </div>
    );
  }
}
