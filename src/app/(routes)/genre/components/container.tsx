import React from 'react';
import useAllGenres from '../../../../../actions/get-all-genres';
import Card from '../../components/Card';
import { Movie,Genres } from '../../../../../type';

const Container: React.FC = () => {
    const { allMovies, loading, error } = useAllGenres(Genres);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='flex flex-col justify-between py-8'>
            <p className='text-center'>Showing Movies & Tv Shows For All Genres</p>
            <div className='flex flex-col gap-4'>
                {allMovies.map((genreMovies: Movie[], index: number) => (
                    // Check if genreMovies array is not empty before rendering the genre section
                    genreMovies.length > 0 && (
                        <div key={index} className='py-5 px-2'>
                            <p className='text-4xl font-serif font-thin pb-4'>{Genres[index]}</p>
                            <div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>    
                                {genreMovies.map((movie: Movie, movieIndex: number) => (
                                    <div className='flex'><Card key={movieIndex} movie={movie} /></div>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Container;
