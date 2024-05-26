"use client";

import { useEffect, useState } from "react";
import { Movie } from "../type"; // Ensure the correct path
import GetData from "./get-data"; // Ensure the correct path

interface UseImdbResult {
    movies: Movie[];
    series: Movie[];
}

const useTopImdb = (): UseImdbResult => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [series, setSeries] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchImdb = async () => {
            try {
                const data = await GetData();
                const filteredMovies = data
                    .filter(movie => {
                        const rating = parseFloat(movie.imdbRating);
                        return rating >= 6 && rating <= 10 && movie.Type === 'movie';
                    })
                    .sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));
                
                const filteredSeries = data
                    .filter(movie => {
                        const rating = parseFloat(movie.imdbRating);
                        return rating >= 5 && rating <= 10 && movie.Type === 'series';
                    })
                    .sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));

                setMovies(filteredMovies);
                setSeries(filteredSeries);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchImdb();
    }, []);
    
    return { movies, series };
};

export default useTopImdb;
