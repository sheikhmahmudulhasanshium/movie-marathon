"use client";
import { useEffect, useState } from "react";

interface KnownFor {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  media_type?: string;
}

interface Combined_Credit {
  cast: KnownFor[];
  crew: KnownFor[];
}

interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string; // Include original_name in Person interface
  popularity: number;
  profile_path: string | null;
  also_known_as?: string[];
  biography?: string;
  birthday?: string;
  deathday?: string | null;
  homepage?: string | null;
  imdb_id?: string;
  place_of_birth?: string;
  known_for?: KnownFor[];
  combined_credits?: Combined_Credit;
}

interface ErrorResponse {
  status_message: string;
}

const useProfile = (profileName: string | null, tmdbId: string | null) => {
  const [profileData, setProfileData] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileName || !apiKey) {
        console.log(profileName,apiKey)
        setError("Missing profile name or API Key");
        setLoading(false);
        return;
      }

      try {
        const searchResponse = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${profileName}`);
        const searchData = await searchResponse.json();

        if (!searchResponse.ok || searchData.results.length === 0) {
          throw new Error("Profile not found");
        }

        const profileId = searchData.results[0].id;
        const knownFor = searchData.results[0].known_for;

        // Fetching detailed person info including original_name
        const personResponse = await fetch(`https://api.themoviedb.org/3/person/${profileId}?api_key=${apiKey}`);
        const personData = await personResponse.json();

        if (!personResponse.ok) {
          throw new Error("Failed to fetch person details");
        }

        // Fetching combined credits
        const creditsResponse = await fetch(`https://api.themoviedb.org/3/person/${profileId}/combined_credits?api_key=${apiKey}`);
        const creditsData = await creditsResponse.json();

        if (!creditsResponse.ok) {
          throw new Error("Failed to fetch combined credits");
        }

        // Constructing the final profile data object
        const profileData: Person = {
          ...personData,
          original_name: personData.name, // Assume original_name is the same as name initially
          combined_credits: creditsData,
          known_for: knownFor,
        };

        setProfileData(profileData);
      } catch (err: any) { // Explicitly type 'err' as any or specify a more specific type if possible
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileName, apiKey]);

  return { profileData, loading, error };
};

export default useProfile;
