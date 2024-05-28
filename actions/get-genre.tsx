"use client"
import { useState,useEffect } from "react";
import { Movie } from "../type";
import GetData from "./get-data";
const useGenre = (genre: string | null) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [genreMovies, setGenreMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await GetData();
                if (data !== null) { // Add a null check here
                    const filteredMovies: Movie[] = data.filter(movie => {
                        const genres = movie.Genre.split(", ");
                        return genre && genres.includes(genre);
                    });
                    setGenreMovies(filteredMovies);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                setError("Failed to fetch movies");
            } finally {
                setLoading(false);
            }
        };

        fetchMoviesByGenre();
    }, [genre]);

    return { movieIds: genreMovies, loading, error };
};

export default useGenre;
