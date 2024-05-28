import { useState, useEffect } from 'react';
import useGenre from './get-genre';
import { Movie } from '../type';
import GetData from './get-data'; // Assuming GetData fetches the movie data

const useSuggestions = (genres: string | undefined) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [suggestedMovies, setSuggestedMovies] = useState<Movie[]>([]);

    const genreArray = genres ? genres.split(", ").map(genre => genre.trim()) : null;
    const { movieIds: genreMovies, loading: genreLoading, error: genreError } = useGenre(genreArray ? genreArray[0] : null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (genreArray) {
                try {
                    const data = await GetData();
                    if (data !== null) {
                        // Filter movies based on genre similarity
                        const similarGenreMovies = data.filter(movie => {
                            const movieGenres = movie.Genre.split(", ").map(genre => genre.trim());
                            return genreArray.some(genre => movieGenres.includes(genre));
                        });

                        // Sort movies by IMDb rating (descending) and filter within the range of 8 to 10
                        const topRatedMovies = data
                            .filter(movie => parseFloat(movie.imdbRating) >= 7 && parseFloat(movie.imdbRating) <= 10)
                            .sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));

                        // Take the top 6 movies from each category
                        const topSimilarGenreMovies = similarGenreMovies.slice(0, 9);
                        const topImdbRatedMovies = topRatedMovies.slice(0, 9);

                        // Combine the movies ensuring no duplicates
                        const combinedMovies = Array.from(new Set([...topSimilarGenreMovies, ...topImdbRatedMovies]));

                        setSuggestedMovies(combinedMovies);
                    }
                } catch (error) {
                    console.error("Error fetching movies:", error);
                    setError("Failed to fetch movies");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setError(null);
            }
        };

        fetchSuggestions();
    }, [genreArray]);

    return { suggestedMovies, loading, error };
};

export default useSuggestions;
