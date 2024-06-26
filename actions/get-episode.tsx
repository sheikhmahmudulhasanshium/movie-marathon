"use client"
import { useState, useEffect } from "react";
import { ErrorResponse, IndividualEpisode } from "../type"; // Adjust the path as necessary

const useEpisode = (imdbID: string | null) => {
    const [episode, setSeries] = useState<IndividualEpisode | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!imdbID) {
            setLoading(false);
            return;
        }

        const fetchSeries = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=fa8c7f7d&i=${imdbID}`);
                const data: IndividualEpisode | ErrorResponse = await response.json();

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

    return { episode, loading, error };
};

export default useEpisode;
