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
import Trailer from './Trailer'; // Import your Trailer component

interface DetailsProps {
  imdbID: string | null;
  movieType: string;
}

const Details: React.FC<DetailsProps> = ({ imdbID, movieType }) => {
  const { movie, loading: movieLoading, error: movieError } = useMovie(imdbID);
  const { series, loading: seriesLoading, error: seriesError } = useShow(imdbID);
  const { episode, loading: episodeLoading, error: episodeError } = useEpisode(imdbID);

  const seriesNameFromEpisode = useShow(episode?.seriesID || null).series?.Title;

  const loading = movieType === "movie" ? movieLoading : movieType === "series" ? seriesLoading : episodeLoading;
  const error = movieType === "movie" ? movieError : movieType === "series" ? seriesError : episodeError;
  const data = movieType === "movie" ? movie : movieType === "series" ? series : episode;

  // Fetch trailer data only when there's valid data available
  const { trailerData, loading: trailerLoading, error: trailerError } = useTrailer(data);

  const [showTrailer, setShowTrailer] = useState(false); // State to control visibility of the trailer

  const handleOpenTrailer = () => {
    setShowTrailer(true); // Set state to true to show the trailer
  }

  const handleCloseTrailer = () => {
    setShowTrailer(false); // Set state to false to hide the trailer
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading details: {error}</div>;
  if (!data) return <div>No details available.</div>;

  const genres = stringToList(data.Genre, 'genre');
  const countries = stringToList(data.Country, 'country');
  const actors = stringToList(data.Actors, 'actors');
  const productions = stringToList(data.Production, 'production');
  const directors = stringToList(data.Director, "director");
  const writers = stringToList(data.Writer, "writer");

  return (
    <div className="relative flex gap-4 space-x-2 pl-44 z-10 my-12">
      <div className="rounded-xl">
        <Image src={data.Poster !== "N/A" ? data.Poster : SamplePic} alt="poster" height={200} width={200} className="rounded-xl" />
      </div>

      <div className="flex-1 flex flex-col justify-between items-start text-cyan-950 dark:text-white">
        <p className="text-4xl text-cyan-950 dark:text-white font-thin font-sans">{data.Title}</p>
        <div className="flex pt-4 gap-4 items-center">
          {trailerData && (
            <button className="bg-white text-black flex rounded-lg justify-center items-center p-1 gap-x-2 text-lg font-thin"
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
          {episode?.Type === "episode" &&
            <div className="flex">
              <Link className="flex gap-2" href={{ pathname: `/tv-shows/${episode.seriesID}`, query: { id: episode.seriesID } }}>
                <p className="font-bold">Series Name:</p>
                <p className="hover:underline">{seriesNameFromEpisode}</p>
              </Link>
            </div>
          }
          {episode?.Type === "episode" &&
            <div className="flex gap-2">
              <p className="font-bold">Season:</p>
              {episode.Season}
            </div>
          }
          {episode?.Type === "episode" &&
            <div className="flex gap-2">
              <p className="font-bold">Episode:</p>
              {episode.Episode}
            </div>
          }
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
