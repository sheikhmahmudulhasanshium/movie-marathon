"use client"
import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { CgSearchLoading } from 'react-icons/cg';
import ReplacementImage from "../../../../public/images/sample-poster.jpg"
import { Movie } from '../../../../type';
import GetData from '../../../../actions/get-data'; // Assuming this imports the preloaded dataset
import stringSimilarity from 'string-similarity'; // Import the string similarity library
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [displayCount, setDisplayCount] = useState<number>(10);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const router = useRouter();

    useEffect(() => {
        if (!searchText.trim()) {
            setFilteredMovies([]);
            return;
        }

        setLoading(true);
        if (searchText.trim().length === 5 || searchText.includes(' ')) {
            // Search in the API if search key has a space or its length is 5 characters
            fetch(`https://www.omdbapi.com/?apikey=fa8c7f7d&s=${searchText}`)
                .then(response => response.json())
                .then(data => {
                    if (data.Search) {
                        setFilteredMovies(data.Search);
                        setErrorMessage('');
                    } else {
                        setFilteredMovies([]);
                        setErrorMessage('No results found. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setFilteredMovies([]);
                    setErrorMessage('An error occurred. Please try again later.');
                })
                .finally(() => setLoading(false));
        } else {
            // Search in the preloaded dataset
            GetData().then(data => {
                if (data && data.length > 0) {
                    // Calculate similarity between search query and movie titles
                    const resultsWithSimilarity = data.map(movie => ({
                        ...movie,
                        similarity: stringSimilarity.compareTwoStrings(searchText.toLowerCase(), movie.Title.toLowerCase())
                    }));
                    // Sort results by similarity score
                    const sortedResults = resultsWithSimilarity
                        .filter(movie => movie.similarity > 0.3) // Filter out results with low similarity
                        .sort((a, b) => b.similarity - a.similarity);
                    setFilteredMovies(sortedResults);
                    setErrorMessage('');
                } else {
                    setFilteredMovies([]);
                    setErrorMessage('No results found. Please try again.');
                }
                setLoading(false);
            });
        }
        setDisplayCount(10); // Reset display count on search text change
    }, [searchText]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const clearSearch = () => {
        setSearchText('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (selectedIndex >= 0 && selectedIndex < filteredMovies.length) {
                const selectedMovie = filteredMovies[selectedIndex];
                router.push(`/movies/${selectedMovie.imdbID}?id=${selectedMovie.imdbID}`);
            } else {
                console.log("Searching for:", searchText);
            }
        } else if (e.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredMovies.length);
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => (prevIndex - 1 + filteredMovies.length) % filteredMovies.length);
        }
    };

    const loadMoreResults = () => {
        setDisplayCount(prevCount => prevCount + 10);
    };

    const handleResultClick = (imdbID: string) => {
        router.push(`/movies/${imdbID}?id=${imdbID}`);
    };

    return (
        <div className='relative px-12 w-full sm:w-screen md:w-full lg:w-full'>
            <div className="flex justify-between items-center bg-cyan-950 m-4 border-cyan-950 border rounded-lg hover:opacity-75 text-4xl relative z-20">
                <input
                    className="w-11/12 py-4 pl-4 rounded-l-lg"
                    type="text"
                    placeholder="Enter Keywords..."
                    value={searchText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <div className="w-1/12 flex items-center justify-center text-white">
                    {searchText.length > 0 && (
                        <FaTimes className="cursor-pointer" onClick={clearSearch} />
                    )}
                    {searchText.length === 0 && (
                        <FaSearch />
                    )}
                </div>
            </div>
            {loading && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-40">
                    <div className="spinner-border text-white" role="status">
                        <span className="sr-only">Loading...<CgSearchLoading /></span>
                    </div>
                </div>
            )}
            {errorMessage && !loading && (
                <div className="absolute bg-red-500 text-white border border-gray-300 rounded-lg mt-2 p-4 w-full max-w-lg max-h-80 overflow-y-auto z-30">
                    {errorMessage}
                </div>
            )}
            {!loading && filteredMovies.length > 0 && (
                <div className="absolute bg-white border border-gray-300 rounded-lg mt-2 p-4 w-full max-w-lg max-h-80 overflow-y-auto z-30">
                    <h2 className="text-xl font-bold mb-2">Search Results</h2>
                    <div className='flex flex-col'>
                        {filteredMovies.slice(0, displayCount).map((movie, index) => (
                            <div
                                key={movie.imdbID}
                                className={`mb-2 text-xl flex items-center space-x-2 text-blue-950 cursor-pointer ${index === selectedIndex ? 'bg-gray-300 border-l-4 border-blue-500' : ''}`}
                                onClick={() => handleResultClick(movie.imdbID)}
                            >
                                <div>
                                    <Image
                                        src={movie.Poster !== "N/A" ? movie.Poster : ReplacementImage}
                                        alt="poster"
                                        height={30}
                                        width={30}
                                    />
                                </div>
                                <div className='text-start'>{movie.Title}</div>
                                <BiSearch />
                            </div>
                        ))}
                        {filteredMovies.length > displayCount && (
                            <button
                                className="mt-2 text-blue-500 hover:underline"
                                onClick={loadMoreResults}
                            >
                                See more results
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
