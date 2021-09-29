import React, { useState, useEffect } from 'react';
import { Input, Spin, Modal } from 'antd';
import MovieList from './components/MovieList';
import {getMovies, getSingleMovie} from "./Service";
import { useDebouncedEffect } from './useDebouncedEffect';
import { IMovie } from './Interfaces';
import './App.css';

const { Search } = Input;

const initialMovies = ['No Country for Old Men', 'Joker', 'Tenet', 'The Gentlemen', 'Amadeus', 'Green Book', 'Harry Potter and the Deathly Hallows', 'The Dish'];

const App  = () =>  {
  //the array of movies with properties 
  // to do: rewrite props 
  const [movies, setMovies] = useState<(IMovie | undefined)[]>([]);
  const [tag, setTag] = useState('YOU MIGHT LIKE')
  const [term, setTerm] = useState('');

  useEffect(() => {
    let movieImages : string[] = [];
    (async() => {
      const promises = initialMovies.map(async(title : string) => {
        const response = await getSingleMovie(title);
        let movie: IMovie;
        if (response?.data) {
            let { data } = response
            movie = {
            title: data.Title,
            plot: data.Plot,
            released: data.Released,
            rating: data.imdbRating,
            genre: data.genre,
            image: data.Poster,
            year: data.Year
          }
          return movie;
        } 
      })
      const results = await Promise.all(promises);
      if (results) {
        setMovies(results);
      }
    })();
  }, [])

  useDebouncedEffect(() => {
    if(!term) {
      return setTag('YOU MIGHT LIKE');
    }
    if(term.length < 2) {
      return;
    }
    let fetchedMovies : IMovie[] = [];
    (async() => {
      const response = await getMovies(term);
      console.log(response);
      if (response?.data?.Search) {
        let { Search } = response.data;
        let movie : IMovie = {
          title: Search.Title,
          plot: Search.Plot,
          released: Search.Released,
          rating: Search.imdbRating,
          genre: Search.genre,
          image: Search.Poster,
          year: Search.Year
        }
        Search.slice(0,8).map((item : any) => {
          let movie : IMovie = {
            title : item.Title,
            image: item.Poster,
            year: item.Year
          }
          fetchedMovies.push(movie)
        });
        console.log(fetchedMovies)
        setMovies(fetchedMovies);
        setTag('SEARCH RESULTS')
      }
    })();
  }, 500, [term]);


  return (
    <div className="App">
      <div className="topbar">
        <h2>Find movies</h2>
         <Search placeholder="E.g Harry Potter"
            id="movie-input"
            autoComplete="off"
            onChange={(e) => setTerm(e.target.value)} 
            enterButton
            allowClear
            style={{padding: "0 7em", borderRadius: "50%", marginBottom: "30px"}} 
        />
      </div>
      <p className="tag">{tag}</p>
      {movies.length ? <MovieList movies={movies} /> : 
          <div>
            <Spin tip="Loading Movies..." size="large"/>
          </div>
      }
    </div>
  );
}

export default App;
