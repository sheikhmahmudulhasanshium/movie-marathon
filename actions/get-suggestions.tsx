// useSuggestions.tsx
import { useState, useEffect } from 'react';
import useGenre from './get-genre';
import { Movie } from '../type';
import GetData from './get-data'; // Assuming GetData fetches the movie data

const useSuggestions = (genres: string | undefined, director: string | undefined, movieName: string | undefined, imdbID: string | null) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [suggestedMovies, setSuggestedMovies] = useState<Movie[]>([]);

    const genreArray = genres ? genres.split(", ").map(genre => genre.trim()) : null;
    const { movieIds: genreMovies, loading: genreLoading, error: genreError } = useGenre(genreArray ? genreArray[0] : null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (genreArray || director || movieName) {
                try {
                    const data = await GetData();
                    if (data !== null) {
                        // Filter out the movie with the same IMDb ID
                        const filteredData = data.filter(movie => movie.imdbID !== imdbID);

                        // Filter movies based on genre similarity
                        const similarGenreMovies = filteredData.filter(movie => {
                            const movieGenres = movie.Genre.split(", ").map(genre => genre.trim());
                            return genreArray?.some(genre => movieGenres.includes(genre));
                        });

                        // Filter movies by the same director
                        const sameDirectorMovies = director ? filteredData.filter(movie => movie.Director === director) : [];

                        // Filter movies with similar names
                        const similarNameMovies = movieName ? filteredData.filter(movie => movie.Title.toLowerCase().includes(movieName.toLowerCase())) : [];

                        // Sort movies by IMDb rating (descending) and filter within the range of 7 to 10
                        const topRatedMovies = filteredData
                            .filter(movie => parseFloat(movie.imdbRating) >= 7 && parseFloat(movie.imdbRating) <= 10)
                            .sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));

                        // Take the top 6 movies from the same director
                        const topSameDirectorMovies = sameDirectorMovies.slice(0, 6);

                        // Take the top 4 movies with similar names
                        const topSimilarNameMovies = similarNameMovies.slice(0, 6);

                        // Combine the movies ensuring no duplicates, prioritizing same director and similar name movies
                        const combinedMovies = Array.from(new Set([...topSameDirectorMovies, ...topSimilarNameMovies, ...similarGenreMovies, ...topRatedMovies]));

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
    }, [genreArray, director, movieName, imdbID]);

    return { suggestedMovies, loading, error };
};

export default useSuggestions;
