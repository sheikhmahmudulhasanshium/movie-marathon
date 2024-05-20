"use client"
import { useEffect, useState } from "react";
import GetData from "./get-data"; // Adjust the path as needed
import { Movie } from "../type";

const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await GetData();
                const allMovies = data.filter(movie => movie.Type === "movie");
                setMovies(allMovies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return movies;
};

export default useMovies;
