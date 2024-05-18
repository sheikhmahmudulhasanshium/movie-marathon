"use client"
import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Assuming you're using FontAwesome icons

const SearchBar = () => {
    const [searchText, setSearchText] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const clearSearch = () => {
        setSearchText('');
    };

    return (
    <div className='px-12 w-full sm:w-screen md:w-full lg:w-full'>
        <div className=" flex justify-between items-center bg-cyan-950 m-4 border-cyan-950 border rounded-lg hover:opacity-75 text-4xl">
            <input
                className="w-11/12 py-4 pl-4 rounded-l-lg"
                type="text"
                placeholder="Enter Keywords..."
                value={searchText}
                onChange={handleInputChange}
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
    </div>
    );
}

export default SearchBar;
