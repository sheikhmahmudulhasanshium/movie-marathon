"use client"
import { useState, useEffect } from "react";
import { Movie, ErrorResponse } from "../type"; // Adjust the path as necessary

const useShow = (imdbID: string | null) => {
    const [series, setSeries] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const apiKey=process.env.NEXT_PUBLIC_OMDB_API_KEY

    useEffect(() => {
        if (!imdbID) {
            setLoading(false);
            return;
        }

        const fetchSeries = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
                const data: Movie | ErrorResponse = await response.json();

                if ("Error" in data) {
                    setError(data.Error);
                    setSeries(null);
                } else {
                    setSeries(data);
                    setError(null);
                }
            } catch (error) {
                setError((error as Error).message);
                setSeries(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSeries();
    }, [imdbID]);

    return { series, loading, error };
};

export default useShow;
