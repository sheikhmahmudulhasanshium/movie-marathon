import React from 'react';
import useMovie from '../../../../actions/get-movie';
import useSuggestions from '../../../../actions/get-suggestions';
import { Movie } from '../../../../type';
import Card from './Card';

interface SuggestionProps {
    imdbID: string | null;
}

const Suggestion: React.FC<SuggestionProps> = ({ imdbID }) => {
    const { movie, error: movieError, loading: movieLoading } = useMovie(imdbID);
    const genres = movie?.Genre;

    const { suggestedMovies, loading: suggestionsLoading, error: suggestionsError } = useSuggestions(genres);

    return (
        <div className="flex flex-col py-14 w-fit justify-center items-center px-8">
            <div className="text-3xl font-thin font-sans text-start flex justify-start flex-1 flex-col">You may also like</div>
            <div className='flex flex-col justify-center items-center mt-12 pb-14 space-x-4'>
                <div className="grid grid-cols-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3">
                    {movieLoading && <div>Loading movie details...</div>}
                    {movieError && <div>Error loading movie details.</div>}
                    {suggestionsLoading && <div>Loading suggestions...</div>}
                    {suggestionsError && <div>Error loading suggestions.</div>}
                    {!suggestionsLoading && !suggestionsError && suggestedMovies.slice(0, 12).map((movie: Movie) => (
                        <Card key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Suggestion;
