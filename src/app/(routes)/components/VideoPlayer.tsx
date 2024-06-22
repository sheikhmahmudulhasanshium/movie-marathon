import { IndividualEpisode, Movie } from "../../../../type";
import Servers from "./Servers";

interface VideoPlayerProps {
    imdbID: string | null;
    movie: Movie | IndividualEpisode | null;
    selectedServer: number;
    onSelectServer: (index: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ imdbID, movie, selectedServer, onSelectServer }) => {
    const movieType = movie?.Type;
    const serverTvUrl = selectedServer === 0 ? 'vidsrc.net/embed/tv' : selectedServer === 1? 'moviesapi.club/tv' : '2embed.cc/embedtv';
    const serverMovieUrl = selectedServer === 0 ? 'vidsrc.net/embed/movie' : selectedServer === 1? 'moviesapi.club/movie' : 'www.2embed.cc/embed/';
    

    if (movieType === "series") {
        return (
            <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
                <div className="relative w-[100%] max-w-5xl h-full">
                    <iframe
                        src={`https://${serverTvUrl}/${imdbID}`}
                        className="absolute top-0 left-0 w-full h-full"
                        allowFullScreen
                        height="100%"
                        width="100%"
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
                        src={`https://${serverMovieUrl}/${imdbID}`}
                        className="absolute top-0 left-0 w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
                <Servers imdbID={imdbID} selectedServer={selectedServer} onSelectServer={onSelectServer} />
            </div>
        );
    }
    return null;
};

export default VideoPlayer;
