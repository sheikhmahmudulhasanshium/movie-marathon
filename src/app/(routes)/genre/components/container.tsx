import React, { useState } from 'react';
import useAllGenres from '../../../../../actions/get-all-genres';
import Card from '../../components/Card';
import { Movie, Genres } from '../../../../../type';

const Container: React.FC = () => {
    const { allMovies, loading, error } = useAllGenres(Genres);
    const maxMoviesToShow = 10; // Maximum number of movies to show for each genre initially
    const [moviesToShow, setMoviesToShow] = useState<{ [key: string]: number }>(
        Genres.reduce((acc, genre) => ({ ...acc, [genre]: maxMoviesToShow }), {})
    ); // Number of movies currently shown for each genre

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleSeeMore = (genre: string) => {
        setMoviesToShow(prevCount => ({ ...prevCount, [genre]: prevCount[genre] + maxMoviesToShow })); // Increment movies to show for the specific genre
    };

    const handleSeeLess = () => {
        setMoviesToShow(Genres.reduce((acc, genre) => ({ ...acc, [genre]: maxMoviesToShow }), {})); // Reset movies to show for all genres
    };

    const allMoviesShown = Object.values(moviesToShow).every(count => count === maxMoviesToShow); // Check if all genres are showing maximum movies

    return (
        <div className='flex flex-col justify-between py-8 gap-y-8'>
            <p className='text-center'>Showing Movies & Tv Shows For All Genres</p>
            <div className='flex flex-col gap-4'>
                {allMovies.map((genreMovies: Movie[], index: number) => (
                    // Check if genreMovies array is not empty before rendering the genre section
                    genreMovies.length > 0 && (
                        <div key={index} className='py-5 px-2'>
                            <p className='text-4xl font-serif font-thin pb-4'>{Genres[index]}</p>
                            <div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                                {genreMovies.slice(0, moviesToShow[Genres[index]]).map((movie: Movie, movieIndex: number) => (
                                    <div className='flex' key={movieIndex}>
                                        <Card movie={movie} />
                                    </div>
                                ))}
                            </div>
                            {genreMovies.length > moviesToShow[Genres[index]] && (
                                <div className='flex justify-center'>
                                    <button className='bg-cyan-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => handleSeeMore(Genres[index])}
                                    >
                                        See more
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                ))}
            </div>
            {!allMoviesShown && ( // Render the "See less" button only if not all genres are showing maximum movies
                <div className='flex justify-center'>
                    <button className='bg-cyan-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleSeeLess}
                    >
                        See less
                    </button>
                </div>
            )}
        </div>
    );
};

export default Container;
