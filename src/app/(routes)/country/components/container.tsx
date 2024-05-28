import React, { useState } from 'react';
import useAllCountries from '../../../../../actions/get-all-countries';
import Card from '../../components/Card';
import { Movie, Countries, countryInitials} from '../../../../../type';


const Container: React.FC = () => {
    const { allMovies, loading, error } = useAllCountries(Countries);
    const maxMoviesToShow = 10; // Maximum number of movies to show for each country initially
    const [moviesToShow, setMoviesToShow] = useState<{ [key: string]: number }>(
        Countries.reduce((acc, country) => ({ ...acc, [country]: maxMoviesToShow }), {})
    ); // Number of movies currently shown for each country

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleSeeMore = (country: string) => {
        setMoviesToShow(prevCount => ({ ...prevCount, [country]: prevCount[country] + maxMoviesToShow })); // Increment movies to show for the specific country
    };

    const handleSeeLess = () => {
        setMoviesToShow(Countries.reduce((acc, country) => ({ ...acc, [country]: maxMoviesToShow }), {})); // Reset movies to show for all countries
    };

    const allMoviesShown = Object.values(moviesToShow).every(count => count === maxMoviesToShow); // Check if all countries are showing maximum movies

    return (
        <div className='flex flex-col justify-between py-8 gap-y-8'>
            <p className='text-center'>Showing Movies & Tv Shows For All Countries</p>
            <div className='flex flex-col gap-4'>
                {allMovies.map((countryMovies: Movie[], index: number) => (
                    // Check if countryMovies array is not empty before rendering the country section
                    countryMovies.length > 0 && (
                        <div key={index} className='py-5 px-2'>
                            <div className='flex space-x-4'>
                                <p className='text-4xl font-serif font-thin pb-4'>{Countries[index]} </p>
                                <img
                                    alt={Countries[index]}
                                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryInitials[Countries[index]]}.svg`}
                                    className='w-10 h-10'
                                />
                            </div>
                            <div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                                {countryMovies.slice(0, moviesToShow[Countries[index]]).map((movie: Movie, movieIndex: number) => (
                                    <div className='flex' key={movieIndex}>
                                        <Card movie={movie} />
                                    </div>
                                ))}
                            </div>
                            {countryMovies.length > moviesToShow[Countries[index]] && (
                                <div className='flex justify-center'>
                                    <button className='bg-cyan-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => handleSeeMore(Countries[index])}
                                    >
                                        See more
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                ))}
            </div>
            {!allMoviesShown && ( // Render the "See less" button only if not all countries are showing maximum movies
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

