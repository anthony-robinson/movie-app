import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { Input, Spin, Space } from 'antd';
import MovieList from './components/MovieList';
import {getMovies, url, apikey} from "./Service";
import axios from 'axios';
import './App.css';

const { Search } = Input;



const App  = () =>  {
  const [movieImg, setMovieImg] = useState('');

  //the array of movie image urls 
  const [movies, setMovies] = useState<string[]>([]);
  useEffect(() => {
    let movieImages : string[] = [];
    const fetchMovies = async() => {
      const response = await getMovies("Inception");
      //to do -- grab define interface for data.Search to use properties for Movie Component;
      //console.log(response.data.Search);
      response.data.Search.map((item : any) => movieImages.push(item.Poster))
      setMovies([...movieImages])
    }
    fetchMovies()
  }, [])

   const onSearch = (value : string) : void => {
        if(!value) {
          return;
        }
        console.log(value);
        let movieImages: string[] = [];
        getMovies(value)
        .then(({ data }) => data.Search.map((item : any) => {
          movieImages.push(item.Poster);
        }))
        .then(() => {
            if (movieImages.length) {
            console.log('here')
            setMovies(movieImages);
          }
        });

        
    }  

  return (
    <div className="App">
      <div className="topbar">
        <h2>Find movies</h2>
        {/* <SearchBar onSearch={onSearch} /> */}
         <Search placeholder="E.g Harry Potter" 
            onSearch={onSearch} 
            enterButton
            allowClear
            style={{padding: "0 7em"}} 
        />
      </div>
      {movies.length ? <MovieList movies={movies} /> : 
        <Space direction="vertical" >
          <Spin tip="Loading Movies..." size="large"/>
        </Space>
      }
      {/* <Movie />
       {movieImg && <img src={movieImg} alt="movie here" /> } */}
    </div>
  );
}

export default App;
