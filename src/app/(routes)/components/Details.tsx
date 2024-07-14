import React, { useState } from 'react';
import { BiSolidVideo } from "react-icons/bi";
import useMovie from "../../../../actions/get-movie";
import stringToList from "../../../../actions/get-string";
import SamplePic from "../../../../public/images/sample-poster.jpg";
import Image from "next/image";
import useEpisode from "../../../../actions/get-episode";
import Link from "next/link";
import useTrailer from "../../../../actions/get-trailer";
import useShow from "../../../../actions/get-show";
import Trailer from './Trailer';
import { FaImdb } from 'react-icons/fa6';
import { SiMetacritic, SiRottentomatoes } from 'react-icons/si';
import useTmdbId from '../../../../actions/get-tmdb';

interface DetailsProps {
  imdbID: string | null;
  movieType: 'movie' | 'series' | 'episode';
}

const Details: React.FC<DetailsProps> = ({ imdbID, movieType }) => {
  const tmdbId = useTmdbId(imdbID).tmdbId;

  const { movie, loading: movieLoading, error: movieError } = useMovie(imdbID);
  const { series, loading: seriesLoading, error: seriesError } = useShow(imdbID);
  const { episode, loading: episodeLoading, error: episodeError } = useEpisode(imdbID);

  const seriesNameFromEpisode = useShow(episode?.seriesID || null).series?.Title;

  const loading = movieType === "movie" ? movieLoading : movieType === "series" ? seriesLoading : episodeLoading;
  const error = movieType === "movie" ? movieError : movieType === "series" ? seriesError : episodeError;
  const data = movieType === "movie" ? movie : movieType === "series" ? series : episode;

  const { trailerData, loading: trailerLoading, error: trailerError } = useTrailer(data);

  const [showTrailer, setShowTrailer] = useState(false);

  const handleOpenTrailer = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading details: {error}</div>;
  if (!data) return <div>No details available.</div>;

  const genres = stringToList({ list: data.Genre, listName: 'genre' });
  const countries = stringToList({ list: data.Country, listName: 'country' });
  const actors = stringToList({ list: data.Actors, listName: 'actor', tmdbId });
  const productions = stringToList({ list: data.Production, listName: 'production' });
  const directors = stringToList({ list: data.Director, listName: 'director', tmdbId });
  const writers = stringToList({ list: data.Writer, listName: 'writer', tmdbId });
  const ratings = data.Ratings;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-44 my-12">
      <div className="md:col-span-1 flex flex-col items-start">
        <div className="rounded-xl mb-4">
          <Image src={data.Poster !== "N/A" ? data.Poster : SamplePic} alt="poster" height={300} width={200} className="rounded-xl" />
        </div>
        <div className="flex flex-col justify-center items-start gap-2 text-2xl">
          <p className="flex-bold">Ratings:</p>
          <div className="flex justify-center items-center">
            <FaImdb />
            <p>{ratings[0]?.Value || 'N/A'}</p>
          </div>
          {ratings[1] && (
            <div className="flex justify-center items-center">
              <SiRottentomatoes />
              <p>{ratings[1]?.Value || 'N/A'}</p>
            </div>
          )}
          {ratings[2] && (
            <div className="flex justify-center items-center">
              <SiMetacritic />
              <p>{ratings[2]?.Value || 'N/A'}</p>
            </div>
          )}
        </div>
      </div>
      <div className="md:col-span-2 flex-1 flex flex-col justify-between items-start text-cyan-950 dark:text-white">
        <p className="text-4xl text-cyan-950 dark:text-white font-thin font-sans">{data.Title}</p>
        <div className="flex pt-4 gap-4 items-center">
          {trailerData && (
            <button
              className="bg-white text-black flex rounded-lg justify-center items-center p-1 gap-x-2 text-lg font-thin"
              onClick={handleOpenTrailer}
            >
              <p>Trailer</p>
              <BiSolidVideo className="text-2xl" />
            </button>
          )}
          <div className="border border-white p-1 bg-cyan-950 bg-opacity-30 flex text-white m-1 rounded-md">HD</div>
          <p className="text-orange-800 dark:text-orange-400 text-xl font-bold bg-opacity-30 bg-slate-400 rounded-xl p-1">IMDB: {data.imdbRating}</p>
        </div>
        <div className="text-base text-cyan-950 dark:text-white mt-3 space-y-4">
          <p className="text-justify items-center w-10/12">{data.Plot}</p>
          <div className="flex gap-2">
            <p className="font-bold">Released:</p>
            <p>{data.Released}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold">Genre:</p>
            {genres}
          </div>
          {episode?.Type === "episode" && (
            <div className="flex">
              <Link
                className="flex gap-2"
                href={{ pathname: `/tv-shows/${episode.seriesID}`, query: { id: episode.seriesID } }}
              >
                <p className="font-bold">Series Name:</p>
                <p className="hover:underline">{seriesNameFromEpisode}</p>
              </Link>
            </div>
          )}
          {episode?.Type === "episode" && (
            <div className="flex gap-2">
              <p className="font-bold">Season:</p>
              {episode.Season}
            </div>
          )}
          {episode?.Type === "episode" && (
            <div className="flex gap-2">
              <p className="font-bold">Episode:</p>
              {episode.Episode}
            </div>
          )}
          <div className="flex gap-2">
            <p className="font-bold">Casts:</p>
            {actors}
          </div>
          <div className="flex gap-2">
            <p className="font-bold">Director:</p>
            {directors}
          </div>
          <div className="flex gap-2">
            <p className="font-bold">Writer:</p>
            {writers}
          </div>
          <div className="flex gap-2">
            <p className="font-bold">Country:</p>
            {countries}
          </div>
          <div className="flex gap-2">
            <p className="font-bold">Production:</p>
            {productions}
          </div>
        </div>
      </div>
      {showTrailer && trailerData && <Trailer onClose={handleCloseTrailer} trailerData={trailerData} />}
    </div>
  );
};

export default Details;
