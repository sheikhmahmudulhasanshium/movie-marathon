import { useState, useEffect } from "react";
import { Movie } from "../type";
import GetData from "./get-data";
const useAllCountries = (countries: string[] | null) => {
    const [allMovies, setAllMovies] = useState<Array<Movie[]>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMoviesByCountries = async () => {
            setLoading(true);
            setError(null);

            try {
                if (countries) {
                    const data = await GetData(); // Use cached data
                    if (data !== null) { // Add a null check here
                        const moviesArrays: Array<Movie[]> = await Promise.all(
                            countries.map(async (country) => {
                                const filteredMovies: Movie[] = data.filter(movie => {
                                    const countries = movie.Country.split(", ");
                                    return country && countries.includes(country);
                                });

                                // Remove duplicates from filteredMovies
                                const uniqueMovies = filteredMovies.filter((movie, index, self) =>
                                    index === self.findIndex(m => (
                                        m.imdbID === movie.imdbID
                                    ))
                                );

                                return uniqueMovies;
                            })
                        );
                        setAllMovies(moviesArrays);
                    }
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                setError("Failed to fetch movies");
            } finally {
                setLoading(false);
            }
        };

        fetchMoviesByCountries();
    }, [countries]);

    return { allMovies, loading, error };
};

export default useAllCountries;
