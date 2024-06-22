import React, { useState } from "react";
import SamplePic from "../../../../../../../../public/images/sample-poster.jpg";
import { FaCirclePlay } from "react-icons/fa6";
import useEpisode from "../../../../../../../../actions/get-episode";
import Servers from "@/app/(routes)/components/Servers";

interface VideoPlayerProps {
    seriesId: string | null;
    episodeId: string | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ episodeId }) => {
    const { episode, loading, error } = useEpisode(episodeId);
    const [showVideo, setShowVideo] = useState(false);
    const [selectedServer, setSelectedServer] = useState(0);

    if (error) return <div>Error loading episode details: {error}</div>;
    if (loading) return <div>Loading...</div>;
    if (!episode) return null;

    const seriesID = episode.seriesID;
    const season = parseInt(episode.Season, 10);
    const episodeNum = parseInt(episode.Episode, 10);

    const serverUrls = [
        `https://vidsrc.net/embed/tv/${seriesID}/${season}/${episodeNum}`,
        `https://moviesapi.club/tv/${seriesID}-${season}-${episodeNum}`,
        `https://www.2embed.cc/embedtv/${seriesID}&s=${season}&e=${episodeNum}`
    ];

    return (
        <div className="relative flex flex-col justify-center items-center my-12 w-full h-screen">
            {showVideo && episodeId ? (
                <div className="flex flex-col justify-center items-center w-full h-full absolute top-0 left-0">
                    <div className="relative w-[100%] max-w-5xl h-full">
                        <iframe
                            src={serverUrls[selectedServer]}
                            className="absolute top-0 left-0 w-full h-full"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <Servers imdbID={seriesID} selectedServer={selectedServer} onSelectServer={setSelectedServer} />
                </div>
            ) : (
                <>
                    <div
                        className="absolute w-full h-full bg-cover bg-center opacity-45 z-0"
                        style={{
                            backgroundImage: `url(${episode.Poster !== "N/A" ? episode.Poster : SamplePic.src})`
                        }}
                    />
                    <div className="relative flex justify-center items-center py-12 w-full">
                        <button onClick={() => setShowVideo(true)}>
                            <FaCirclePlay className="text-9xl text-zinc-100 bg-cyan-950 rounded-full hover:bg-zinc-900 hover:text-zinc-500" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default VideoPlayer;
