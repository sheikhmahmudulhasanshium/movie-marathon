// SearchBar.tsx
"use client"
import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { CgSearchLoading } from 'react-icons/cg';
import ReplacementImage from "../../../../public/images/sample-poster.jpg";
import useSearch from '../../../../actions/search';

const SearchBar = () => {
    const {
        searchText,
        setSearchText,
        filteredMovies,
        loading,
        displayCount,
        errorMessage,
        selectedIndex,
        setSelectedIndex,
        clearSearch,
        handleKeyPress,
        loadMoreResults,
        navigateToMovie
    } = useSearch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="relative px-12 w-full sm:w-screen md:w-full lg:w-full">
            <div className="flex justify-between items-center bg-cyan-950 m-4 border-cyan-950 border rounded-lg hover:opacity-75 text-4xl relative z-20">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter keyword..."
                    className="w-11/12 py-4 pl-4 rounded-l-lg"
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
                                onClick={() => navigateToMovie(movie)}
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
};

export default SearchBar;
