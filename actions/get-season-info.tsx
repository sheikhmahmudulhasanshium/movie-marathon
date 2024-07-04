import { useState, useEffect } from "react";
import { SeasonData, APIResponse, APIError } from "../type";

const useSeasonInfo = (imdbID: string | null, selectedSeason: string): { data: SeasonData | null, loading: boolean, error: string | null } => {
  const [data, setData] = useState<SeasonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiKey=process.env.NEXT_PUBLIC_OMDB_API_KEY

  useEffect(() => {
    const fetchSeasonInfo = async () => {
      if (!imdbID) return;
      setLoading(true);
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&type=series&season=${selectedSeason}`);
        const result: APIResponse = await response.json();
        if (result.Response === "True") {
          setData(result as SeasonData);
        } else {
          setError((result as APIError).Error);
        }
      } catch (err) {
        setError("Failed to fetch season data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonInfo();
  }, [imdbID, selectedSeason]);

  return { data, loading, error };
};

export default useSeasonInfo;
