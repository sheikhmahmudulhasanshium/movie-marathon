import React, { useState, useEffect, useRef } from "react";
import SamplePic from "../../../../../../../../public/images/sample-poster.jpg";
import { FaCirclePlay } from "react-icons/fa6";
import useEpisode from "../../../../../../../../actions/get-episode";
import Servers from "@/app/(routes)/components/Servers";

interface VideoPlayerProps {
    episodeId: string | null;
    seriesId: string | null; // Add seriesId prop here
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ episodeId, seriesId }) => {
    const { episode, loading, error } = useEpisode(episodeId);
    const [showVideo, setShowVideo] = useState(false);
    const [selectedServer, setSelectedServer] = useState(0);
    const videoRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const handleEnterPiP = async () => {
            try {
                if (videoRef.current && document.pictureInPictureEnabled) {
                    const videoElement = videoRef.current.contentWindow?.document.querySelector("video");

                    if (videoElement && !document.pictureInPictureElement) {
                        await videoElement.requestPictureInPicture();
                    } else {
                        console.log("Picture-in-Picture mode is not supported or already in use.");
                    }
                } else {
                    console.log("Picture-in-Picture mode is not supported.");
                }
            } catch (error) {
                console.error("Error while trying to enter Picture-in-Picture mode:", error);
            }
        };

        if (videoRef.current) {
            videoRef.current.addEventListener('dblclick', handleEnterPiP);

            return () => {
                videoRef.current?.removeEventListener('dblclick', handleEnterPiP);
            };
        }
    }, []);

    if (error) return <div>Error loading episode details: {error}</div>;
    if (loading) return <div>Loading...</div>;
    if (!episode) return null;

    const season = episode.Season;
    const episodeNum = episode.Episode;

    const serverUrls = [
        `https://vidsrc.net/embed/tv/${seriesId}/${season}/${episodeNum}`,
        `https://moviesapi.club/tv/${seriesId}-${season}-${episodeNum}`,
        `https://www.2embed.cc/embedtv/${seriesId}&s=${season}&e=${episodeNum}`
    ];

    return (
        <div className="relative flex flex-col justify-center items-center my-12 w-full h-screen">
            {showVideo && episodeId ? (
                <div className="flex flex-col justify-center items-center w-full h-full absolute top-0 left-0">
                    <div className="relative w-[100%] max-w-5xl h-full">
                        <iframe
                            ref={videoRef}
                            src={serverUrls[selectedServer]}
                            className="absolute top-0 left-0 w-full h-full"
                            width="100%"
                            height="100%"
                            allow="fullscreen"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <Servers imdbID={seriesId} selectedServer={selectedServer} onSelectServer={setSelectedServer} />
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
