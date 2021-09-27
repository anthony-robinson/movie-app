import React from 'react'
import Movie from './Movie'
import { Row, Col } from 'antd';

interface IMovieListProps {
    movies: string[]
}

const MovieList = ({ movies } : IMovieListProps) => {
    return (
        <div className="wrapper">
            {movies.map((movie, index) => {
                return <Movie key={index} link={movie} />
            })}
        </div>
    );
    //using antd? may decide to go with these components
    // return (
    //     <Row gutter={8}>
    //         {movies.map((movie) => {
    //             return <Col className="gutter-row" span={6}><Movie link={movie} /></Col>
    //         })}
    //     </Row>
    // )
}

export default MovieList
