
"use client";
import { useEffect, useState } from "react";

interface KnownFor {
  name: string;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface WorkCredits {
  cast: KnownFor[];
  crew: KnownFor[];
}

interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  known_for: KnownFor[];
  also_known_as?: string[];
  biography?: string;
  birthday?: string;
  deathday?: string | null;
  homepage?: string | null;
  imdb_id?: string;
  place_of_birth?: string;
  work_credits?: WorkCredits;
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
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = `https://api.themoviedb.org/3/person/${tmdbId}?api_key=${apiKey}&append_to_response=combined_credits`;
        if (profileName) {
          const formattedName = profileName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('%20');
          url = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(formattedName)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          const errorResponse: ErrorResponse = await response.json();
          throw new Error(`Failed to fetch profile data: ${errorResponse.status_message}`);
        }

        const data = await response.json();
        if (profileName) {
          // Handle search results for a specific person
          const person = data.results.find((result: any) => result.known_for_department === 'Acting');
          if (person) {
            const personId = person.id;
            const personResponse = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&append_to_response=combined_credits`);
            if (!personResponse.ok) {
              const personErrorResponse: ErrorResponse = await personResponse.json();
              throw new Error(`Failed to fetch profile data for person: ${personErrorResponse.status_message}`);
            }
            const personData = await personResponse.json();
            const cast = personData.combined_credits?.cast || [];
            const crew = personData.combined_credits?.crew || [];

            setProfileData({
              ...personData,
              work_credits: {
                cast: cast.filter((work: any) => work.poster_path),
                crew: crew.filter((work: any) => work.poster_path),
              },
            });
          } else {
            throw new Error('Person not found');
          }
        } else {
          // Handle direct person ID lookup
          const cast = data.combined_credits?.cast || [];
          const crew = data.combined_credits?.crew || [];

          setProfileData({
            ...data,
            work_credits: {
              cast: cast.filter((work: any) => work.poster_path),
              crew: crew.filter((work: any) => work.poster_path),
            },
          });
        }
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (tmdbId || profileName) {
      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [tmdbId, profileName, apiKey]);

  return { profileData, loading, error };
};

export default useProfile;

