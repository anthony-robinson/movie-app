import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { Input, Spin, Space } from 'antd';
import MovieList from './components/MovieList';
import {getMovies, getSingleMovie} from "./Service";
import { useDebouncedEffect } from './useDebouncedEffect';
import './App.css';

const { Search } = Input;

const initialMovies = ['Madly in Love', 'Joker', 'Tenet', 'The Gentlemen', 'Birds of Prey', 'Green Book', 'Harry Potter and the Deathly Hallows', 'Parasite'];

const App  = () =>  {
  //the array of movie image urls 
  const [movies, setMovies] = useState<string[]>([]);
  const [tag, setTag] = useState('YOU MIGHT LIKE')
  const [term, setTerm] = useState('');

  useEffect(() => {
    let movieImages : string[] = [];
    (async() => {
      const promises = initialMovies.map(async(title : string) => {
        const response = await getSingleMovie(title);
        return response?.data.Poster;
      })
      const results = await Promise.all(promises);
      setMovies(results);
    })();
  }, [])

  useDebouncedEffect(() => {
    if(!term) {
      return setTag('YOU MIGHT LIKE');
    }
    if(term.length < 2) {
      return;
    }
    let movieImages : string[] = [];
    (async() => {
      const response = await getMovies(term);
      if (response?.data?.Search) {
        response.data.Search.map((item : any) => movieImages.push(item.Poster));
        setMovies(movieImages);
        setTag('SEARCH RESULTS')
      }
    })();
  }, 500, [term]);

   const onSearch = (value : string) : void => {
        if(!value) {
          setTag('YOU MIGHT LIKE');
          return;
        }
        console.log(value);
        let movieImages: string[] = [];
        (async() => {
          const response = await getMovies(value);
          response && response.data.Search.map((item : any) => movieImages.push(item.Poster))
          setTag('SEARCH RESULTS');
          setMovies(movieImages);
        })();
    }  

  return (
    <div className="App">
      <div className="topbar">
        <h2>Find movies</h2>
         <Search placeholder="E.g Harry Potter"
            id="movie-input"
            onChange={(e) => setTerm(e.target.value)} 
            enterButton
            allowClear
            style={{padding: "0 7em"}} 
        />
      </div>
      <p className="tag">{tag}</p>
      {movies.length ? <MovieList movies={movies} /> : 
          <div>{movies.length}
          <Spin tip="Loading Movies..." size="large"/>
          </div>
      }
    </div>
  );
}

export default App;
