// hooks/useSearch.ts
import { useState, useEffect } from 'react';
import stringSimilarity from 'string-similarity'; // Import the string similarity library
import { useRouter } from 'next/navigation';
import { Movie } from '../type';
import GetData from './get-data';

const useSearch = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [displayCount, setDisplayCount] = useState<number>(10);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const router = useRouter();

    useEffect(() => {
        if (!searchText.trim()) {
            setFilteredMovies([]);
            return;
        }

        setLoading(true);
        if (searchText.trim().length === 5 || searchText.includes(' ')) {
            // Search in the API if search key has a space or its length is 5 characters
            fetch(`https://www.omdbapi.com/?apikey=fa8c7f7d&s=${searchText}`)
                .then(response => response.json())
                .then(data => {
                    if (data.Search) {
                        setFilteredMovies(data.Search);
                        setErrorMessage('');
                    } else {
                        setFilteredMovies([]);
                        setErrorMessage('No results found. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setFilteredMovies([]);
                    setErrorMessage('An error occurred. Please try again later.');
                })
                .finally(() => setLoading(false));
        } else {
            // Search in the preloaded dataset
            GetData().then(data => {
                if (data && data.length > 0) {
                    // Calculate similarity between search query and movie titles
                    const resultsWithSimilarity = data.map(movie => ({
                        ...movie,
                        similarity: stringSimilarity.compareTwoStrings(searchText.toLowerCase(), movie.Title.toLowerCase())
                    }));
                    // Sort results by similarity score
                    const sortedResults = resultsWithSimilarity
                        .filter(movie => movie.similarity > 0.3) // Filter out results with low similarity
                        .sort((a, b) => b.similarity - a.similarity);
                    setFilteredMovies(sortedResults);
                    setErrorMessage('');
                } else {
                    setFilteredMovies([]);
                    setErrorMessage('No results found. Please try again.');
                }
                setLoading(false);
            });
        }
        setDisplayCount(10); // Reset display count on search text change
    }, [searchText]);

    const clearSearch = () => {
        setSearchText('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (selectedIndex >= 0 && selectedIndex < filteredMovies.length) {
                const selectedMovie = filteredMovies[selectedIndex];
                navigateToMovie(selectedMovie);
            } else {
                console.log("Searching for:", searchText);
            }
        } else if (e.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredMovies.length);
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => (prevIndex - 1 + filteredMovies.length) % filteredMovies.length);
        }
    };

    const loadMoreResults = () => {
        setDisplayCount(prevCount => prevCount + 10);
    };

    const navigateToMovie = async (movie: Movie) => {
        if (movie.Type === "movie") {
            router.push(`/movies/${movie.imdbID}?id=${movie.imdbID}`);
        } else if (movie.Type === "series") {
            router.push(`/tv-shows/${movie.imdbID}?id=${movie.imdbID}`);
        } else if (movie.Type === "episode") {
            try {
                const episodeData = await fetch(`https://www.omdbapi.com/?apikey=fa8c7f7d&i=${movie.imdbID}`)
                    .then(response => response.json());

                if (episodeData) {
                    const { seriesID, Season, Episode, imdbID: episodeId } = episodeData;
                    const pathname = `/tv-shows/${seriesID}/season-${Season}/episode-${Episode}/`;
                    const query = `seriesId=${seriesID}&season=${Season}&episodeId=${episodeId}`;
                    router.push(`${pathname}?${query}`);
                } else {
                    console.error('Episode data not found.');
                }
            } catch (error) {
                console.error('Error fetching episode data:', error);
            }
        }
    };

    return {
        searchText,
        setSearchText,
        filteredMovies,
        loading,
        displayCount,
        errorMessage,
        selectedIndex,
        setSelectedIndex,
        clearSearch,
        handleKeyPress,
        loadMoreResults,
        navigateToMovie
    };
};

export default useSearch;
