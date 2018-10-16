import React, { Component } from 'react';
import {Link, NavLink } from 'react-router-dom';
import MovieCard from './MovieCard';
import axios from 'axios';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/movies')
      .then(response => {
        this.setState(() => ({ movies: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  const {id} = movie;
  return (
    <NavLink key={movie.id} to={`/movies/${id}`}>
      <MovieCard {...movie}/>
    </NavLink>
  );
}
