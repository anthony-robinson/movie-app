import React, { useRef } from 'react';
import { Image } from 'antd';

interface IMovieProps {
    link : string
}


const Movie = ({ link } : IMovieProps) => {
    return (
          <img className="movie-image" alt="example" src={link} />
        // using antd : <Image width={200} src={link} />
    );
}

export default Movie
