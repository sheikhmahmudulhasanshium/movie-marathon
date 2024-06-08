"use client";
import React, { useState, useEffect } from 'react';
import useShow from "../../../../../../actions/get-show";
import { FaList } from 'react-icons/fa';
import { FiPlay } from 'react-icons/fi';
import useSeasonInfo from '../../../../../../actions/get-season-info';

interface SeasonInfoCardProps {
  imdbID: string | null;
}

const SeasonInfoCard: React.FC<SeasonInfoCardProps> = ({ imdbID }) => {
  const { series, error, loading } = useShow(imdbID);

  const totalSeasons = series?.totalSeasons || '1';
  const numericTotalSeasons = parseInt(totalSeasons, 10);
  const seasons = Array.from({ length: numericTotalSeasons }, (_, index) => index + 1);

  const [selectedSeason, setSelectedSeason] = useState(`Season 1`);
  useEffect(() => {
    if (numericTotalSeasons > 0) {
      setSelectedSeason(`Season 1`);
    }
  }, [numericTotalSeasons]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="bg-slate-600 flex w-max sm:w-max md:w-screen lg:w-full justify-between p-2 flex-col mt-20">
      <div className='flex justify-start items-start text-xl lg:px-12 gap-4 pt-8'>
        <FaList className='text-3xl' />
        <select
          className='bg-transparent'
          value={selectedSeason}
          onChange={e => setSelectedSeason(e.target.value)}
        >
          {seasons.map(season => (
            <option className="bg-slate-400" key={season} value={`Season ${season}`}>
              Season {season}
            </option>
          ))}
        </select>
      </div>
      <div className='flex items-center pt-12 lg:px-12'>
        <div className='grid grid-cols-3 justify-start'>
            {
              <div className='col-span-1 flex justify-start items-center gap-2 bg-slate-700 p-3 rounded-lg ml-8'>
                  <FiPlay />
                  <p>Ep {'episode.Episode.episodes.'}:</p>
                  <p>{'episode.Title'}</p>
              </div>
            }
        </div>
      </div>
    </div>
  );
};

export default SeasonInfoCard;
