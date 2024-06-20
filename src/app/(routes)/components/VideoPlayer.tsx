import useTmdbId from "../../../../actions/get-tmdb";
import { Movie } from "../../../../type";
import Servers from "./Servers";

interface VideoPlayerProps {
    imdbID: string | null;
    movie: Movie | null;
    selectedServer: number;
    onSelectServer: (index: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ imdbID, movie, selectedServer, onSelectServer }) => {
    const { tmdbId } = useTmdbId(imdbID);
    const movieType = movie?.Type;
    const serverBaseUrl = selectedServer === 0 ? 'vidsrc.net/embed/' : 'moviesapi.club';
    const dbId = selectedServer === 0 ? imdbID : tmdbId;

    if (movieType === "series") {
        return (
            <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
                <div className="relative w-[100%] max-w-5xl h-full">
                    <iframe
                        src={`https://${serverBaseUrl}/tv/${dbId}`}
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
                        src={`https://${serverBaseUrl}/movie/${dbId}`}
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
