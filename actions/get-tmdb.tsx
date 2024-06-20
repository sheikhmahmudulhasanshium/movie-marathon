import { useState, useEffect } from "react";
import useMovie from "./get-movie";

const useTmdbId = (imdbId: string | null) => {
  const [tmdbId, setTmdbId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { movie, loading: movieLoading, error } = useMovie(imdbId);

  useEffect(() => {
    if (!movie) return;

    const fetchTmdbId = async () => {
      try {
        const response = movie.Type === "movie" 
          ? await fetch(`https://api.kinocheck.de/movies?imdb_id=${movie.imdbID}`) 
          : await fetch(`https://api.kinocheck.de/shows?imdb_id=${movie.imdbID}`);
        
        const responseData = await response.json();
        
        setTmdbId(responseData.tmdb_id);
      } catch (error) {
        setTmdbId(null);
      } finally {
        setLoading(false);  
      }
    };

    fetchTmdbId();
  }, [movie]);

  return { tmdbId, loading, error };
};

export default useTmdbId;
