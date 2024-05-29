// Suggestion.tsx
import React from 'react';
import useMovie from '../../../../actions/get-movie';
import useSuggestions from '../../../../actions/get-suggestions';
import Card from './Card';
import { Movie } from '../../../../type';

interface SuggestionProps {
    imdbID: string | null;
}

const Suggestion: React.FC<SuggestionProps> = ({ imdbID }) => {
    const { movie, error: movieError, loading: movieLoading } = useMovie(imdbID);
    const genres = movie?.Genre;
    const director = movie?.Director;
    const movieName = movie?.Title;

    const { suggestedMovies, loading: suggestionsLoading, error: suggestionsError } = useSuggestions(genres, director, movieName, imdbID);

    return (
        <div className="flex flex-col py-14  justify-center items-center px-8">
            <div className="text-3xl font-thin font-sans text-start flex justify-start flex-1 flex-col">You may also like</div>
            <div className='flex flex-col justify-center items-center mt-12 pb-14 space-x-4 '>
                <div className="grid grid-cols-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 w-max sm:w-max md:w-full lg:w-full max-w-max">
                    {movieLoading && <div>Loading movie details...</div>}
                    {movieError && <div>Error loading movie details.</div>}
                    {suggestionsLoading && <div>Loading suggestions...</div>}
                    {suggestionsError && <div className='flex text-center col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-4'>Error loading suggestions. Please reload.</div>}
                    {!suggestionsLoading && !suggestionsError && suggestedMovies.slice(0, 24).map((movie: Movie) => (
                        <Card key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Suggestion;
