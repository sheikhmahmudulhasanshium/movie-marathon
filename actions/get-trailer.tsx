"use client";
import { useState, useEffect } from "react";
import { IndividualEpisode, Movie, TrailerData } from "../type";

const useTrailer = (data: Movie | IndividualEpisode | null) => {
  const [trailerData, setTrailerData] = useState<TrailerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!data) {
      setLoading(false);
      setTrailerData(null);
      return;
    }
    const trailerType = data.Type === "movie" ? "movies" : "shows";
    const fetchTrailer = async () => {
      try {
        const response = await fetch(`https://api.kinocheck.de/${trailerType}?imdb_id=${data.imdbID}&categories=Trailer`);
        const trailerData: TrailerData = await response.json();
        setTrailerData(trailerData);
        setError(null);
      } catch (error) {
        setError((error as Error).message);
        setTrailerData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTrailer();
  }, [data]);

  return { trailerData, loading, error };
};

export default useTrailer;
