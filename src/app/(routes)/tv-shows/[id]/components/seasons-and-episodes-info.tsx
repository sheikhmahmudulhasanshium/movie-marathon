"use client";
import { FaList, FaPlay } from "react-icons/fa";
import useShow from "../../../../../../actions/get-show";
import { useState } from "react";
import useSeasonInfo from "../../../../../../actions/get-season-info";
import Link from "next/link";

interface SeasonInfoCardProps {
    imdbID: string | null;
}

const SeasonInfoCard: React.FC<SeasonInfoCardProps> = ({ imdbID }) => {
    const [selectedSeason, setSelectedSeason] = useState("1");

    const { series, error: showError, loading: showLoading } = useShow(imdbID);
    const { data: episodesData, loading: seasonLoading, error: seasonError } = useSeasonInfo(imdbID, selectedSeason);

    if (showError || seasonError) {
        return <div>Season Error Occurred.</div>;
    }

    if (showLoading || seasonLoading) {
        return <div>Loading...</div>;
    }

    if (series && episodesData) {
        const totalSeasons = parseInt(series.totalSeasons || "1", 10);

        const options = [];
        for (let i = 1; i <= totalSeasons; i++) {
            options.push(
                <option key={i} value={i} className="text-xl text-center dark:text-cyan-950">
                    Season {i}
                </option>
            );
        }

        const totalEpisodes = episodesData.Episodes.length;

        const episodes = [];
        for (let i = 0; i < totalEpisodes; i++) {
            episodes.push(
                <div key={i} className="flex bg-slate-400 rounded-xl hover:bg-opacity-35 hover:font-bold items-center">
                    <Link href={{ pathname: `/tv-shows/${imdbID}/season-${episodesData.Season}/episode-${episodesData.Episodes[i].Episode}/`, query: { seriesId: imdbID, season: episodesData.Season, episodeId: episodesData.Episodes[i].imdbID } }}>
                        <div className="flex gap-2 px-4 py-1.5 items-center">
                            <FaPlay className="text-xl" />
                            <p className="text-lg font-serif flex gap-1">
                                <span>Episode {i + 1}:</span>
                            </p>
                            <p className="text-lg font-serif">{episodesData.Episodes[i].Title}</p>
                        </div>
                    </Link>
                </div>
            );
        }

        return (
            <div className="py-24 flex px-8 text-cyan-800 justify-between">
                <div className="flex justify-between flex-col">
                    <div className="flex justify-start text-3xl items-center gap-2">
                        <FaList />
                        <select
                            className="bg-transparent space-x-2"
                            value={selectedSeason}
                            onChange={(e) => setSelectedSeason(e.target.value)}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-2 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {episodes}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default SeasonInfoCard;
