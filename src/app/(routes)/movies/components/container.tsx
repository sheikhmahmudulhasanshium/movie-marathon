"use client"
import React from 'react';

import { useEffect, useState } from "react";
import GetMovies from "../../../../../actions/get-movies"; // Adjust the path as needed
import { Movie } from "../../../../../type";
import Card from "./Card";
import { VscLoading } from "react-icons/vsc";

const Container = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadMovies() {
            const allMovies = await GetMovies(); // Ensure you're correctly importing GetMovies
            setMovies(allMovies);
            setLoading(false);
        }

        loadMovies();
    }, []); // Make sure to include an empty dependency array to run this effect only once

    if (loading) {
        return <div className="text-center py-12 flex text-slate-400 w-full justify-center items-center">Please wait... <VscLoading className="text-xl animate-spin"/></div>;
    }

    return ( 
        <div className="flex flex-1 flex-col justify-center items-center w-full bg-gray-400 mt-14 pt-12">
            <div> {movies.map((movie, index) => (
                    <Card key={index} movie={movie} />
                ))}
            </div>
        </div>
     );
}

export default Container;
