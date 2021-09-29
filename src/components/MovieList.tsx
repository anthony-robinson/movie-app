import React from 'react'
import Movie from './Movie'
import { IMovie } from '../Interfaces';

interface IMovieListProps {
    movies: (IMovie | undefined)[],
}

const MovieList = ({ movies } : IMovieListProps) => {
    return (
        <div className="wrapper">
            {movies.map((movie : (IMovie | undefined), index) => {
                return <Movie key={index} movie={movie} />
            })}
        </div>
    );
}

export default MovieList
