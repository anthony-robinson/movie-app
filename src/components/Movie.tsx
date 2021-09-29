import React, { useState } from 'react';
import { Image, Modal, Card } from 'antd';
import { CSSTransition } from 'react-transition-group'
import { IMovie } from '../Interfaces';

interface IMovieProps {
    movie : IMovie | undefined,
}

const Movie = ({ movie } : IMovieProps) => {
    const [modalOpen, setModalOpen] = useState(false)
    const { Meta }  = Card
    return (
         <div>
             <Image preview={false} onClick={() => setModalOpen(true)} className="movie-image" src={movie?.image} />
             <Modal title={movie?.title} visible={modalOpen} onOk={() => setModalOpen(false)} onCancel={() => setModalOpen(false)}>
                 <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={movie?.image} />}
                >
                    <Meta description={movie?.plot || "N/A"} />
                </Card>
             </Modal>
         </div>
         
    );
}

export default Movie
