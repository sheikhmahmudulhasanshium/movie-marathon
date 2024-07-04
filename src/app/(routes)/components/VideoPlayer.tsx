import { IndividualEpisode, Movie } from "../../../../type";
import Servers from "./Servers";
import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
    imdbID: string | null;
    movie: Movie | IndividualEpisode | null;
    selectedServer: number;
    onSelectServer: (index: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ imdbID, movie, selectedServer, onSelectServer }) => {
    const movieType = movie?.Type;
    const serverTvUrl = selectedServer === 0 ? 'vidsrc.net/embed/tv' : selectedServer === 1 ? 'moviesapi.club/tv' : '2embed.cc/embedtv';
    const serverMovieUrl = selectedServer === 0 ? 'vidsrc.net/embed/movie' : selectedServer === 1 ? 'moviesapi.club/movie' : 'www.2embed.cc/embed/';

    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const handleEnterPiP = async () => {
                try {
                    if (iframe !== null && document.pictureInPictureEnabled && !document.pictureInPictureElement) {
                        // Use type assertion to access requestPictureInPicture() method
                        await (iframe as any).requestPictureInPicture();
                    } else {
                        console.log("Picture-in-Picture mode is not supported or already in use.");
                    }
                } catch (error) {
                    console.error("Error while trying to enter Picture-in-Picture mode:", error);
                }
            };

            iframe.addEventListener('dblclick', handleEnterPiP);

            return () => {
                iframe.removeEventListener('dblclick', handleEnterPiP);
            };
        }
    }, []);

    if (movieType === "series") {
        return (
            <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
                <div className="relative w-[100%] max-w-5xl h-full">
                    <iframe
                        ref={iframeRef}
                        src={`https://${serverTvUrl}/${imdbID}`}
                        className="absolute top-0 left-0 right-0 w-full h-full"
                        allowFullScreen
                        height="100%"
                        width="100%"
                        allow="picture-in-picture"
                    ></iframe>
                </div>
            </div>
        );
    }

    if (movieType === "movie") {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full absolute top-0 left-0">
                <div className="relative w-[100%] max-w-5xl h-full">
                    <iframe
                        ref={iframeRef}
                        src={`https://${serverMovieUrl}/${imdbID}`}
                        className="absolute top-0 left-0 right-0 w-full h-full"
                        allowFullScreen
                        height="100%"
                        width="100%"
                        allow="picture-in-picture"
                    ></iframe>
                </div>
                <Servers imdbID={imdbID} selectedServer={selectedServer} onSelectServer={onSelectServer} />
            </div>
        );
    }

    return null;
};

export default VideoPlayer;
