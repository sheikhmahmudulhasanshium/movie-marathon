import { useState, useEffect } from "react";
import { Movie } from "../type";
import GetData from "./get-data";

const useCountry = (country: string | null) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [countryMovies, setCountryMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMoviesByCountry = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await GetData();
                if (data !== null) { // Add a null check here
                    const filteredMovies: Movie[] = data.filter(movie => {
                        const countries = movie.Country.split(", ");
                        return country && countries.includes(country);
                    });

                    // Remove duplicates based on imdbID
                    const uniqueMovies = filteredMovies.filter((movie, index, self) =>
                        index === self.findIndex((m) => (
                            m.imdbID === movie.imdbID
                        ))
                    );

                    setCountryMovies(uniqueMovies);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                setError("Failed to fetch movies");
            } finally {
                setLoading(false);
            }
        };

        if (country) {
            fetchMoviesByCountry();
        }
    }, [country]);

    return { movieIds: countryMovies, loading, error };
};

export default useCountry;
