"use client"
import { useState, useEffect } from "react";
import { Movie, MovieResponse, ErrorResponse } from "../type"; // Adjust the path as necessary

const useMovie = (imdbID: string | null) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const apikey=process.env.NEXT_PUBLIC_OMDB_API_KEY

    useEffect(() => {
        if (!imdbID) {
            setLoading(false);
            return;
        }

        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${imdbID}`);
                const data: MovieResponse | ErrorResponse = await response.json();

                if ("Error" in data) {
                    setError(data.Error);
                    setMovie(null);
                } else {
                    setMovie(data as Movie);
                    setError(null);
                }
            } catch (error) {
                setError((error as Error).message);
                setMovie(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [imdbID]);

    return { movie, loading, error };
};

export default useMovie;
